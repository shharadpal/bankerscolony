import { db } from "../../db/index.js";
import { mcqs } from "../../db/schema.js";
import { sql } from "drizzle-orm";

const seedData = [
  {
    course: "Banking Awareness",
    difficulty: "Easy",
    access: "free",
    question: "What is the current Cash Reserve Ratio (CRR) maintained by Indian commercial banks with the RBI?",
    optionA: "4.00%",
    optionB: "4.50%",
    optionC: "3.50%",
    optionD: "5.00%",
    correctAnswer: "A",
    explanation: "The Cash Reserve Ratio (CRR) is the minimum percentage of a bank's total deposits that it must hold as liquid cash with the Reserve Bank of India. As of May 2026, the CRR is 4.00%. It is a key monetary policy instrument used by RBI to control money supply and liquidity in the banking system.",
  },
  {
    course: "Banking Awareness",
    difficulty: "Medium",
    access: "free",
    question: "Under the SARFAESI Act 2002, after issuing a demand notice, how many days must a bank wait before taking possession of secured assets?",
    optionA: "30 days",
    optionB: "45 days",
    optionC: "60 days",
    optionD: "90 days",
    correctAnswer: "C",
    explanation: "Under Section 13(2) of the SARFAESI Act 2002, the secured creditor must issue a demand notice to the borrower. If the borrower fails to repay within 60 days, the bank can take possession of the secured asset without court intervention. This is a critical NPA recovery tool for bank employees to know.",
  },
  {
    course: "Banking Awareness",
    difficulty: "Hard",
    access: "paid",
    question: "What is the provision requirement for Sub-Standard assets under RBI's prudential norms for NPA classification?",
    optionA: "10%",
    optionB: "15%",
    optionC: "20%",
    optionD: "25%",
    correctAnswer: "B",
    explanation: "Under RBI's prudential norms, Sub-Standard assets (NPAs for up to 12 months) require 15% provisioning. Doubtful assets require higher provisioning depending on the period.",
  },
  {
    course: "JAIIB — PPB",
    difficulty: "Easy",
    access: "free",
    question: "Which of the following is NOT a function of the Reserve Bank of India?",
    optionA: "Issuing currency notes",
    optionB: "Banker to the Government",
    optionC: "Lender of Last Resort",
    optionD: "Accepting deposits from public",
    correctAnswer: "D",
    explanation: "RBI does not accept deposits from the general public. It performs functions like: (1) issuing currency notes, (2) acting as banker and debt manager to the government, (3) functioning as lender of last resort, (4) regulating and supervising commercial banks. Accepting public deposits is a function of commercial banks, not RBI.",
  },
  {
    course: "Quantitative Aptitude",
    difficulty: "Medium",
    access: "free",
    question: "A principal of ₹10,000 is invested at 10% per annum compound interest for 2 years. What is the compound interest earned?",
    optionA: "₹2,000",
    optionB: "₹2,100",
    optionC: "₹1,900",
    optionD: "₹2,200",
    correctAnswer: "B",
    explanation: "CI = P[(1 + r/100)ⁿ − 1] = 10,000 × [(1.10)² − 1] = 10,000 × [1.21 − 1] = 10,000 × 0.21 = ₹2,100. Note: Simple Interest for same values = 10,000 × 10% × 2 = ₹2,000. CI is always more than SI.",
  },
  {
    course: "JAIIB — PPB",
    difficulty: "Hard",
    access: "paid",
    question: "In the context of Priority Sector Lending, what is the prescribed target for loans to Weaker Sections as a percentage of Adjusted Net Bank Credit?",
    optionA: "8%",
    optionB: "10%",
    optionC: "12%",
    optionD: "15%",
    correctAnswer: "B",
    explanation: "Under RBI's Priority Sector Lending guidelines, Domestic Scheduled Commercial Banks must lend 10% of ANBC to Weaker Sections. The overall PSL target is 40% of ANBC.",
  },
  {
    course: "Banking Awareness",
    difficulty: "Easy",
    access: "free",
    question: "What is the full form of NEFT?",
    optionA: "National Electronic Fund Transfer",
    optionB: "National Emergency Fund Transfer",
    optionC: "New Electronic Fund Transfer",
    optionD: "National Electronic Financial Transaction",
    correctAnswer: "A",
    explanation: "NEFT stands for National Electronic Fund Transfer. It is an electronic fund transfer system maintained by RBI that operates on a deferred net settlement basis.",
  },
  {
    course: "Banking Awareness",
    difficulty: "Medium",
    access: "free",
    question: "What is the maximum deposit amount insured by DICGC per depositor per bank?",
    optionA: "₹1 lakh",
    optionB: "₹3 lakh",
    optionC: "₹5 lakh",
    optionD: "₹10 lakh",
    correctAnswer: "C",
    explanation: "The Deposit Insurance and Credit Guarantee Corporation (DICGC) insures deposits up to ₹5 lakh per depositor per bank. This was increased from ₹1 lakh in February 2020.",
  },
  {
    course: "JAIIB — PPB",
    difficulty: "Medium",
    access: "free",
    question: "Under KYC norms, what is the meaning of 'CDD'?",
    optionA: "Customer Due Diligence",
    optionB: "Customer Data Documentation",
    optionC: "Credit Due Diligence",
    optionD: "Central Data Directory",
    correctAnswer: "A",
    explanation: "CDD stands for Customer Due Diligence. It is a key component of KYC compliance requiring banks to verify customer identity, understand the nature of business, and assess money laundering risks.",
  },
  {
    course: "Banking Awareness",
    difficulty: "Easy",
    access: "free",
    question: "Who is the current Governor of the Reserve Bank of India (as of 2026)?",
    optionA: "Urjit Patel",
    optionB: "Raghuram Rajan",
    optionC: "Sanjay Malhotra",
    optionD: "Shaktikanta Das",
    correctAnswer: "C",
    explanation: "Sanjay Malhotra is the current Governor of the Reserve Bank of India, having assumed the role in December 2024.",
  },
];

export default async (req: Request) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  const [existing] = await db
    .select({ count: sql<number>`count(*)` })
    .from(mcqs);

  if (Number(existing.count) > 0) {
    return Response.json({ message: "Database already seeded", count: Number(existing.count) });
  }

  await db.insert(mcqs).values(seedData);

  return Response.json({ success: true, message: `Seeded ${seedData.length} MCQs` });
};

export const config = {
  path: "/api/seed",
};
