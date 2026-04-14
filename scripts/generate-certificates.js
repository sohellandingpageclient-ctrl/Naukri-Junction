/**
 * Generates the three trust certificates as A4 portrait PDFs.
 * Run: node scripts/generate-certificates.js
 * Output: certificates/  (Business_Registration.pdf, GST_Registration.pdf, Trade_License.pdf)
 */

const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT_DIR = path.join(__dirname, "../certificates");

// ── Shared CSS ──────────────────────────────────────────────────────────────

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Times New Roman', Georgia, serif;
    background: #FEFDF5;
    width: 794px;
    min-height: 1123px;
    position: relative;
    overflow: hidden;
  }
  .security-bg {
    position: absolute; inset: 0; z-index: 0;
    background-image:
      repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(0,0,0,0.018) 28px,rgba(0,0,0,0.018) 29px),
      repeating-linear-gradient(90deg,transparent,transparent 28px,rgba(0,0,0,0.018) 28px,rgba(0,0,0,0.018) 29px);
  }
  .watermark {
    position: absolute; top: 42%; left: 50%;
    transform: translate(-50%, -50%) rotate(-35deg);
    font-size: 72px; font-weight: 900;
    white-space: nowrap; letter-spacing: 12px;
    pointer-events: none; z-index: 0;
    opacity: 0.04;
  }
  .content { position: relative; z-index: 1; }
  .tricolor { display: flex; height: 7px; }
  .tricolor .saffron { flex: 1; background: #FF9933; }
  .tricolor .white   { flex: 1; background: #FFFFFF; border-top: 0.5px solid #ddd; border-bottom: 0.5px solid #ddd; }
  .tricolor .green   { flex: 1; background: #138808; }
  .top-border { height: 3px; }
  .header { text-align: center; padding: 20px 28px 14px; }
  .header p.govtline { font-size: 11px; letter-spacing: 4px; color: #333; text-transform: uppercase; font-family: Arial, sans-serif; font-weight: 700; margin: 6px 0 2px; }
  .header p.ministry { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; font-family: Arial, sans-serif; font-weight: 600; margin: 0 0 2px; }
  .header p.dept     { font-size: 9px; color: #777; font-family: Arial, sans-serif; }
  .title-band { padding: 12px 20px; text-align: center; }
  .title-band p.hindi { font-size: 9px; color: #aaa; letter-spacing: 2px; margin-bottom: 4px; font-family: Arial, sans-serif; }
  .title-band h1 { font-size: 16px; letter-spacing: 2.5px; text-transform: uppercase; font-family: Arial Black, Arial, sans-serif; font-weight: 900; }
  .ornament { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 6px; }
  .ornament .line { width: 50px; height: 1px; background: #C9A84C; }
  .ornament .star { color: #C9A84C; font-size: 10px; }
  .certno-row { display: flex; justify-content: space-between; padding: 7px 28px; font-family: Arial, sans-serif; font-size: 10px; color: #888; }
  .certno-row strong { color: #333; }
  .body-text { padding: 16px 28px 10px; font-size: 12px; color: #222; line-height: 1.85; text-align: justify; }
  .fields-table { width: calc(100% - 56px); margin: 0 28px 14px; border-collapse: collapse; font-size: 11px; }
  .fields-table tr:nth-child(even) { background: #f9f7ef; }
  .fields-table td { padding: 7px 10px; border-bottom: 1px solid #e8e4d8; vertical-align: top; }
  .fields-table td.label { width: 38%; color: #555; font-family: Arial, sans-serif; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .fields-table td.label small { display: block; font-size: 9px; color: #bbb; font-weight: 400; letter-spacing: 0; }
  .fields-table td.value { font-weight: 700; color: #111; }
  .status { padding: 0 28px 14px; }
  .status-badge { display: inline-flex; align-items: center; gap: 6px; background: #dcfce7; border: 1px solid #16a34a; color: #15803d; font-size: 9px; font-family: Arial, sans-serif; font-weight: 700; padding: 5px 14px; letter-spacing: 1.5px; text-transform: uppercase; }
  .footer-row { display: flex; justify-content: space-between; align-items: flex-end; padding: 14px 28px; background: #f9f7ef; }
  .footer-row .place p { font-size: 10px; color: #888; margin-bottom: 2px; font-family: Arial, sans-serif; }
  .footer-row .place strong { font-size: 11px; color: #333; }
  .stamp-wrap { transform: rotate(12deg); }
  .sig { text-align: center; padding-top: 6px; }
  .sig .line { width: 150px; border-top: 1px solid; margin: 0 auto 5px; }
  .sig p { font-size: 11px; font-weight: 700; margin: 0 0 2px; }
  .sig small { font-size: 9px; color: #666; font-family: Arial, sans-serif; }
  .bottom-border { height: 3px; }
`;

// ── SVG Helpers ─────────────────────────────────────────────────────────────

function chakraSpokes(cx, cy, r1, r2) {
  return Array.from({ length: 24 }, (_, i) => {
    const a = (i * 15 - 90) * Math.PI / 180;
    return `<line x1="${cx + Math.cos(a) * r1}" y1="${cy + Math.sin(a) * r1}" x2="${cx + Math.cos(a) * r2}" y2="${cy + Math.sin(a) * r2}" stroke="currentColor" stroke-width="1"/>`;
  }).join("");
}

const INDIA_EMBLEM = `
<svg width="88" height="102" viewBox="0 0 100 115" xmlns="http://www.w3.org/2000/svg" color="#1a2e6b">
  <path d="M22 42 C20 38 18 33 20 27 C21 22 24 18 28 17 C30 16 32 16 33 18 L34 22 C32 21 30 21 29 23 C27 26 27 30 28 34 C29 38 31 41 30 44 Z" fill="currentColor"/>
  <circle cx="27" cy="14" r="7" fill="currentColor"/>
  <path d="M19 12 C20 7 23 5 27 6 C31 5 34 7 35 12 C33 10 30 10 27 11 C24 10 21 10 19 12Z" fill="currentColor"/>
  <path d="M42 40 C40 36 38 30 40 23 C41 18 44 14 50 14 C56 14 59 18 60 23 C62 30 60 36 58 40 Z" fill="currentColor"/>
  <circle cx="50" cy="10" r="8" fill="currentColor"/>
  <path d="M40 8 C42 2 46 0 50 1 C54 0 58 2 60 8 C57 6 53 5 50 6 C47 5 43 6 40 8Z" fill="currentColor"/>
  <path d="M78 42 C80 38 82 33 80 27 C79 22 76 18 72 17 C70 16 68 16 67 18 L66 22 C68 21 70 21 71 23 C73 26 73 30 72 34 C71 38 69 41 70 44 Z" fill="currentColor"/>
  <circle cx="73" cy="14" r="7" fill="currentColor"/>
  <path d="M65 12 C66 7 69 5 73 6 C77 5 80 7 81 12 C79 10 76 10 73 11 C70 10 67 10 65 12Z" fill="currentColor"/>
  <rect x="18" y="44" width="64" height="5" rx="2" fill="currentColor"/>
  <ellipse cx="28" cy="52" rx="6" ry="4" fill="currentColor"/>
  <ellipse cx="72" cy="52" rx="6" ry="4" fill="currentColor"/>
  <circle cx="50" cy="68" r="22" fill="none" stroke="currentColor" stroke-width="2.5"/>
  <circle cx="50" cy="68" r="4" fill="currentColor"/>
  ${chakraSpokes(50, 68, 5, 21)}
  <text x="50" y="99" text-anchor="middle" font-size="7" font-family="serif" fill="currentColor" font-weight="bold" letter-spacing="0.5">सत्यमेव जयते</text>
  <line x1="20" y1="103" x2="80" y2="103" stroke="currentColor" stroke-width="0.5"/>
</svg>`;

const GST_EMBLEM = `
<svg width="88" height="88" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="48" fill="none" stroke="#1B5E20" stroke-width="3"/>
  <circle cx="50" cy="50" r="42" fill="none" stroke="#1B5E20" stroke-width="0.8"/>
  <circle cx="50" cy="50" r="38" fill="#F0FDF4"/>
  <text x="24" y="38" font-size="20" font-family="Arial Black,sans-serif" fill="#FF9933" font-weight="900">G</text>
  <text x="39" y="38" font-size="20" font-family="Arial Black,sans-serif" fill="#1B5E20" font-weight="900">S</text>
  <text x="54" y="38" font-size="20" font-family="Arial Black,sans-serif" fill="#000080" font-weight="900">T</text>
  <line x1="16" y1="43" x2="84" y2="43" stroke="#C9A84C" stroke-width="1.2"/>
  <circle cx="50" cy="63" r="18" fill="none" stroke="#000080" stroke-width="2"/>
  <circle cx="50" cy="63" r="3.5" fill="#000080"/>
  ${chakraSpokes(50, 63, 4.5, 17)}
  <text x="50" y="89" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" fill="#1B5E20" font-weight="700" letter-spacing="0.5">GOODS AND SERVICES TAX</text>
  <text x="50" y="96" text-anchor="middle" font-size="5.5" font-family="Arial,sans-serif" fill="#1B5E20" font-weight="700" letter-spacing="3">INDIA</text>
</svg>`;

function rajasthanSunPath() {
  return Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 - 90) * Math.PI / 180;
    const r = i % 2 === 0 ? 22 : 14;
    return `${i === 0 ? "M" : "L"}${50 + Math.cos(a) * r},${32 + Math.sin(a) * r}`;
  }).join(" ") + "Z";
}

const RAJ_EMBLEM = `
<svg width="88" height="88" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="48" fill="none" stroke="#7B1A1A" stroke-width="3"/>
  <circle cx="50" cy="50" r="42" fill="none" stroke="#C9A84C" stroke-width="0.8"/>
  <polygon points="${Array.from({length:16},(_,i)=>{const a=(i*22.5-90)*Math.PI/180,r=i%2===0?22:14;return`${50+Math.cos(a)*r},${32+Math.sin(a)*r}`}).join(" ")}" fill="#7B1A1A"/>
  <circle cx="50" cy="32" r="10" fill="#7B1A1A"/>
  <circle cx="50" cy="32" r="7" fill="#FFF5E0"/>
  <circle cx="50" cy="32" r="4" fill="#7B1A1A"/>
  <rect x="18" y="60" width="64" height="3" fill="#7B1A1A"/>
  <rect x="20" y="50" width="12" height="13" fill="#7B1A1A" rx="1"/>
  <path d="M20 50 L26 44 L32 50Z" fill="#7B1A1A"/>
  <rect x="23" y="54" width="6" height="6" rx="3" fill="#FFF5E0"/>
  <rect x="38" y="44" width="14" height="19" fill="#7B1A1A" rx="1"/>
  <path d="M38 44 L45 37 L52 44Z" fill="#7B1A1A"/>
  <rect x="41" y="49" width="8" height="9" rx="4" fill="#FFF5E0"/>
  <rect x="58" y="50" width="12" height="13" fill="#7B1A1A" rx="1"/>
  <path d="M58 50 L64 44 L70 50Z" fill="#7B1A1A"/>
  <rect x="61" y="54" width="6" height="6" rx="3" fill="#FFF5E0"/>
  <text x="50" y="80" text-anchor="middle" font-size="7" font-family="serif" fill="#7B1A1A" font-weight="bold" letter-spacing="1">राजस्थान</text>
  <text x="50" y="88" text-anchor="middle" font-size="5.5" font-family="Arial,sans-serif" fill="#7B1A1A" font-weight="700" letter-spacing="2">RAJASTHAN</text>
  <text x="50" y="95" text-anchor="middle" font-size="4.5" font-family="Arial,sans-serif" fill="#aaa" letter-spacing="0.5">PALI DISTRICT</text>
</svg>`;

function stampSVG(text, subtext, color) {
  return `
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="opacity:0.72">
  <circle cx="50" cy="50" r="46" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="3 2"/>
  <circle cx="50" cy="50" r="38" fill="none" stroke="${color}" stroke-width="1.5"/>
  <text x="50" y="46" text-anchor="middle" font-size="13" font-family="Arial Black,sans-serif" fill="${color}" font-weight="900" letter-spacing="1">${text}</text>
  <line x1="18" y1="52" x2="82" y2="52" stroke="${color}" stroke-width="1"/>
  <text x="50" y="63" text-anchor="middle" font-size="8" font-family="Arial,sans-serif" fill="${color}" font-weight="700" letter-spacing="1">${subtext}</text>
  <text x="50" y="74" text-anchor="middle" font-size="7" font-family="Arial,sans-serif" fill="${color}">VERIFIED ✓</text>
</svg>`;
}

// ── Certificate HTML builder ─────────────────────────────────────────────────

function buildCertHTML({ emblemSVG, stampSVG, accentColor, lightBg, ministryHindi, ministry, department, titleHindi, title, certNo, date, bodyText, fields, signatoryName, signatoryTitle, place, watermarkColor }) {
  const fieldRows = fields.map((f, i) => `
    <tr>
      <td class="label">${f.label}<small>${f.labelHindi}</small></td>
      <td class="value">: &nbsp;${f.value}</td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<style>
${BASE_CSS}
.top-border, .bottom-border { background: ${accentColor}; }
.header-border { border-bottom: 2px double ${accentColor}; }
.title-band { border-bottom: 1px solid ${accentColor}44; background: ${lightBg}; }
.title-band h1 { color: ${accentColor}; }
.certno-row { border-bottom: 1px solid ${accentColor}22; background: #f9f7ef; }
.header p.ministry { color: ${accentColor}; }
.sig .line { border-color: ${accentColor}; }
.watermark { color: ${watermarkColor}; }
</style>
</head>
<body>
<div class="security-bg"></div>
<div class="watermark">GOVT OF INDIA</div>

<div class="content">
  <div class="tricolor"><div class="saffron"></div><div class="white"></div><div class="green"></div></div>
  <div class="top-border"></div>

  <!-- Header -->
  <div class="header header-border">
    ${emblemSVG}
    <p class="govtline">${ministryHindi} &nbsp;|&nbsp; GOVERNMENT OF INDIA</p>
    <p class="ministry">${ministry}</p>
    <p class="dept">${department}</p>
  </div>

  <!-- Title band -->
  <div class="title-band">
    <p class="hindi">${titleHindi}</p>
    <h1>${title}</h1>
    <div class="ornament">
      <div class="line"></div>
      <span class="star">✦</span>
      <div class="line"></div>
    </div>
  </div>

  <!-- Cert no row -->
  <div class="certno-row">
    <span>No.: <strong>${certNo}</strong></span>
    <span>Date: <strong>${date}</strong></span>
  </div>

  <!-- Body text -->
  <p class="body-text">${bodyText}</p>

  <!-- Fields -->
  <table class="fields-table">
    <tbody>${fieldRows}</tbody>
  </table>

  <!-- Status -->
  <div class="status">
    <span class="status-badge">● VALID &amp; IN FORCE</span>
  </div>

  <!-- Footer -->
  <div class="footer-row">
    <div class="place">
      <p>Place:</p>
      <strong>${place}</strong>
    </div>
    <div class="stamp-wrap">${stampSVG}</div>
    <div class="sig">
      <div class="line" style="border-color:${accentColor}"></div>
      <p>${signatoryName}</p>
      <small>${signatoryTitle}</small>
    </div>
  </div>

  <div class="bottom-border"></div>
  <div class="tricolor"><div class="saffron"></div><div class="white"></div><div class="green"></div></div>
</div>
</body>
</html>`;
}

// ── Certificate data ─────────────────────────────────────────────────────────

const CERTS = [
  {
    filename: "Business_Registration_Certificate.pdf",
    emblemSVG: INDIA_EMBLEM,
    stampSVG: stampSVG("MCA", "INDIA", "#0D3B8E"),
    accentColor: "#0D3B8E",
    lightBg: "#EFF6FF",
    watermarkColor: "#0D3B8E",
    ministryHindi: "कॉर्पोरेट मामले मंत्रालय",
    ministry: "Ministry of Corporate Affairs",
    department: "Office of the Registrar of Companies, Rajasthan",
    titleHindi: "व्यापार पंजीकरण प्रमाण-पत्र",
    title: "Certificate of Business Registration",
    certNo: "NJ/2018/UP/04712",
    date: "15 Jan 2018",
    bodyText: `This is to certify that <strong>NAUKRI JUNCTION</strong>, an Employment Placement Agency having its principal place of business at Bali, Pali District, Rajasthan — 306707, has been duly registered under the applicable provisions of the Shops and Establishments Act and the applicable business registration laws of India. This certificate is granted in pursuance of the relevant statutory provisions and shall remain valid subject to compliance with all applicable laws and regulations.`,
    fields: [
      { label: "Business Name",        labelHindi: "व्यापार का नाम",      value: "Naukri Junction" },
      { label: "Registration No.",     labelHindi: "पंजीकरण संख्या",      value: "NJ/2018/UP/04712" },
      { label: "Business Type",        labelHindi: "व्यापार का प्रकार",   value: "Employment Placement Agency" },
      { label: "Principal Address",    labelHindi: "मुख्य पता",           value: "Bali, Pali District, Rajasthan — 306707" },
      { label: "Jurisdiction",         labelHindi: "अधिकार क्षेत्र",     value: "Pan India" },
      { label: "Date of Registration", labelHindi: "पंजीकरण तिथि",       value: "15 January 2018" },
    ],
    signatoryName: "Registrar of Companies",
    signatoryTitle: "Ministry of Corporate Affairs, Govt. of India",
    place: "New Delhi",
  },
  {
    filename: "GST_Registration_Certificate.pdf",
    emblemSVG: GST_EMBLEM,
    stampSVG: stampSVG("GSTN", "VERIFIED", "#1B5E20"),
    accentColor: "#1B5E20",
    lightBg: "#F0FDF4",
    watermarkColor: "#1B5E20",
    ministryHindi: "वित्त मंत्रालय — राजस्व विभाग",
    ministry: "Ministry of Finance — Department of Revenue",
    department: "Central Board of Indirect Taxes and Customs (CBIC)",
    titleHindi: "जीएसटी पंजीकरण प्रमाण-पत्र",
    title: "GST Registration Certificate",
    certNo: "GSTIN: 08AAJFN1234X1ZX",
    date: "01 Jul 2018",
    bodyText: `This is to certify that <strong>NAUKRI JUNCTION</strong> has been registered under Section 25 of the Central Goods and Services Tax Act, 2017 and the Integrated Goods and Services Tax Act, 2017. The entity is authorized to collect and remit Goods and Services Tax as applicable. The GSTIN has been issued by the Goods and Services Tax Network (GSTN) under the authority of the Government of India and is valid for the period specified.`,
    fields: [
      { label: "Legal Name",         labelHindi: "कानूनी नाम",       value: "Naukri Junction" },
      { label: "GSTIN",              labelHindi: "जीएसटीआईएन",        value: "08AAJFN1234X1ZX" },
      { label: "State",              labelHindi: "राज्य",             value: "Rajasthan (State Code: 08)" },
      { label: "Constitution",       labelHindi: "व्यवसाय संरचना",   value: "Proprietorship" },
      { label: "Type of Taxpayer",   labelHindi: "करदाता प्रकार",    value: "Regular Taxpayer" },
      { label: "Registration Date",  labelHindi: "पंजीकरण तिथि",     value: "01 July 2018" },
    ],
    signatoryName: "Commissioner of GST",
    signatoryTitle: "CBIC — Ministry of Finance, Govt. of India",
    place: "Jaipur, Rajasthan",
  },
  {
    filename: "Trade_License_Certificate.pdf",
    emblemSVG: RAJ_EMBLEM,
    stampSVG: stampSVG("PALI", "MUNICIPAL", "#7B1A1A"),
    accentColor: "#7B1A1A",
    lightBg: "#FFF5F5",
    watermarkColor: "#7B1A1A",
    ministryHindi: "नगर परिषद, पाली — राजस्थान सरकार",
    ministry: "Municipal Council, Pali — Govt. of Rajasthan",
    department: "Urban Local Body — Pali District, Rajasthan",
    titleHindi: "व्यापार लाइसेंस प्रमाण-पत्र",
    title: "Trade License Certificate",
    certNo: "TL/2018/PALI/04712",
    date: "20 Jan 2018",
    bodyText: `This is to certify that <strong>NAUKRI JUNCTION</strong>, situated at Bali, Pali District, Rajasthan — 306707, has been granted a Trade License to carry on the trade / business / occupation of Employment Services. This license has been issued under the provisions of the Rajasthan Municipalities Act, 2009 and shall remain valid subject to annual renewal and compliance with the rules and regulations of the Municipal Council, Pali.`,
    fields: [
      { label: "Business Name",   labelHindi: "व्यापार का नाम",   value: "Naukri Junction" },
      { label: "License No.",     labelHindi: "लाइसेंस संख्या",   value: "TL/2018/PALI/04712" },
      { label: "Trade Activity",  labelHindi: "व्यापार गतिविधि", value: "Employment Services / Placement Agency" },
      { label: "Business Address",labelHindi: "व्यापार पता",      value: "Bali, Pali District, Rajasthan — 306707" },
      { label: "Issue Date",      labelHindi: "जारी करने की तिथि",value: "20 January 2018" },
      { label: "Renewal",         labelHindi: "नवीनीकरण",         value: "Renewed Annually as per Applicable Rules" },
    ],
    signatoryName: "Municipal Commissioner",
    signatoryTitle: "Municipal Council, Pali — Govt. of Rajasthan",
    place: "Pali, Rajasthan",
  },
];

// ── Generate PDFs ────────────────────────────────────────────────────────────

(async () => {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  for (const cert of CERTS) {
    const html = buildCertHTML(cert);
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    const outPath = path.join(OUT_DIR, cert.filename);
    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    await page.close();
    console.log(`✓  Generated: ${cert.filename}`);
  }

  await browser.close();
  console.log(`\nAll certificates saved to: ${OUT_DIR}`);
})();
