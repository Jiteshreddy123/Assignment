import React from 'react';
import { X, ArrowRight, CheckCircle2, AlertCircle, Sparkles, Layers } from 'lucide-react';

export default function OldVsNewModal({ onClose, onTryNewFlow }) {
  const comparisons = [
    {
      category: "1. Authentication & Identity",
      oldProblem: "TIN and PIN separation. Citizens must first register for a TIN, wait for postal or manual verification, then submit a separate PIN request form before they can even access services.",
      newSolution: "Simple identity verification via National Identity Card (NIC) with mobile OTP, combined with an instant self-service 'Lookup My TIN' tool."
    },
    {
      category: "2. Personal Income Tax Payment Workflow",
      oldProblem: "Internal database codes exposed directly to the public. Users are required to know Tax Type '05', obscure period codes like '24030', and payment type '01' with no guidance.",
      newSolution: "Human-centric 3-step wizard. Citizens simply choose their assessment quarter (e.g. 'Oct - Dec 2024'), and all government codes map automatically in the background."
    },
    {
      category: "3. Tax Computation & Relief Allowances",
      oldProblem: "Zero calculation support. Taxpayers must calculate progressive brackets (6% to 36%), relief thresholds, and employer deductions offline before making a payment.",
      newSolution: "Built-in tax estimator. Automatically applies the LKR 1,200,000 tax-free allowance, computes tax slabs in real time, and deducts APIT already paid by employers."
    },
    {
      category: "4. Payment Voucher (DIN) & Bank Handshake",
      oldProblem: "Disconnected process. Users had to manually generate a Document Identification Number (DIN), leave the website, and manually re-enter codes in external bank apps.",
      newSolution: "Direct, integrated checkout. Pay instantly via LankaPay or LankaQR, or print an official bank voucher slip with scannable barcodes for over-the-counter payments."
    },
    {
      category: "5. Receipts & Verification",
      oldProblem: "No immediate feedback or digital proof. Payments take days to reflect in RAMIS ledgers, leaving taxpayers uncertain whether they are compliant.",
      newSolution: "Instant electronic tax payment certificate with digital verification QR code, transaction reference, and downloadable confirmation."
    },
    {
      category: "6. Accessibility & Language",
      oldProblem: "Dense desktop-only table layouts from 2008 with tiny fonts and non-responsive English-heavy technical jargon.",
      newSolution: "Clean, responsive, mobile-first design with trilingual support (English, Sinhala, Tamil) adhering to modern accessibility guidelines."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#1e2a44] text-white px-6 py-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-pastel-sand/20 text-amber-200 border border-amber-300/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                Design Architecture
              </span>
              <span className="text-xs text-slate-300">• Usability Comparison</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-1.5">
              Legacy Portal vs. Citizen Portal 2.0
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Executive Diagnostic Note */}
          <div className="bg-pastel-blue border border-pastel-blueBorder rounded-xl p-4.5 flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-pastel-blueText flex items-center justify-center shrink-0 mt-0.5">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-700 leading-relaxed">
              <p className="font-semibold text-sm text-slate-900">Design Philosophy</p>
              <p className="mt-1 font-normal text-slate-600">
                Government portals fail when internal database tables and backend terminology dictate the citizen's interface. Our redesign focuses on three simple principles: translate technical tax codes into plain-language choices, compute liabilities transparently in-situ, and offer closed-loop payment verification.
              </p>
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="space-y-4">
            {comparisons.map((item, idx) => (
              <div key={idx} className="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider mb-2.5">
                  {item.category}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  {/* Before */}
                  <div className="bg-pastel-rose/80 border border-pastel-roseBorder/80 rounded-lg p-3.5 space-y-1">
                    <div className="flex items-center space-x-1.5 text-pastel-roseText font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Legacy System (RAMIS)</span>
                    </div>
                    <p className="text-slate-700 font-normal leading-relaxed">{item.oldProblem}</p>
                  </div>

                  {/* After */}
                  <div className="bg-pastel-mint/80 border border-pastel-mintBorder/80 rounded-lg p-3.5 space-y-1">
                    <div className="flex items-center space-x-1.5 text-pastel-mintText font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Citizen Redesign (2.0)</span>
                    </div>
                    <p className="text-slate-700 font-normal leading-relaxed">{item.newSolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center shrink-0">
          <p className="text-xs text-slate-500 font-normal hidden sm:block">
            Inland Revenue Department • User Experience Case Study
          </p>
          <div className="flex items-center space-x-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onTryNewFlow();
              }}
              className="px-4.5 py-2 bg-[#1e2a44] text-white hover:bg-[#28385a] rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition"
            >
              <span>Test Payment Workflow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
