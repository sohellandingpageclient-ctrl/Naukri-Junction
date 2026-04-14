export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const trackLead = (data: {
  phone?: string;
  name?: string;
  city?: string;
  eventId?: string;
}) => {
  if (typeof window !== "undefined" && window.fbq) {
    const { eventId, ...eventData } = data;
    window.fbq("track", "Lead", {
      content_name: "Job Application",
      content_category: "Employment",
      ...eventData,
    }, eventId ? { eventID: eventId } : undefined);
  }
};

export const trackViewContent = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "ViewContent", {
      content_name: "Job Application Page",
      content_category: "Employment",
      currency: "INR",
      value: 999,
    });
  }
};

export const trackContact = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }
};

export const trackCompleteRegistration = (data?: { content_name?: string; job_type?: string }) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration", {
      content_name: "Job Placement Registration",
      content_category: "Employment",
      ...data,
    });
  }
};
