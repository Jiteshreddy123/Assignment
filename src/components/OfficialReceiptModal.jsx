import React from 'react';
import { X, CheckCircle2, Printer, ShieldCheck, QrCode } from 'lucide-react';

export default function OfficialReceiptModal({ payment, currentUser, onClose }) {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-xl border border-slate-200 overflow-hidden relative">
        {/* Top Header Bar */}
        <div className="bg-[#1e2a44] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-lg">🇱🇰</span>
            <div>
              <p className="font-bold text-sm tracking-tight">Inland Revenue Department of Sri Lanka</p>
              <p className="text-[11px] text-amber-200 font-normal">Official Electronic Payment Certificate</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Receipt Area */}
        <div id="printable-voucher" className="p-6 space-y-5">
          {/* Status Badge */}
          <div className="text-center pb-4 border-b border-slate-100">
            <div className="w-11 h-11 bg-pastel-mint text-pastel-mintText border border-pastel-mintBorder rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Payment Confirmed & Cleared</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">RAMIS Transaction Ref: {payment.reference}</p>
          </div>

          {/* Key Receipt Details */}
          <div className="bg-slate-50/80 rounded-xl p-4.5 border border-slate-200 text-xs space-y-2.5">
            <div className="flex justify-between">
              <span className="text-slate-500 font-normal">Taxpayer Name:</span>
              <span className="font-semibold text-slate-900">{currentUser.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-normal">TIN:</span>
              <span className="font-semibold font-mono text-slate-900">{currentUser.tin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-normal">Document Identification No (DIN):</span>
              <span className="font-bold font-mono text-blue-900">{payment.din}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-normal">Tax Type:</span>
              <span className="font-semibold text-slate-900">{payment.taxType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-normal">Assessment Period:</span>
              <span className="font-semibold text-slate-900">{payment.period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-normal">Payment Method:</span>
              <span className="font-semibold text-slate-900">{payment.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-normal">Date & Time:</span>
              <span className="font-semibold text-slate-900">{payment.date}</span>
            </div>
            <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-bold text-slate-900 text-xs">Total Amount Paid:</span>
              <span className="font-bold text-slate-900 text-lg font-mono">
                LKR {payment.amount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* QR Verification & Seal */}
          <div className="flex items-center justify-between p-3.5 bg-pastel-blue/60 rounded-xl border border-pastel-blueBorder">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-white p-1 rounded-lg border border-slate-300 flex items-center justify-center">
                <QrCode className="w-8 h-8 text-slate-800" />
              </div>
              <div className="text-[11px]">
                <p className="font-semibold text-slate-900 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 inline" />
                  <span>Digitally Verified by IRD Sri Lanka</span>
                </p>
                <p className="text-slate-500 font-normal mt-0.5">Scannable validation on ird.gov.lk</p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-semibold text-slate-700 bg-white/80 px-2 py-1 rounded border border-slate-200">
              RAMIS CLEARED
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center space-x-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1e2a44] text-white hover:bg-[#28385a] rounded-xl text-xs font-semibold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
