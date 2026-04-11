import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import crypto from "crypto";

// Initialize Firebase Admin (server-side only)
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
  try {
    const body = await req.json();
    const { name, phone, city, age, education, experience, jobType, message } = body;

    if (!name || !phone || !city) {
      return NextResponse.json({ error: "Name, phone, and city are required." }, { status: 400 });
    }

    // 1. Save to Firestore
    const db = getAdminDb();
    const docRef = await db.collection("applications").add({
      name,
      phone,
      city,
      age: age || "",
      education: education || "",
      experience: experience || "",
      jobType: jobType || "",
      message: message || "",
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    // 2. Fire Meta Conversions API (server-side)
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (pixelId && accessToken) {
      const eventTime = Math.floor(Date.now() / 1000);
      const clientIp = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
      const userAgent = req.headers.get("user-agent") || "";
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

      const payload = {
        data: [
          {
            event_name: "Lead",
            event_time: eventTime,
            event_source_url: `${appUrl}/`,
            action_source: "website",
            user_data: {
              ph: [hashData(phone)],
              fn: [hashData(name.split(" ")[0])],
              ln: [hashData(name.split(" ").slice(1).join(" ") || "")],
              ct: [hashData(city)],
              client_ip_address: clientIp,
              client_user_agent: userAgent,
            },
            custom_data: {
              content_name: "Job Application",
              content_category: "Employment",
              job_type: jobType || "General",
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

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
