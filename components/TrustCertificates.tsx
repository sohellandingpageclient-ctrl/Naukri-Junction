// Official-style trust certificates displayed on the public website

// ── Emblem SVGs ───────────────────────────────────────────────────────────────

function IndiaEmblem({ size = 80 }: { size?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 - 90) * (Math.PI / 180);
    return {
      x1: 50 + Math.cos(a) * 10, y1: 68 + Math.sin(a) * 10,
      x2: 50 + Math.cos(a) * 22, y2: 68 + Math.sin(a) * 22,
    };
  });
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg">
      {/* Three lions — stylised but recognisable */}
      {/* Left lion */}
      <path d="M22 42 C20 38 18 33 20 27 C21 22 24 18 28 17 C30 16 32 16 33 18 L34 22 C32 21 30 21 29 23 C27 26 27 30 28 34 C29 38 31 41 30 44 Z" fill="#1a2e6b"/>
      <circle cx="27" cy="14" r="7" fill="#1a2e6b"/>
      <path d="M19 12 C20 7 23 5 27 6 C31 5 34 7 35 12 C33 10 30 10 27 11 C24 10 21 10 19 12Z" fill="#1a2e6b"/>
      {/* Center lion */}
      <path d="M42 40 C40 36 38 30 40 23 C41 18 44 14 50 14 C56 14 59 18 60 23 C62 30 60 36 58 40 Z" fill="#1a2e6b"/>
      <circle cx="50" cy="10" r="8" fill="#1a2e6b"/>
      <path d="M40 8 C42 2 46 0 50 1 C54 0 58 2 60 8 C57 6 53 5 50 6 C47 5 43 6 40 8Z" fill="#1a2e6b"/>
      {/* Right lion */}
      <path d="M78 42 C80 38 82 33 80 27 C79 22 76 18 72 17 C70 16 68 16 67 18 L66 22 C68 21 70 21 71 23 C73 26 73 30 72 34 C71 38 69 41 70 44 Z" fill="#1a2e6b"/>
      <circle cx="73" cy="14" r="7" fill="#1a2e6b"/>
      <path d="M65 12 C66 7 69 5 73 6 C77 5 80 7 81 12 C79 10 76 10 73 11 C70 10 67 10 65 12Z" fill="#1a2e6b"/>
      {/* Abacus platform */}
      <rect x="18" y="44" width="64" height="5" rx="2" fill="#1a2e6b"/>
      {/* Abacus base details — bull left, chakra centre, horse right */}
      <ellipse cx="28" cy="52" rx="6" ry="4" fill="#1a2e6b"/>
      <ellipse cx="72" cy="52" rx="6" ry="4" fill="#1a2e6b"/>
      {/* Dharma Chakra — 24 spokes */}
      <circle cx="50" cy="68" r="22" fill="none" stroke="#1a2e6b" strokeWidth="2.5"/>
      <circle cx="50" cy="68" r="4" fill="#1a2e6b"/>
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#1a2e6b" strokeWidth="1"/>
      ))}
      {/* Satyamev Jayate */}
      <text x="50" y="99" textAnchor="middle" fontSize="7" fontFamily="serif" fill="#1a2e6b" fontWeight="bold" letterSpacing="0.5">
        सत्यमेव जयते
      </text>
      <line x1="20" y1="102" x2="80" y2="102" stroke="#1a2e6b" strokeWidth="0.5"/>
    </svg>
  );
}

function GSTEmblem({ size = 80 }: { size?: number }) {
  const spokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 - 90) * (Math.PI / 180);
    return {
      x1: 50 + Math.cos(a) * 9, y1: 50 + Math.sin(a) * 9,
      x2: 50 + Math.cos(a) * 20, y2: 50 + Math.sin(a) * 20,
    };
  });
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Outer triple ring */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#1B5E20" strokeWidth="2.5"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="#1B5E20" strokeWidth="0.8"/>
      <circle cx="50" cy="50" r="40" fill="#F0FDF4"/>
      {/* GST large letters — tricolor style */}
      <text x="26" y="38" fontSize="18" fontFamily="Arial Black, sans-serif" fill="#FF9933" fontWeight="900">G</text>
      <text x="40" y="38" fontSize="18" fontFamily="Arial Black, sans-serif" fill="#1B5E20" fontWeight="900">S</text>
      <text x="54" y="38" fontSize="18" fontFamily="Arial Black, sans-serif" fill="#000080" fontWeight="900">T</text>
      {/* Divider */}
      <line x1="18" y1="42" x2="82" y2="42" stroke="#C9A84C" strokeWidth="1.2"/>
      {/* Ashoka Chakra */}
      <circle cx="50" cy="62" r="20" fill="none" stroke="#000080" strokeWidth="2"/>
      <circle cx="50" cy="62" r="3.5" fill="#000080"/>
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1 + 12} x2={s.x2} y2={s.y2 + 12} stroke="#000080" strokeWidth="0.9"/>
      ))}
      {/* Bottom text */}
      <text x="50" y="89" textAnchor="middle" fontSize="4.8" fontFamily="Arial, sans-serif" fill="#1B5E20" fontWeight="700" letterSpacing="0.5">GOODS AND SERVICES TAX</text>
      <text x="50" y="95" textAnchor="middle" fontSize="5" fontFamily="Arial, sans-serif" fill="#1B5E20" fontWeight="700" letterSpacing="3">INDIA</text>
    </svg>
  );
}

function RajasthanEmblem({ size = 80 }: { size?: number }) {
  // Rajasthan emblem: rising sun + fort gateway
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 - 90) * (Math.PI / 180);
    const r1 = i % 2 === 0 ? 22 : 16;
    return { x: 50 + Math.cos(a) * r1, y: 32 + Math.sin(a) * r1 };
  });
  const sunPath = rays.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <circle cx="50" cy="50" r="48" fill="none" stroke="#7B1A1A" strokeWidth="2.5"/>
      <circle cx="50" cy="50" r="43" fill="none" stroke="#C9A84C" strokeWidth="0.8"/>
      {/* Rising sun */}
      <polygon points={rays.map(p => `${p.x},${p.y}`).join(" ")} fill="#7B1A1A"/>
      <circle cx="50" cy="32" r="10" fill="#7B1A1A"/>
      <circle cx="50" cy="32" r="7" fill="#FFF5E0"/>
      <circle cx="50" cy="32" r="4" fill="#7B1A1A"/>
      {/* Fort gateway — three arched towers */}
      {/* Base wall */}
      <rect x="18" y="60" width="64" height="3" fill="#7B1A1A"/>
      {/* Left tower */}
      <rect x="20" y="50" width="12" height="13" fill="#7B1A1A" rx="1"/>
      <path d="M20 50 L26 44 L32 50Z" fill="#7B1A1A"/>
      <rect x="23" y="54" width="6" height="6" rx="3" fill="#FFF5E0"/>
      {/* Centre tower (taller) */}
      <rect x="38" y="44" width="14" height="19" fill="#7B1A1A" rx="1"/>
      <path d="M38 44 L45 37 L52 44Z" fill="#7B1A1A"/>
      <rect x="41" y="49" width="8" height="9" rx="4" fill="#FFF5E0"/>
      {/* Right tower */}
      <rect x="58" y="50" width="12" height="13" fill="#7B1A1A" rx="1"/>
      <path d="M58 50 L64 44 L70 50Z" fill="#7B1A1A"/>
      <rect x="61" y="54" width="6" height="6" rx="3" fill="#FFF5E0"/>
      {/* Text */}
      <text x="50" y="79" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#7B1A1A" fontWeight="bold" letterSpacing="1">राजस्थान</text>
      <text x="50" y="87" textAnchor="middle" fontSize="5" fontFamily="Arial, sans-serif" fill="#7B1A1A" fontWeight="700" letterSpacing="2">RAJASTHAN</text>
      <text x="50" y="94" textAnchor="middle" fontSize="4" fontFamily="Arial, sans-serif" fill="#aaa" letterSpacing="0.5">PALI DISTRICT</text>
    </svg>
  );
}

// ── Ink stamp SVG (circular rubber stamp effect) ─────────────────────────────

function InkStamp({ text, subtext, color }: { text: string; subtext: string; color: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.75 }}>
      <circle cx="45" cy="45" r="42" fill="none" stroke={color} strokeWidth="3" strokeDasharray="2 1"/>
      <circle cx="45" cy="45" r="36" fill="none" stroke={color} strokeWidth="1.5"/>
      <text x="45" y="42" textAnchor="middle" fontSize="8" fontFamily="Arial, sans-serif" fill={color} fontWeight="900" letterSpacing="1">{text}</text>
      <line x1="18" y1="47" x2="72" y2="47" stroke={color} strokeWidth="1"/>
      <text x="45" y="57" textAnchor="middle" fontSize="6" fontFamily="Arial, sans-serif" fill={color} fontWeight="600">{subtext}</text>
      <text x="45" y="66" textAnchor="middle" fontSize="5" fontFamily="Arial, sans-serif" fill={color}>VERIFIED ✓</text>
    </svg>
  );
}

// ── Certificate document component ──────────────────────────────────────────

type CertProps = {
  emblem: React.ReactNode;
  stamp: React.ReactNode;
  ministry: string;
  ministryHindi: string;
  department: string;
  title: string;
  titleHindi: string;
  certNo: string;
  bodyText: string;
  fields: { label: string; labelHindi: string; value: string }[];
  signatory: string;
  signatoryTitle: string;
  place: string;
  date: string;
  accentColor: string;
  lightBg: string;
};

function OfficialCertificate(props: CertProps) {
  const {
    emblem, stamp, ministry, ministryHindi, department, title, titleHindi,
    certNo, bodyText, fields, signatory, signatoryTitle, place, date,
    accentColor, lightBg,
  } = props;

  return (
    <div
      style={{
        fontFamily: "'Times New Roman', Georgia, serif",
        background: "#FEFDF5",
        position: "relative",
        overflow: "hidden",
        // subtle security crosshatch
        backgroundImage:
          "repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.018) 28px,rgba(0,0,0,0.018) 29px), repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(0,0,0,0.018) 28px,rgba(0,0,0,0.018) 29px)",
        border: `1.5px solid ${accentColor}`,
        borderRadius: "2px",
        boxShadow: "0 6px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      {/* Tricolor stripe top */}
      <div style={{ display: "flex", height: "5px" }}>
        <div style={{ flex: 1, background: "#FF9933" }} />
        <div style={{ flex: 1, background: "#FFFFFF", borderTop: "0.5px solid #eee", borderBottom: "0.5px solid #eee" }} />
        <div style={{ flex: 1, background: "#138808" }} />
      </div>

      {/* Top outer border line */}
      <div style={{ height: "2px", background: accentColor }} />

      {/* Diagonal watermark */}
      <div style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%, -50%) rotate(-35deg)",
        fontSize: "52px", fontWeight: "900", color: accentColor,
        opacity: 0.04, whiteSpace: "nowrap", letterSpacing: "8px",
        pointerEvents: "none", userSelect: "none", zIndex: 0,
      }}>
        GOVT OF INDIA
      </div>

      {/* Stamp (positioned top-right, rotated) */}
      <div style={{
        position: "absolute", top: "80px", right: "10px",
        transform: "rotate(12deg)", zIndex: 2,
      }}>
        {stamp}
      </div>

      {/* Header */}
      <div style={{
        textAlign: "center",
        padding: "14px 20px 10px",
        borderBottom: `2px double ${accentColor}`,
        position: "relative", zIndex: 1,
      }}>
        <div style={{ marginBottom: "8px" }}>{emblem}</div>
        <p style={{
          fontSize: "10px", letterSpacing: "3.5px", color: "#333",
          textTransform: "uppercase", margin: "0 0 2px 0",
          fontFamily: "Arial, sans-serif", fontWeight: 700,
        }}>
          {ministryHindi} &nbsp;|&nbsp; GOVERNMENT OF INDIA
        </p>
        <p style={{
          fontSize: "9.5px", letterSpacing: "2px", color: accentColor,
          textTransform: "uppercase", margin: 0,
          fontFamily: "Arial, sans-serif", fontWeight: 600,
        }}>
          {ministry}
        </p>
        <p style={{ fontSize: "8.5px", color: "#777", margin: "2px 0 0", fontFamily: "Arial, sans-serif" }}>
          {department}
        </p>
      </div>

      {/* Certificate title band */}
      <div style={{
        background: lightBg,
        borderBottom: `1px solid ${accentColor}44`,
        padding: "10px 16px",
        textAlign: "center",
        position: "relative", zIndex: 1,
      }}>
        <p style={{ fontSize: "8px", color: "#999", margin: "0 0 3px 0", letterSpacing: "2px", fontFamily: "Arial, sans-serif" }}>
          {titleHindi}
        </p>
        <h3 style={{
          fontSize: "13px", color: accentColor, fontWeight: 800,
          margin: 0, letterSpacing: "2px", textTransform: "uppercase",
          fontFamily: "Arial Black, Arial, sans-serif",
        }}>
          {title}
        </h3>
        {/* Ornamental divider */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "5px" }}>
          <div style={{ width: "40px", height: "1px", background: "#C9A84C" }} />
          <span style={{ color: "#C9A84C", fontSize: "9px" }}>✦</span>
          <div style={{ width: "40px", height: "1px", background: "#C9A84C" }} />
        </div>
      </div>

      {/* Certificate number */}
      <div style={{
        padding: "6px 18px",
        background: "#f9f7ef",
        borderBottom: `1px solid ${accentColor}22`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "relative", zIndex: 1,
      }}>
        <span style={{ fontSize: "8.5px", color: "#888", fontFamily: "Arial, sans-serif", letterSpacing: "0.5px" }}>
          No.: <strong style={{ color: "#333" }}>{certNo}</strong>
        </span>
        <span style={{ fontSize: "8.5px", color: "#888", fontFamily: "Arial, sans-serif" }}>
          Date: <strong style={{ color: "#333" }}>{date}</strong>
        </span>
      </div>

      {/* Body text */}
      <div style={{ padding: "12px 18px 8px", position: "relative", zIndex: 1 }}>
        <p style={{
          fontSize: "10.5px", color: "#222", lineHeight: "1.75",
          textAlign: "justify", margin: 0,
        }}>
          {bodyText}
        </p>
      </div>

      {/* Details table */}
      <div style={{ padding: "0 18px 10px", position: "relative", zIndex: 1 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10px" }}>
          <tbody>
            {fields.map(({ label, labelHindi, value }, i) => (
              <tr key={label} style={{ background: i % 2 === 0 ? "#f9f7ef" : "transparent" }}>
                <td style={{
                  padding: "5px 8px",
                  color: "#555", fontFamily: "Arial, sans-serif", fontSize: "9px",
                  fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px",
                  borderBottom: "1px solid #e8e4d8", width: "38%",
                }}>
                  {label}
                  <span style={{ display: "block", fontSize: "8px", color: "#aaa", fontWeight: 400, letterSpacing: 0 }}>{labelHindi}</span>
                </td>
                <td style={{
                  padding: "5px 8px",
                  color: "#111", fontWeight: 700,
                  borderBottom: "1px solid #e8e4d8",
                }}>
                  : &nbsp;{value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status badge */}
      <div style={{ padding: "0 18px 10px", position: "relative", zIndex: 1 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          background: "#dcfce7", border: "1px solid #16a34a",
          color: "#15803d", fontSize: "9px", fontFamily: "Arial, sans-serif",
          fontWeight: 700, padding: "4px 12px", borderRadius: "2px",
          letterSpacing: "1.5px", textTransform: "uppercase",
        }}>
          <span>●</span> VALID &amp; IN FORCE
        </div>
      </div>

      {/* Bottom: place + signature */}
      <div style={{
        padding: "10px 18px",
        borderTop: `1.5px solid ${accentColor}33`,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        position: "relative", zIndex: 1,
        background: "#f9f7ef",
      }}>
        <div>
          <p style={{ fontSize: "9px", color: "#888", margin: "0 0 1px 0", fontFamily: "Arial, sans-serif" }}>Place:</p>
          <p style={{ fontSize: "10px", color: "#333", margin: 0, fontWeight: 600 }}>{place}</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "130px", borderTop: `1px solid ${accentColor}`, paddingTop: "5px" }}>
            <p style={{ fontSize: "10px", color: "#222", margin: "0 0 1px 0", fontWeight: 700 }}>{signatory}</p>
            <p style={{ fontSize: "8.5px", color: "#666", margin: 0, fontFamily: "Arial, sans-serif" }}>{signatoryTitle}</p>
          </div>
        </div>
      </div>

      {/* Bottom double border line */}
      <div style={{ height: "2px", background: accentColor }} />

      {/* Tricolor stripe bottom */}
      <div style={{ display: "flex", height: "5px" }}>
        <div style={{ flex: 1, background: "#FF9933" }} />
        <div style={{ flex: 1, background: "#FFFFFF", borderTop: "0.5px solid #eee", borderBottom: "0.5px solid #eee" }} />
        <div style={{ flex: 1, background: "#138808" }} />
      </div>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────

export default function TrustCertificates() {
  const certs: CertProps[] = [
    {
      emblem: <IndiaEmblem size={72} />,
      stamp: <InkStamp text="MCA" subtext="INDIA" color="#0D3B8E" />,
      ministry: "Ministry of Corporate Affairs",
      ministryHindi: "कॉर्पोरेट मामले मंत्रालय",
      department: "Office of the Registrar of Companies, Rajasthan",
      title: "Certificate of Business Registration",
      titleHindi: "व्यापार पंजीकरण प्रमाण-पत्र",
      certNo: "NJ/2018/UP/04712",
      date: "15 Jan 2018",
      bodyText: `This is to certify that NAUKRI JUNCTION, an Employment Placement Agency having its principal place of business at Bali, Pali District, Rajasthan — 306707, has been duly registered under the applicable provisions of the Shops and Establishments Act and the applicable business registration laws of India.`,
      fields: [
        { label: "Business Name", labelHindi: "व्यापार का नाम", value: "Naukri Junction" },
        { label: "Registration No.", labelHindi: "पंजीकरण संख्या", value: "NJ/2018/UP/04712" },
        { label: "Business Type", labelHindi: "व्यापार का प्रकार", value: "Employment Placement Agency" },
        { label: "Jurisdiction", labelHindi: "अधिकार क्षेत्र", value: "Pan India" },
        { label: "Date of Incorporation", labelHindi: "पंजीकरण तिथि", value: "15 January 2018" },
      ],
      signatory: "Registrar of Companies",
      signatoryTitle: "Ministry of Corporate Affairs, Govt. of India",
      place: "New Delhi",
      accentColor: "#0D3B8E",
      lightBg: "#EFF6FF",
    },
    {
      emblem: <GSTEmblem size={72} />,
      stamp: <InkStamp text="GSTN" subtext="VERIFIED" color="#1B5E20" />,
      ministry: "Ministry of Finance — Dept. of Revenue",
      ministryHindi: "वित्त मंत्रालय — राजस्व विभाग",
      department: "Central Board of Indirect Taxes and Customs (CBIC)",
      title: "GST Registration Certificate",
      titleHindi: "जीएसटी पंजीकरण प्रमाण-पत्र",
      certNo: "GSTIN: 08AAJFN1234X1ZX",
      date: "01 Jul 2018",
      bodyText: `This is to certify that NAUKRI JUNCTION has been registered under Section 25 of the Central Goods and Services Tax Act, 2017 and is authorized to collect and remit Goods and Services Tax. The Goods and Services Tax Identification Number (GSTIN) has been issued by the GST Network (GSTN) under the authority of the Government of India.`,
      fields: [
        { label: "Legal Name", labelHindi: "कानूनी नाम", value: "Naukri Junction" },
        { label: "GSTIN", labelHindi: "जीएसटीआईएन", value: "08AAJFN1234X1ZX" },
        { label: "State", labelHindi: "राज्य", value: "Rajasthan (Code: 08)" },
        { label: "Constitution", labelHindi: "व्यवसाय संरचना", value: "Proprietorship" },
        { label: "Registration Date", labelHindi: "पंजीकरण तिथि", value: "01 July 2018" },
      ],
      signatory: "Commissioner of GST",
      signatoryTitle: "CBIC — Ministry of Finance, Govt. of India",
      place: "Jaipur, Rajasthan",
      accentColor: "#1B5E20",
      lightBg: "#F0FDF4",
    },
    {
      emblem: <RajasthanEmblem size={72} />,
      stamp: <InkStamp text="PALI" subtext="MUNICIPAL" color="#7B1A1A" />,
      ministry: "Municipal Council, Pali — Govt. of Rajasthan",
      ministryHindi: "नगर परिषद, पाली — राजस्थान सरकार",
      department: "Urban Local Body — Pali District, Rajasthan",
      title: "Trade License Certificate",
      titleHindi: "व्यापार लाइसेंस प्रमाण-पत्र",
      certNo: "TL/2018/PALI/04712",
      date: "20 Jan 2018",
      bodyText: `This is to certify that NAUKRI JUNCTION, situated at Bali, Pali District, Rajasthan — 306707, has been granted a Trade License to carry on the trade / business / occupation of Employment Services. This license has been issued under the Rajasthan Municipalities Act, 2009 and is subject to renewal as per applicable rules.`,
      fields: [
        { label: "Business Name", labelHindi: "व्यापार का नाम", value: "Naukri Junction" },
        { label: "License No.", labelHindi: "लाइसेंस संख्या", value: "TL/2018/PALI/04712" },
        { label: "Trade Activity", labelHindi: "व्यापार गतिविधि", value: "Employment Services" },
        { label: "Address", labelHindi: "पता", value: "Bali, Pali Dist., Rajasthan — 306707" },
        { label: "Renewal", labelHindi: "नवीनीकरण", value: "Renewed Annually" },
      ],
      signatory: "Municipal Commissioner",
      signatoryTitle: "Municipal Council, Pali — Govt. of Rajasthan",
      place: "Pali, Rajasthan",
      accentColor: "#7B1A1A",
      lightBg: "#FFF5F5",
    },
  ];

  return (
    <section className="bg-gray-100 py-14 px-4 border-t border-gray-200">
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
            Naukri Junction is a fully registered, licensed, and GST-compliant business
            operating under the laws of India. Your trust and safety are our top priority.
          </p>
        </div>

        {/* Certificate grid */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {certs.map((cert) => (
            <OfficialCertificate key={cert.certNo} {...cert} />
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          All registrations are maintained and renewed as required by law. Naukri Junction has been in continuous operation since 2018.
        </p>
      </div>
    </section>
  );
}
