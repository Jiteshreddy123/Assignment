// Sri Lanka Inland Revenue Department - Mock Data & Tax Engine Config

export const TAX_SLABS_2024 = [
  { limit: 500000, rate: 0.06, label: "First LKR 500,000 @ 6%" },
  { limit: 500000, rate: 0.12, label: "Next LKR 500,000 @ 12%" },
  { limit: 500000, rate: 0.18, label: "Next LKR 500,000 @ 18%" },
  { limit: 500000, rate: 0.24, label: "Next LKR 500,000 @ 24%" },
  { limit: 500000, rate: 0.30, label: "Next LKR 500,000 @ 30%" },
  { limit: Infinity, rate: 0.36, label: "Balance amount @ 36%" }
];

export const ANNUAL_RELIEF_ALLOWANCE = 1200000; // LKR 1.2M tax-free threshold

export const MOCK_USERS = [
  {
    id: "user-1",
    name: "Kasun Thilina Perera",
    tin: "198923400-0000",
    nic: "199418302194",
    email: "kasun.perera@techcolombo.lk",
    phone: "+94 77 123 4567",
    occupation: "Lead Software Architect",
    taxType: "Individual / Personal Income Tax",
    registeredOffice: "Regional Office - Colombo South",
    status: "Compliant",
    currentDue: 45000,
    annualEstimatedTax: 380000,
    apitDeducted: 335000,
    lastPaymentDate: "2024-08-14",
    assessmentYear: "2024/2025"
  },
  {
    id: "user-2",
    name: "Nimali Priyadarshani Silva",
    tin: "200154800-0000",
    nic: "200154801923",
    email: "nimali.design@gmail.com",
    phone: "+94 71 987 6543",
    occupation: "Freelance UX/UI Consultant",
    taxType: "Individual / Personal Income Tax",
    registeredOffice: "Regional Office - Gampaha",
    status: "Pending Q3 Payment",
    currentDue: 62500,
    annualEstimatedTax: 250000,
    apitDeducted: 0,
    lastPaymentDate: "2024-05-10",
    assessmentYear: "2024/2025"
  }
];

export const MOCK_PAYMENT_HISTORY = [
  {
    id: "TXN-98412",
    din: "DIN-2024-05-19892340-02",
    date: "14 Aug 2024, 02:45 PM",
    taxYear: "2024/2025",
    period: "Quarter 2 (Period Code: 24020)",
    periodCode: "24020",
    taxType: "05 - Personal Income Tax (PIT)",
    paymentType: "01 - Self-Assessment",
    amount: 85000,
    method: "LankaPay OTPP (Commercial Bank)",
    reference: "LP-CB-84920194",
    status: "Acknowledged & Cleared",
    receiptUrl: "#"
  },
  {
    id: "TXN-76194",
    din: "DIN-2024-05-19892340-01",
    date: "15 May 2024, 11:20 AM",
    taxYear: "2024/2025",
    period: "Quarter 1 (Period Code: 24010)",
    periodCode: "24010",
    taxType: "05 - Personal Income Tax (PIT)",
    paymentType: "01 - Self-Assessment",
    amount: 85000,
    method: "BOC Bank Slip / Counter Deposit",
    reference: "BOC-DEP-391823",
    status: "Acknowledged & Cleared",
    receiptUrl: "#"
  },
  {
    id: "TXN-54109",
    din: "DIN-2023-05-19892340-04",
    date: "28 Feb 2024, 04:10 PM",
    taxYear: "2023/2024",
    period: "Quarter 4 / Final (Period Code: 23040)",
    periodCode: "23040",
    taxType: "05 - Personal Income Tax (PIT)",
    paymentType: "01 - Self-Assessment",
    amount: 60000,
    method: "LankaPay OTPP (Sampath Bank)",
    reference: "LP-SMP-129482",
    status: "Acknowledged & Cleared",
    receiptUrl: "#"
  }
];

export const TAX_PERIODS = [
  {
    id: "2024-q3",
    year: "2024/2025",
    quarter: "Quarter 3 (Oct - Dec 2024)",
    periodCode: "24030",
    dueDate: "15 Jan 2025",
    status: "Due Now",
    isRecommended: true
  },
  {
    id: "2024-q4",
    year: "2024/2025",
    quarter: "Quarter 4 / Final (Jan - Mar 2025)",
    periodCode: "24040",
    dueDate: "15 Apr 2025",
    status: "Upcoming",
    isRecommended: false
  },
  {
    id: "2024-annual",
    year: "2024/2025",
    quarter: "Final Annual Return Balance",
    periodCode: "24000",
    dueDate: "30 Nov 2025",
    status: "Upcoming",
    isRecommended: false
  },
  {
    id: "2023-q4",
    year: "2023/2024",
    quarter: "Arrears / Settlement (Past Year)",
    periodCode: "23040",
    dueDate: "Past Due",
    status: "Settlement",
    isRecommended: false
  }
];

export const TRANSLATIONS = {
  en: {
    portalName: "Inland Revenue Department",
    tagline: "Democratic Socialist Republic of Sri Lanka",
    eServices: "Citizen Tax Portal 2.0",
    navDashboard: "Dashboard",
    navPayTax: "Pay Taxes",
    navVoucher: "DIN Voucher Slip",
    navReturns: "File Returns",
    navHistory: "Payment History",
    navHelp: "Tax Guide & Hotline",
    greeting: "Welcome back",
    tinLabel: "TIN (Taxpayer Identification No.)",
    nicLabel: "NIC Number",
    statusCompliant: "Tax Compliant",
    statusPending: "Payment Pending",
    quickPayBtn: "Pay Personal Income Tax (PIT)",
    generateDinBtn: "Generate Payment Voucher (DIN)",
    calculatorTitle: "Interactive Tax Estimator",
    reliefNote: "Annual tax-free relief of LKR 1,200,000 is automatically deducted."
  },
  si: {
    portalName: "දේශීය ආදායම් දෙපාර්තමේන්තුව",
    tagline: "ශ්‍රී ලංකා ප්‍රජාතාන්ත්‍රික සමාජවාදී ජනරජය",
    eServices: "පුරවැසි බදු පද්ධතිය 2.0",
    navDashboard: "ප්‍රධාන පුවරුව",
    navPayTax: "බදු ගෙවන්න",
    navVoucher: "DIN ගෙවීම් පත්‍රිකාව",
    navReturns: "වාර්තා ඉදිරිපත් කිරීම",
    navHistory: "ගෙවීම් ඉතිහාසය",
    navHelp: "උපකාරක සේවය",
    greeting: "ආයුබෝවන්",
    tinLabel: "බදු ගෙවන්නාගේ අංකය (TIN)",
    nicLabel: "ජාතික හැඳුනුම්පත් අංකය",
    statusCompliant: "නියමිත පරිදි බදු ගෙවා ඇත",
    statusPending: "ගෙවීමට ඉතිරිව ඇත",
    quickPayBtn: "පුද්ගලික ආදායම් බද්ද (PIT) ගෙවන්න",
    generateDinBtn: "DIN ගෙවීම් වවුචරය සාදන්න",
    calculatorTitle: "ස්වයංක්‍රීය බදු ගණකය",
    reliefNote: "වාර්ෂික බදු නිදහස් සහනය රු. 1,200,000 ස්වයංක්‍රීයව අඩු කෙරේ."
  },
  ta: {
    portalName: "உள்நாட்டு இறைவரித் திணைக்களம்",
    tagline: "இலங்கை சனநாயக சோசலிசக் குடியரசு",
    eServices: "குடிமக்கள் வரி தளம் 2.0",
    navDashboard: "முகப்பு",
    navPayTax: "வரி செலுத்துங்கள்",
    navVoucher: "DIN செலுத்துகை சீட்டு",
    navReturns: "வருமான அறிக்கை",
    navHistory: "செலுத்தல் வரலாறு",
    navHelp: "உதவி மையம்",
    greeting: "வணக்கம்",
    tinLabel: "வரி செலுத்துவோர் அடையாள எண் (TIN)",
    nicLabel: "தேசிய அடையாள அட்டை எண்",
    statusCompliant: "வரி ஒழுங்குபடுத்தப்பட்டது",
    statusPending: "செலுத்த வேண்டியுள்ளது",
    quickPayBtn: "தனிநபர் வருமான வரி (PIT) செலுத்தவும்",
    generateDinBtn: "DIN ரசீது சீட்டை உருவாக்கவும்",
    calculatorTitle: "வரி கணிப்பான்",
    reliefNote: "ஆண்டுக்கு ரூ. 1,200,000 வரிவிலக்கு தானாகக் கழிக்கப்படுகிறது."
  }
};

// Calculate personal income tax according to Sri Lankan tax law
export function calculatePIT(annualGrossIncome, apitAlreadyPaid = 0, otherDeductions = 0) {
  const taxableIncome = Math.max(0, annualGrossIncome - ANNUAL_RELIEF_ALLOWANCE - otherDeductions);
  let remaining = taxableIncome;
  let totalTax = 0;
  const breakdown = [];

  for (const slab of TAX_SLABS_2024) {
    if (remaining <= 0) break;
    const amountInSlab = Math.min(remaining, slab.limit);
    const taxInSlab = amountInSlab * slab.rate;
    totalTax += taxInSlab;
    breakdown.push({
      label: slab.label,
      taxableAmount: amountInSlab,
      ratePercent: slab.rate * 100,
      tax: taxInSlab
    });
    remaining -= amountInSlab;
  }

  const netPayable = Math.max(0, totalTax - apitAlreadyPaid);

  return {
    annualGrossIncome,
    reliefDeduction: Math.min(annualGrossIncome, ANNUAL_RELIEF_ALLOWANCE),
    otherDeductions,
    taxableIncome,
    totalTax,
    apitAlreadyPaid,
    netPayable,
    breakdown
  };
}
