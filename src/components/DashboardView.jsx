import React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  CreditCard, 
  Receipt, 
  FileCheck2, 
  HelpCircle, 
  Download, 
  Clock, 
  CheckCircle2,
  TrendingDown,
  Building2,
  ChevronRight
} from 'lucide-react';
import { TRANSLATIONS } from '../mockData';

export default function DashboardView({ 
  currentUser, 
  payments, 
  onStartPayment, 
  onOpenDinModal, 
  onViewReceipt,
  onOpenOldVsNew,
  currentLang 
}) {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Taxpayer Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentUser.name}
              </h1>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pastel-mint border border-pastel-mintBorder text-pastel-mintText">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.statusCompliant}</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1 font-normal">
              {currentUser.occupation} • Registered with {currentUser.registeredOffice}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono">
              <span className="text-slate-400 font-sans text-xs">TIN: </span>
              <span className="font-semibold text-slate-800">{currentUser.tin}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 font-mono">
              <span className="text-slate-400 font-sans text-xs">NIC: </span>
              <span className="font-semibold text-slate-800">{currentUser.nic}</span>
            </div>
          </div>
        </div>

        {/* 4 Pastel Financial & Compliance Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {/* Card 1 - Pastel Sand */}
          <div className="bg-pastel-sand border border-pastel-sandBorder/80 rounded-xl p-4.5 transition hover:shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-pastel-sandText tracking-wide">Upcoming Due</p>
                <p className="text-2xl font-bold text-slate-900 mt-1.5 font-mono">
                  LKR {currentUser.currentDue.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-amber-100/90 text-amber-800 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2.5 flex items-center space-x-1 font-normal">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>Q3 installment due <strong>15 Jan 2025</strong></span>
            </p>
          </div>

          {/* Card 2 - Pastel Mint */}
          <div className="bg-pastel-mint border border-pastel-mintBorder/80 rounded-xl p-4.5 transition hover:shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-pastel-mintText tracking-wide">Employer APIT Paid</p>
                <p className="text-2xl font-bold text-slate-900 mt-1.5 font-mono">
                  LKR {currentUser.apitDeducted.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-emerald-100/90 text-emerald-800 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2.5 font-normal">
              Deducted at source by employer
            </p>
          </div>

          {/* Card 3 - Pastel Blue */}
          <div className="bg-pastel-blue border border-pastel-blueBorder/80 rounded-xl p-4.5 transition hover:shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-pastel-blueText tracking-wide">Estimated Annual Tax</p>
                <p className="text-2xl font-bold text-slate-900 mt-1.5 font-mono">
                  LKR {currentUser.annualEstimatedTax.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-blue-100/90 text-blue-800 flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2.5 font-normal">
              Year of Assessment 2024/2025
            </p>
          </div>

          {/* Card 4 - Pastel Lavender */}
          <div className="bg-pastel-lavender border border-pastel-lavenderBorder/80 rounded-xl p-4.5 transition hover:shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-pastel-lavenderText tracking-wide">Relief Allowance</p>
                <p className="text-2xl font-bold text-slate-900 mt-1.5 font-mono">
                  LKR 1,200,000
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-purple-100/90 text-purple-800 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2.5 font-normal">
              Standard 0% tax-free threshold
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Primary Action & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Action Banner */}
          <div className="bg-[#1e2a44] text-white rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
            <div className="relative z-10 max-w-xl">
              <span className="inline-block bg-pastel-sand/20 text-amber-200 border border-amber-300/30 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                Personal Income Tax (PIT)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-2.5 leading-snug">
                Pay Personal Income Tax Online
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                Calculate your tax with current Sri Lanka tax slabs, automatically generate your payment voucher (DIN), and pay through LankaPay, LankaQR, or a printable bank deposit slip.
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={onStartPayment}
                  className="px-5 py-2.5 bg-pastel-sand border border-pastel-sandBorder text-slate-900 hover:bg-amber-100 rounded-xl text-xs font-bold flex items-center space-x-2 transition shadow-xs"
                >
                  <CreditCard className="w-4 h-4 text-amber-800" />
                  <span>Pay Personal Income Tax</span>
                  <ArrowRight className="w-4 h-4 ml-0.5 text-amber-800" />
                </button>

                <button
                  onClick={onOpenDinModal}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-slate-200 rounded-xl text-xs font-medium border border-white/15 transition flex items-center space-x-1.5"
                >
                  <Receipt className="w-3.5 h-3.5" />
                  <span>Generate DIN Voucher</span>
                </button>
              </div>
            </div>
          </div>

          {/* Recent Payment History Table */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">Recent Payments & Vouchers</h3>
                <p className="text-xs text-slate-500 font-normal">Official tax payments credited to RAMIS system</p>
              </div>
              <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                {payments.length} Records
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {payments.map((p) => (
                <div key={p.id} className="p-4 sm:p-5 hover:bg-slate-50/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900 text-sm">{p.taxType}</span>
                      <span className="bg-pastel-mint text-pastel-mintText text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-pastel-mintBorder">
                        {p.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-2.5 text-xs text-slate-500 font-normal">
                      <span>{p.period}</span>
                      <span>•</span>
                      <span className="font-mono text-slate-700 font-medium">{p.din}</span>
                      <span>•</span>
                      <span>{p.date}</span>
                    </div>
                    <p className="text-xs text-slate-400 font-normal">Method: {p.method} (Ref: {p.reference})</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-4">
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-slate-400 font-normal">Amount Paid</p>
                      <p className="font-bold text-slate-900 font-mono text-sm">
                        LKR {p.amount.toLocaleString()}
                      </p>
                    </div>

                    <button
                      onClick={() => onViewReceipt(p)}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition flex items-center space-x-1"
                    >
                      <Receipt className="w-3.5 h-3.5 text-slate-500" />
                      <span>Receipt</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Guidance & Helpful Tools */}
        <div className="space-y-6">
          {/* Statutory Tax Deadlines */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center space-x-2 pb-3.5 border-b border-slate-100">
              <Calendar className="w-4 h-4 text-slate-600" />
              <h4 className="font-bold text-sm text-slate-900">Key Tax Deadlines (PIT)</h4>
            </div>
            <ul className="mt-3.5 space-y-2.5 text-xs">
              <li className="flex items-start justify-between p-3 rounded-xl bg-pastel-sand border border-pastel-sandBorder/70">
                <div>
                  <p className="font-semibold text-slate-900">Q3 Installment</p>
                  <p className="text-slate-600 text-[11px] font-normal">Period Code: 24030</p>
                </div>
                <span className="font-semibold text-amber-900 bg-white/80 px-2 py-0.5 rounded-md border border-amber-200 text-xs">
                  15 Jan 2025
                </span>
              </li>
              <li className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">Q4 Installment</p>
                  <p className="text-slate-500 text-[11px] font-normal">Period Code: 24040</p>
                </div>
                <span className="font-medium text-slate-600">15 Apr 2025</span>
              </li>
              <li className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="font-semibold text-slate-800">Annual Return Filing</p>
                  <p className="text-slate-500 text-[11px] font-normal">Final Statement of Income</p>
                </div>
                <span className="font-medium text-slate-600">30 Nov 2025</span>
              </li>
            </ul>
          </div>

          {/* Direct Citizen Tools */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-slate-900">Quick Citizen Tools</h4>
            
            <button 
              onClick={onOpenDinModal}
              className="w-full text-left p-3.5 rounded-xl border border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/80 transition flex items-center justify-between group"
            >
              <div>
                <p className="font-semibold text-xs text-slate-900 group-hover:text-blue-900">Generate Payment Voucher (DIN)</p>
                <p className="text-xs text-slate-500 font-normal mt-0.5">Prepare slip for BOC or People's Bank</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-0.5 transition" />
            </button>

            <div className="p-3.5 rounded-xl bg-pastel-blue border border-pastel-blueBorder/70">
              <div className="flex items-center space-x-2 text-xs font-semibold text-pastel-blueText">
                <HelpCircle className="w-4 h-4" />
                <span>Need Assistance?</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-normal">
                Call the IRD Helpline at <strong className="text-slate-900">1944</strong> or contact your assigned regional office at <strong className="text-slate-900">{currentUser.registeredOffice}</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
