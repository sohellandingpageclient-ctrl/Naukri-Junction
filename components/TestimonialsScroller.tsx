"use client";

import Image from "next/image";

const TESTIMONIALS = [
  {
    image: "/review1.webp",
    text: "Sir, I still can't believe I finally got a government job. I trusted you from the beginning and you guided me properly. Thank you so much sir 🙏",
  },
  {
    image: "/review2.webp",
    text: "Thank you sir for your support and guidance. I was searching for a stable job for my family and today I got it. Really grateful to you.",
  },
  {
    image: "/review3.webp",
    text: "Hello sir, I'm from Haryana. I was very stressed about my future but after connecting with Naukri Junction everything became clear. Today I got my dream job. Thank you sir ❤️",
  },
  {
    image: "/review4.webp",
    text: "Sir, my family is very happy today. This job changed our life. Thank you for your guidance and support throughout 😌",
  },
  {
    image: "/review5.webp",
    text: "Hi sir, I'm Rajesh from Mumbai. I trusted you sir and it was the best decision. Today I got selected and I'm really thankful. God bless you sir 🙏❤️",
  },
];

export default function TestimonialsScroller() {
  // Duplicate for seamless loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-10 bg-white border-t border-gray-100 overflow-hidden">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-2">
        What Our Candidates Say
      </h2>
      <p className="text-center text-gray-500 text-sm mb-8">
        Real success stories from people who found their dream jobs
      </p>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-5 animate-scroll-x w-max">
          {items.map((item, i) => (
            <div
              key={i}
              className="w-64 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={`Review ${(i % TESTIMONIALS.length) + 1}`}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
              <div className="p-4">
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
