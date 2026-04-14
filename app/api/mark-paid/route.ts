import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import crypto from "crypto";

function getAdminDb() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
  return getFirestore();
}

function hashData(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function POST(req: NextRequest) {
  // Must be authenticated admin
  const authCookie = req.cookies.get("admin_auth");
  if (authCookie?.value !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, amount } = await req.json();
    if (!id || !amount) {
      return NextResponse.json({ error: "Application ID and amount are required." }, { status: 400 });
    }

    const db = getAdminDb();
    const docRef = db.collection("applications").doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    const app = doc.data()!;

    // Update Firestore — mark as paid
    await docRef.update({
      paid: true,
      paidAmount: Number(amount),
      paidAt: new Date().toISOString(),
    });

    // Fire Purchase event to Meta Conversions API
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (pixelId && accessToken) {
      const eventId = `purchase_${id}_${Date.now()}`;
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const testEventCode = process.env.META_TEST_EVENT_CODE;

      const payload = {
        ...(testEventCode ? { test_event_code: testEventCode } : {}),
        data: [
          {
            event_name: "Purchase",
            event_time: Math.floor(Date.now() / 1000),
            event_id: eventId,
            event_source_url: `${appUrl}/`,
            action_source: "website",
            user_data: {
              ph: [hashData(app.phone)],
              fn: [hashData(app.name?.split(" ")[0] || "")],
              ln: [hashData(app.name?.split(" ").slice(1).join(" ") || "")],
              ct: [hashData(app.city || "")],
            },
            custom_data: {
              currency: "INR",
              value: Number(amount),
              content_name: "Job Placement Service",
              content_category: "Employment",
              job_type: app.jobType || "General",
            },
          },
        ],
      };

      await fetch(
        `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mark as paid error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
