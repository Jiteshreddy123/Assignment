import React, { useState } from 'react';
import { X, Copy, Check, FileText, Award, Lightbulb, Target, Layers } from 'lucide-react';

export default function CaseStudyModal({ onClose }) {
  const [copied, setCopied] = useState(false);

  const humanCommentText = `Hi everyone, here is my solution for the IRD e-Services usability assessment:

When navigating personal income tax in Sri Lanka, the core issue isn't that tax calculation itself is impossible—it's that the portal forces citizens to understand the department's internal database structure. Having to figure out that Personal Income Tax is 'Tax Type 05', that a specific quarter is 'Period 24030', or how to manually generate an isolated DIN code creates unnecessary friction for everyday people.

Here is how I approached the redesign:

1. Plain-Language 3-Step Payment Flow
Instead of asking citizens for technical tax codes and period numbers, the interface lets users pick their quarter in simple terms (e.g., 'Oct – Dec 2024'). All backend RAMIS codes are mapped automatically.

2. In-Flow Tax Estimator
Rather than expecting taxpayers to compute their liability on separate spreadsheets, the portal includes a built-in estimator. It automatically factors in the statutory LKR 1,200,000 tax-free relief, calculates the progressive tax brackets (6% to 36%), and subtracts employer APIT deductions already paid.

3. Seamless DIN & Checkout Handshake
The Document Identification Number (DIN) is generated automatically within the flow. Users can pay directly via LankaPay, scan via LankaQR from their banking app (Commercial Bank Flash, Sampath WePay, BOC SmartPay), or generate a clean, printable official bank deposit slip for branch visits.

4. Verifiable Digital Receipts & Overview
Provides an immediate electronic payment certificate with a digital verification QR code, giving citizens instant peace of mind and an ongoing compliance record.

5. Accessibility & Multilingual Design
Clean, responsive layout with support for English, Sinhala, and Tamil, designed with high contrast and readable typography.

I've put together an interactive working prototype demonstrating this complete flow. Looking forward to your thoughts!`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(humanCommentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-xl border border-slate-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1e2a44] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Internship Assessment • Proposal & Case Study
              </h3>
              <p className="text-xs text-slate-300 font-normal">
                Human-centered UX breakdown and ready-to-use comment draft
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Comment Submission Card */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-semibold text-amber-300 tracking-wide uppercase">
                Ready-to-Post Comment Draft
              </span>
              <button
                onClick={handleCopy}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-semibold transition flex items-center space-x-1.5 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
              </button>
            </div>
            <pre className="mt-4 text-xs font-sans whitespace-pre-wrap text-slate-300 leading-relaxed max-h-64 overflow-y-auto pr-2">
              {humanCommentText}
            </pre>
          </div>

          {/* Design Rationale Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-pastel-blueBorder bg-pastel-blue/60 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-pastel-blueText flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-xs text-slate-900">Reduced Cognitive Strain</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Replaces database codes with natural labels so taxpayers never have to search for tutorials just to pick a payment period.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-pastel-mintBorder bg-pastel-mint/60 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-pastel-mintText flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-xs text-slate-900">In-Line Tax Calculator</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Applies the statutory LKR 1.2M tax-free relief and credit for APIT deductions directly in the flow without third-party tools.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-pastel-lavenderBorder bg-pastel-lavender/60 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-pastel-lavenderText flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-xs text-slate-900">Multi-Channel Checkout</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Supports instant online card payments, LankaQR mobile banking scans, and auto-generated printable slips for bank branches.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center shrink-0">
          <p className="text-xs text-slate-500 font-normal">
            Ready to paste directly into your assessment response.
          </p>
          <button
            onClick={onClose}
            className="px-4.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
