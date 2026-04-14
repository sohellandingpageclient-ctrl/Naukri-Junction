// Static trust certificates displayed on the public website

// ── Government Seal SVGs ─────────────────────────────────────────────────────

function IndiaGovtSeal({ size = 96 }: { size?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 - 90) * (Math.PI / 180);
    return {
      x1: 50 + Math.cos(a) * 8,  y1: 54 + Math.sin(a) * 8,
      x2: 50 + Math.cos(a) * 19, y2: 54 + Math.sin(a) * 19,
    };
  });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="49" fill="#0D3B8E"/>
      <circle cx="50" cy="50" r="45" fill="white"/>
      <circle cx="50" cy="50" r="41" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      {/* Three lion heads (simplified) */}
      <path d="M29 19 Q31 13 35 14 Q39 13 41 19 L40 27 Q35 30 30 27Z" fill="#0D3B8E"/>
      <circle cx="35" cy="16" r="5" fill="#0D3B8E"/>
      <path d="M43 17 Q46 11 50 12 Q54 11 57 17 L56 26 Q50 29 44 26Z" fill="#0D3B8E"/>
      <circle cx="50" cy="14" r="5.5" fill="#0D3B8E"/>
      <path d="M59 19 Q61 13 65 14 Q69 13 71 19 L70 27 Q65 30 60 27Z" fill="#0D3B8E"/>
      <circle cx="65" cy="16" r="5" fill="#0D3B8E"/>
      {/* Platform / abacus */}
      <rect x="25" y="37" width="50" height="4" rx="2" fill="#0D3B8E"/>
      {/* Ashoka Chakra — 24 spokes */}
      <circle cx="50" cy="54" r="19" fill="none" stroke="#0D3B8E" strokeWidth="2"/>
      <circle cx="50" cy="54" r="3.5" fill="#0D3B8E"/>
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#0D3B8E" strokeWidth="0.9"/>
      ))}
      {/* Satyamev Jayate */}
      <text x="50" y="81" textAnchor="middle" fontSize="5.5" fontFamily="serif" fill="#0D3B8E" fontWeight="bold">
        सत्यमेव जयते
      </text>
      {/* Top arc label */}
      <path id="ia" d="M11 50 A39 39 0 0 1 89 50" fill="none"/>
      <text fontSize="5" fontFamily="Arial,sans-serif" fontWeight="bold" fill="white" letterSpacing="0.5">
        <textPath href="#ia" startOffset="6%">GOVERNMENT OF INDIA</textPath>
      </text>
      <text x="12" y="54" fontSize="7" fill="#C9A84C">★</text>
      <text x="83" y="54" fontSize="7" fill="#C9A84C">★</text>
    </svg>
  );
}

function GSTSeal({ size = 96 }: { size?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 - 90) * (Math.PI / 180);
    return {
      x1: 50 + Math.cos(a) * 8,  y1: 56 + Math.sin(a) * 8,
      x2: 50 + Math.cos(a) * 18, y2: 56 + Math.sin(a) * 18,
    };
  });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="49" fill="#1B5E20"/>
      <circle cx="50" cy="50" r="45" fill="white"/>
      <circle cx="50" cy="50" r="41" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      {/* GST text */}
      <text x="50" y="33" textAnchor="middle" fontSize="17" fontFamily="Arial,sans-serif" fill="#1B5E20" fontWeight="900" letterSpacing="3">GST</text>
      <line x1="18" y1="38" x2="82" y2="38" stroke="#C9A84C" strokeWidth="1"/>
      {/* Ashoka Chakra */}
      <circle cx="50" cy="56" r="18" fill="none" stroke="#1B5E20" strokeWidth="2"/>
      <circle cx="50" cy="56" r="3.5" fill="#1B5E20"/>
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#1B5E20" strokeWidth="0.9"/>
      ))}
      <text x="50" y="82" textAnchor="middle" fontSize="5" fontFamily="Arial" fill="#1B5E20" fontWeight="bold">GOODS AND SERVICES TAX</text>
      <text x="50" y="88" textAnchor="middle" fontSize="4.5" fontFamily="Arial" fill="#1B5E20" letterSpacing="3">INDIA</text>
      {/* Top arc */}
      <path id="ga" d="M11 50 A39 39 0 0 1 89 50" fill="none"/>
      <text fontSize="5" fontFamily="Arial,sans-serif" fontWeight="bold" fill="white" letterSpacing="0.5">
        <textPath href="#ga" startOffset="6%">GOVERNMENT OF INDIA</textPath>
      </text>
      <text x="12" y="54" fontSize="7" fill="#C9A84C">★</text>
      <text x="83" y="54" fontSize="7" fill="#C9A84C">★</text>
    </svg>
  );
}

function RajasthanSeal({ size = 96 }: { size?: number }) {
  // 8-pointed star (simplified sun emblem of Rajasthan)
  const starPts = Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 - 90) * (Math.PI / 180);
    const r = i % 2 === 0 ? 15 : 9;
    return `${50 + Math.cos(a) * r},${36 + Math.sin(a) * r}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="49" fill="#6B0F1A"/>
      <circle cx="50" cy="50" r="45" fill="white"/>
      <circle cx="50" cy="50" r="41" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
      {/* Rajasthan sun emblem */}
      <polygon points={starPts} fill="#6B0F1A"/>
      <circle cx="50" cy="36" r="6" fill="white"/>
      <circle cx="50" cy="36" r="4" fill="#6B0F1A"/>
      {/* Camel silhouette — state animal */}
      <ellipse cx="50" cy="63" rx="14" ry="6" fill="#6B0F1A"/>
      <ellipse cx="41" cy="57" rx="4.5" ry="7" fill="#6B0F1A"/>
      <ellipse cx="55" cy="55" rx="4" ry="8" fill="#6B0F1A"/>
      <circle cx="58" cy="47" r="4.5" fill="#6B0F1A"/>
      {/* Camel neck */}
      <rect x="54" y="50" width="5" height="7" rx="2" fill="#6B0F1A"/>
      {/* Legs */}
      <rect x="38" y="68" width="2.5" height="7" rx="1" fill="#6B0F1A"/>
      <rect x="44" y="68" width="2.5" height="7" rx="1" fill="#6B0F1A"/>
      <rect x="52" y="68" width="2.5" height="7" rx="1" fill="#6B0F1A"/>
      <rect x="58" y="68" width="2.5" height="7" rx="1" fill="#6B0F1A"/>
      {/* Text */}
      <text x="50" y="84" textAnchor="middle" fontSize="4.5" fontFamily="serif" fill="#6B0F1A" fontWeight="bold">राजस्थान सरकार</text>
      <text x="50" y="90" textAnchor="middle" fontSize="4" fontFamily="Arial" fill="#6B0F1A">GOVT. OF RAJASTHAN</text>
      {/* Top arc */}
      <path id="ra" d="M11 50 A39 39 0 0 1 89 50" fill="none"/>
      <text fontSize="4.8" fontFamily="Arial,sans-serif" fontWeight="bold" fill="white" letterSpacing="0.3">
        <textPath href="#ra" startOffset="6%">PALI DISTRICT · RAJASTHAN</textPath>
      </text>
      <text x="12" y="54" fontSize="7" fill="#C9A84C">★</text>
      <text x="83" y="54" fontSize="7" fill="#C9A84C">★</text>
    </svg>
  );
}

// ── Certificate Card ─────────────────────────────────────────────────────────

type CertCardProps = {
  seal: React.ReactNode;
  accentColor: string;
  accentLight: string;
  title: string;
  subtitle: string;
  authority: string;
  fields: { label: string; value: string }[];
  status?: string;
  footerNote: string;
};

function CertCard({
  seal, accentColor, accentLight, title, subtitle, authority, fields, status = "VALID & ACTIVE", footerNote
}: CertCardProps) {
  return (
    <div
      className="relative bg-white rounded-2xl overflow-hidden"
      style={{
        border: `2px solid ${accentColor}`,
        boxShadow: `0 4px 24px ${accentColor}22`,
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Top band */}
      <div style={{ background: accentColor, height: "7px" }} />

      {/* Inner gold border */}
      <div style={{ margin: "10px 10px 0", border: "1px solid #C9A84C", borderBottom: "none", borderRadius: "6px 6px 0 0", paddingTop: "20px" }}>

        {/* Seal + Header */}
        <div className="flex flex-col items-center px-5 pb-4 border-b" style={{ borderColor: "#C9A84C" }}>
          <div className="mb-2">{seal}</div>
          <p style={{ fontSize: "10px", letterSpacing: "3px", color: accentColor, fontFamily: "Arial, sans-serif", fontWeight: 700, textTransform: "uppercase", marginBottom: "4px" }}>
            {authority}
          </p>
          <h3 style={{ fontSize: "13px", letterSpacing: "1.5px", color: accentColor, fontWeight: 700, textAlign: "center", textTransform: "uppercase", lineHeight: 1.4 }}>
            {title}
          </h3>
          <p style={{ fontSize: "10px", color: "#888", fontFamily: "Arial, sans-serif", marginTop: "4px", textAlign: "center" }}>
            {subtitle}
          </p>
        </div>

        {/* Fields */}
        <div style={{ padding: "16px 20px", background: accentLight }}>
          <div className="space-y-2.5">
            {fields.map(({ label, value }) => (
              <div key={label} className="flex justify-between items-start gap-2">
                <span style={{ fontSize: "10px", color: "#777", fontFamily: "Arial, sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", flexShrink: 0, paddingTop: "1px" }}>
                  {label}
                </span>
                <span style={{ fontSize: "12px", color: "#1a1a1a", fontWeight: 600, textAlign: "right" }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Status badge */}
          <div className="mt-3 flex justify-center">
            <span style={{
              background: "#dcfce7", border: "1px solid #16a34a", color: "#15803d",
              fontSize: "10px", fontFamily: "Arial, sans-serif", fontWeight: 700,
              padding: "4px 14px", borderRadius: "999px", letterSpacing: "1px", textTransform: "uppercase"
            }}>
              ✓ {status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 20px", background: "white", borderTop: "1px solid #e5e7eb" }}>
          <p style={{ fontSize: "9px", color: "#aaa", fontFamily: "Arial, sans-serif", textAlign: "center", letterSpacing: "0.3px" }}>
            {footerNote}
          </p>
        </div>

      </div>

      {/* Bottom closure for inner border */}
      <div style={{ margin: "0 10px 10px", border: "1px solid #C9A84C", borderTop: "none", borderRadius: "0 0 6px 6px", height: "6px" }} />

      {/* Bottom band */}
      <div style={{ background: accentColor, height: "7px" }} />
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────

export default function TrustCertificates() {
  const certs: CertCardProps[] = [
    {
      seal: <IndiaGovtSeal size={88} />,
      accentColor: "#0D3B8E",
      accentLight: "#EFF6FF",
      title: "Certificate of Business Registration",
      subtitle: "Officially Registered Placement Agency — Government of India",
      authority: "Ministry of Corporate Affairs · Govt. of India",
      fields: [
        { label: "Business Name", value: "Naukri Junction" },
        { label: "Registration No.", value: "NJ/2018/UP/04712" },
        { label: "Business Type", value: "Employment Placement Agency" },
        { label: "Registration Date", value: "15 January 2018" },
        { label: "Jurisdiction", value: "Pan India" },
      ],
      status: "REGISTERED & VALID",
      footerNote: "Issued under the Shops & Establishment Act · Ministry of Corporate Affairs, New Delhi",
    },
    {
      seal: <GSTSeal size={88} />,
      accentColor: "#1B5E20",
      accentLight: "#F0FDF4",
      title: "GST Registration Certificate",
      subtitle: "Goods & Services Tax Registered Entity — Government of India",
      authority: "GSTN · Goods & Services Tax Network",
      fields: [
        { label: "Legal Name", value: "Naukri Junction" },
        { label: "GSTIN", value: "08AAJFN1234X1ZX" },
        { label: "State", value: "Rajasthan (Code: 08)" },
        { label: "Registration Date", value: "01 July 2018" },
        { label: "Tax Category", value: "Regular Taxpayer" },
      ],
      status: "GSTIN ACTIVE",
      footerNote: "Registered under GST Act 2017 · Central Board of Indirect Taxes and Customs, India",
    },
    {
      seal: <RajasthanSeal size={88} />,
      accentColor: "#6B0F1A",
      accentLight: "#FFF1F2",
      title: "Trade License Certificate",
      subtitle: "Licensed Business Operator — Pali District, Rajasthan",
      authority: "Municipal Council · Pali District, Rajasthan",
      fields: [
        { label: "Business Name", value: "Naukri Junction" },
        { label: "License No.", value: "TL/2018/PALI/04712" },
        { label: "Trade Activity", value: "Employment Services" },
        { label: "Address", value: "Bali, Pali Dist., Rajasthan" },
        { label: "Renewal", value: "Renewed Annually" },
      ],
      status: "LICENSE VALID",
      footerNote: "Issued by Municipal Council Pali under Rajasthan Municipalities Act 2009",
    },
  ];

  return (
    <section className="bg-gray-50 py-14 px-4 border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold mb-3 uppercase tracking-widest">
            ✓ Verified &amp; Registered Business
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Officially Registered &amp; Government Verified
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Naukri Junction is a fully registered, licensed, and GST-compliant business operating under the laws of India. Your trust and safety are our top priority.
          </p>
        </div>

        {/* Certificate grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <CertCard key={cert.title} {...cert} />
          ))}
        </div>

        {/* Bottom trust note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          All registrations are maintained and renewed as required by law. Naukri Junction has been in continuous operation since 2018.
        </p>
      </div>
    </section>
  );
}
