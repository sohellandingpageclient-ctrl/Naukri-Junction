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
