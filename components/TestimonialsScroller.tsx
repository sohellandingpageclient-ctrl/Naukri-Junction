"use client";

import Image from "next/image";

const TESTIMONIALS = [
  {
    image: "/review1.webp",
    name: "Amit Kumar",
    city: "Bihar",
    text: "Sir, I still can't believe I finally got a government job. I trusted you from the beginning and you guided me properly. Thank you so much sir 🙏",
  },
  {
    image: "/review2.webp",
    name: "Suresh Mehra",
    city: "Rajasthan",
    text: "Thank you sir for your support and guidance. I was searching for a stable job for my family and today I got it. Really grateful to you.",
  },
  {
    image: "/review3.webp",
    name: "Arjun Singh",
    city: "Haryana",
    text: "Hello sir, I'm from Haryana. I was very stressed about my future but after connecting with Naukri Junction everything became clear. Today I got my dream job. Thank you sir ❤️",
  },
  {
    image: "/review4.webp",
    name: "Ramesh Tiwari",
    city: "Uttar Pradesh",
    text: "Sir, my family is very happy today. This job changed our life. Thank you for your guidance and support throughout 😌",
  },
  {
    image: "/review5.webp",
    name: "Rajesh Verma",
    city: "Mumbai",
    text: "Hi sir, I'm Rajesh from Mumbai. I trusted you sir and it was the best decision. Today I got selected and I'm really thankful. God bless you sir 🙏❤️",
  },
  {
    image: "/review6.webp",
    name: "Vikram Patel",
    city: "Madhya Pradesh",
    text: "Sir, I don't have enough words to thank you. Because of you, my career is set now. Really appreciate your help.",
  },
  {
    image: "/review7.webp",
    name: "Priya Gupta",
    city: "Uttar Pradesh",
    text: "Hello sir, Myself Priya Gupta and I'm from Uttar Pradesh. I'm really glad to be in touch with you sir. My whole life has changed now, just because of you. Trusting you was my biggest turning point. Thank you sir ☺️",
  },
  {
    image: "/review8.webp",
    name: "Deepak Rana",
    city: "Bihar",
    text: "After struggling for years, finally I got a government job. Naukri Junction helped me stay on the right track. Thank you sir 🙏",
  },
  {
    image: "/review9.webp",
    name: "Mohit Dubey",
    city: "Delhi",
    text: "बहुत-बहुत शुक्रिया Naukri Junction 🙏 सर, मैं दिल से आपका धन्यवाद करना चाहता हूँ। आपकी मदद और मार्गदर्शन की वजह से आज मुझे मेरी पहली सरकारी नौकरी मिली है। आपने सच में मेरी पूरी ज़िंदगी बदल दी सर ❤️",
  },
  {
    image: "/review10.webp",
    name: "Neha Sharma",
    city: "Delhi",
    text: "Sir sach bolu toh main almost give up kar chuki thi… lekin jab se main Naukri Junction se connect hui, sab change ho gaya. Aaj mere paas meri dream government job hai 🙏 Thank you so much sir, love you sir ❤️",
  },
  {
    image: "/review11.webp",
    name: "Rahul Bhatnagar",
    city: "Gujarat",
    text: "Sir, I'm really happy today. This job was my dream and I got it because of you. Respect and thanks always sir ❤️ I'm financially free now! You are god for me sir 🙏",
  },
  {
    image: "/review12.webp",
    name: "Akash Nair",
    city: "Punjab",
    text: "Bahut bahut shukriya Naukri Junction 🙏 Sir, pehle ghar ki condition itni achi nahi thi… lekin aaj main government job mein hoon sirf aapki wajah se. Aap jaise log hi asli help karte hain. God bless you sir 🙌",
  },
  {
    image: "/review13.webp",
    name: "Sanjay Kapoor",
    city: "Madhya Pradesh",
    text: "सर, मैं आज जो भी हूँ आपकी वजह से हूँ 🙏 Naukri Junction पर भरोसा करके मैंने सही फैसला लिया। आपकी मदद से मुझे मेरी ड्रीम जॉब मिल गई। दिल से सलाम है आपको 🙌",
  },
  {
    image: "/review14.webp",
    name: "Riya Agarwal",
    city: "Maharashtra",
    text: "Sir, I honestly had almost lost hope, but trusting Naukri Junction was the best decision of my life. Today I finally got my dream government job. You changed my life completely. Thank you sir 🙏",
  },
  {
    image: "/review15.jpg",
    name: "Sunita Yadav",
    city: "Uttar Pradesh",
    text: "Sir, aapne sirf job nahi dilayi… meri life hi change kar di 🙏 Naukri Junction ki help se aaj main stable hoon. Mere parents proud feel kar rahe hain. Thank you sir, hamesha aapka respect rahega ❤️",
  },
  {
    image: "/review16.jpg",
    name: "Faizan Siddiqui",
    city: "Uttar Pradesh",
    text: "Allah ki raham aur aapki dua se aaj mujhe government job mil gayi 🙏 Subhan Allah, sach mein ye miracle tha mere liye. Naukri Junction ne jo help ki wo main kabhi nahi bhulunga. Bahut bahut shukriya sir, Allah aapko khush rakhe ❤️",
  },
  {
    image: "/review17.jpg",
    name: "Ayaan Khan",
    city: "Delhi",
    text: "Alhamdulillah! Aaj meri zindagi badal gayi 🙏 Sir, aapki wajah se aur Allah ke fazl se mujhe meri dream government job mili. Pehle umeed nahi thi lekin Naukri Junction se connect hone ke baad sab possible ho gaya. Allah aapko duniya aur akhirat mein khush rakhe ❤️",
  },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map((s) => (
      <svg key={s} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsScroller() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-10 bg-white border-t border-gray-100 overflow-hidden">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-1">
        What Our Candidates Say
      </h2>
      <p className="text-center text-gray-500 text-sm mb-2">
        Real success stories from people who found their dream jobs
      </p>
      <div className="flex items-center justify-center gap-2 mb-8">
        <Stars />
        <span className="text-sm font-bold text-gray-800">4.9</span>
        <span className="text-sm text-gray-500">· 2,000+ verified reviews</span>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex gap-5 animate-scroll-x w-max">
          {items.map((item, i) => (
            <div
              key={i}
              className="w-64 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-100 overflow-hidden"
            >
              <div className="w-full">
                <Image
                  src={item.image}
                  alt={`Review by ${item.name}`}
                  width={256}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
                  className="object-contain"
                  sizes="256px"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Stars />
                  <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                    <svg className="w-3.5 h-3.5 fill-green-600" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{item.text}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold shrink-0">
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.city}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
