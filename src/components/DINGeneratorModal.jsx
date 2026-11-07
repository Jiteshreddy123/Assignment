import React, { useState } from 'react';
import { X, Copy, Printer, Check, Receipt } from 'lucide-react';
import { TAX_PERIODS } from '../mockData';

export default function DINGeneratorModal({ currentUser, onClose }) {
  const [selectedPeriod, setSelectedPeriod] = useState(TAX_PERIODS[0]);
  const [amount, setAmount] = useState(currentUser.currentDue || 50000);
  const [taxType, setTaxType] = useState('05'); // 05 = PIT
  const [copied, setCopied] = useState(false);

  const generatedDin = `DIN-2024-${taxType}-${currentUser.tin.slice(0, 8)}-${selectedPeriod.periodCode.slice(-2)}88`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedDin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#1e2a44] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Receipt className="w-4 h-4 text-amber-200" />
            <h3 className="font-bold text-sm">Payment Voucher (DIN) Generator</h3>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs">
          <p className="text-slate-600 font-normal leading-relaxed">
            Generate an official <strong>Document Identification Number (DIN)</strong> for branch deposit slips at Bank of Ceylon, People's Bank, or direct bill pay references.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block font-medium text-slate-700">Taxpayer</label>
              <input
                type="text"
                disabled
                value={`${currentUser.name} (${currentUser.tin})`}
                className="w-full mt-1 px-3 py-2 text-xs font-mono bg-slate-100 rounded-lg border border-slate-200 text-slate-700"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700">Tax Type</label>
              <select
                value={taxType}
                onChange={(e) => setTaxType(e.target.value)}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-blue-500 font-medium bg-white"
              >
                <option value="05">05 - Personal Income Tax (PIT)</option>
                <option value="03">03 - Corporate Income Tax (CIT)</option>
                <option value="14">14 - Value Added Tax (VAT)</option>
                <option value="15">15 - Social Security Contribution Levy (SSCL)</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700">Tax Period</label>
              <select
                value={selectedPeriod.id}
                onChange={(e) => {
                  const p = TAX_PERIODS.find((item) => item.id === e.target.value);
                  if (p) setSelectedPeriod(p);
                }}
                className="w-full mt-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-blue-500 bg-white"
              >
                {TAX_PERIODS.map((period) => (
                  <option key={period.id} value={period.id}>
                    {period.year} - {period.quarter} (Period: {period.periodCode})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700">Voucher Amount (LKR)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="w-full mt-1 px-3 py-2 text-xs font-mono font-medium rounded-lg border border-slate-300 focus:outline-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Generated Result Callout */}
          <div className="bg-pastel-sand border border-pastel-sandBorder rounded-xl p-4 space-y-2 mt-4">
            <span className="text-[10px] font-semibold text-amber-900 uppercase tracking-wider">
              Generated Voucher Reference (DIN)
            </span>
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-bold font-mono text-slate-900 tracking-wider">
                {generatedDin}
              </span>
              <button
                onClick={handleCopy}
                className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-lg text-xs font-medium transition flex items-center space-x-1 shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-600 font-normal">
              Provide this DIN to the bank teller or quote as reference in your online bank transfer.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center space-x-1.5 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Slip</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1e2a44] text-white hover:bg-[#28385a] rounded-xl text-xs font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
