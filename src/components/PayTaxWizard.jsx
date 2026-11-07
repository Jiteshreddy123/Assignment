import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  Info, 
  CreditCard, 
  Building, 
  QrCode, 
  Printer, 
  Copy, 
  Calculator, 
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { TAX_PERIODS, calculatePIT, ANNUAL_RELIEF_ALLOWANCE } from '../mockData';

export default function PayTaxWizard({ currentUser, onCompletePayment, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1: Selected Period
  const [selectedPeriod, setSelectedPeriod] = useState(TAX_PERIODS[0]);

  // Step 2: Calculator State
  const [calcMode, setCalcMode] = useState('calculate'); // 'calculate' or 'direct'
  const [monthlyIncome, setMonthlyIncome] = useState(350000); // 350,000 LKR / month
  const [freelanceIncome, setFreelanceIncome] = useState(50000);
  const [employerApitMonthly, setEmployerApitMonthly] = useState(28000);
  const [customPayAmount, setCustomPayAmount] = useState(45000);

  // Derived annual values for calculation
  const annualGross = (monthlyIncome + freelanceIncome) * 12;
  const annualApit = employerApitMonthly * 12;
  const pitResult = calculatePIT(annualGross, annualApit);

  // Quarterly installment is roughly annual net payable divided by 4
  const quarterlyEstimatedPayable = Math.max(1000, Math.round(pitResult.netPayable / 4));
  const payableAmount = calcMode === 'calculate' ? quarterlyEstimatedPayable : customPayAmount;

  // Step 3: Generated DIN and Payment Channel
  const [generatedDin, setGeneratedDin] = useState('');
  const [paymentChannel, setPaymentChannel] = useState('lankapay'); // 'lankapay', 'qr', 'bank-slip', 'online-banking'
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('•••');

  // Generate DIN automatically when reaching step 3
  const handleProceedToPayment = () => {
    if (!generatedDin) {
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      const newDin = `DIN-2024-05-${currentUser.tin.slice(0, 8)}-${selectedPeriod.periodCode.slice(-2)}${randomSeq.toString().slice(0, 2)}`;
      setGeneratedDin(newDin);
    }
    setCurrentStep(3);
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFinalizePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newPayment = {
        id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
        din: generatedDin,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        taxYear: selectedPeriod.year,
        period: `${selectedPeriod.quarter} (Period Code: ${selectedPeriod.periodCode})`,
        periodCode: selectedPeriod.periodCode,
        taxType: "05 - Personal Income Tax (PIT)",
        paymentType: "01 - Self-Assessment",
        amount: payableAmount,
        method: paymentChannel === 'lankapay' ? 'LankaPay OTPP (Direct Gateway)' : paymentChannel === 'qr' ? 'LankaQR Instant Mobile Pay' : 'Commercial Bank Internet Transfer',
        reference: `LP-SL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        status: "Acknowledged & Cleared",
        receiptUrl: "#"
      };
      onCompletePayment(newPayment);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Wizard Header with Progress Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-700 bg-pastel-blue px-2.5 py-0.5 rounded-full border border-pastel-blueBorder">
                Personal Income Tax
              </span>
              <span className="text-xs text-slate-400 font-normal">• Period {selectedPeriod.periodCode}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Pay Personal Income Tax
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Taxpayer: <strong className="text-slate-800 font-medium">{currentUser.name}</strong> • TIN: <strong className="font-mono text-slate-800 font-medium">{currentUser.tin}</strong>
            </p>
          </div>

          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
          >
            Cancel & Return
          </button>
        </div>

        {/* 3 Step Indicator */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6">
          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition ${
              currentStep === 1 ? 'bg-[#1e2a44] text-white shadow-xs' : currentStep > 1 ? 'bg-pastel-mint border border-pastel-mintBorder text-pastel-mintText' : 'bg-slate-100 text-slate-400'
            }`}>
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-900">Tax Period</p>
              <p className="text-[11px] text-slate-400 font-normal">Quarter & Year</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition ${
              currentStep === 2 ? 'bg-[#1e2a44] text-white shadow-xs' : currentStep > 2 ? 'bg-pastel-mint border border-pastel-mintBorder text-pastel-mintText' : 'bg-slate-100 text-slate-400'
            }`}>
              {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-900">Calculate Amount</p>
              <p className="text-[11px] text-slate-400 font-normal">Relief & Brackets</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition ${
              currentStep === 3 ? 'bg-[#1e2a44] text-white shadow-xs' : 'bg-slate-100 text-slate-400'
            }`}>
              3
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-900">DIN & Payment</p>
              <p className="text-[11px] text-slate-400 font-normal">Direct / Slip</p>
            </div>
          </div>
        </div>
      </div>

      {/* STEP 1: Select Assessment Period */}
      {currentStep === 1 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Step 1: Select Assessment Period</h3>
              <p className="text-xs text-slate-500 font-normal mt-1">
                Personal income tax is paid quarterly as advance installments, followed by an annual balancing return.
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              PIT Code: 05
            </span>
          </div>

          {/* Period Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {TAX_PERIODS.map((period) => {
              const isSelected = selectedPeriod.id === period.id;
              return (
                <div
                  key={period.id}
                  onClick={() => setSelectedPeriod(period)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition relative flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-pastel-blue/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  {period.isRecommended && (
                    <span className="absolute -top-2.5 right-4 bg-pastel-sand border border-pastel-sandBorder text-pastel-sandText text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-2xs">
                      CURRENT DUE
                    </span>
                  )}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">{period.year}</span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                        period.status === 'Due Now' ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {period.status}
                      </span>
                    </div>
                    <p className="font-bold text-slate-900 text-sm sm:text-base mt-1.5">{period.quarter}</p>
                    <p className="text-xs text-slate-500 mt-1 font-normal">Due Date: <strong>{period.dueDate}</strong></p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">Period Code: <strong className="text-slate-800">{period.periodCode}</strong></span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Educational Callout */}
          <div className="p-4 rounded-xl bg-pastel-blue/60 border border-pastel-blueBorder flex items-start space-x-3 text-xs text-slate-700">
            <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-900">Automatic Period Mapping</p>
              <p className="mt-0.5 text-slate-600 font-normal">
                You do not need to look up five-digit period numbers (such as 24030). Simply select your quarter, and the IRD ledger codes are mapped automatically.
              </p>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2.5 bg-[#1e2a44] text-white hover:bg-[#28385a] rounded-xl text-xs font-semibold flex items-center space-x-2 transition shadow-xs"
            >
              <span>Continue to Step 2 (Amount)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Calculate or Enter Amount */}
      {currentStep === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Step 2: Determine Your Tax Payment Amount</h3>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Period: <strong className="text-slate-800">{selectedPeriod.quarter} ({selectedPeriod.year})</strong>
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setCalcMode('calculate')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  calcMode === 'calculate' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Tax Estimator
              </button>
              <button
                onClick={() => setCalcMode('direct')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  calcMode === 'direct' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Direct Amount
              </button>
            </div>
          </div>

          {calcMode === 'calculate' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column: Interactive Inputs */}
              <div className="space-y-4">
                <div className="bg-slate-50/80 p-4.5 rounded-xl border border-slate-200 space-y-3.5">
                  <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                    <Calculator className="w-4 h-4 text-slate-600" />
                    <span>Monthly Income & Deductions</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Primary Monthly Salary / Employment (LKR)
                    </label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-semibold text-slate-400">Rs.</span>
                      <input
                        type="number"
                        value={monthlyIncome}
                        onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                        className="w-full pl-9 pr-3 py-2 text-sm font-mono font-medium rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700">
                      Consulting / Other Monthly Income (LKR)
                    </label>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-semibold text-slate-400">Rs.</span>
                      <input
                        type="number"
                        value={freelanceIncome}
                        onChange={(e) => setFreelanceIncome(Number(e.target.value) || 0)}
                        className="w-full pl-9 pr-3 py-2 text-sm font-mono font-medium rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200">
                    <label className="block text-xs font-medium text-slate-700">
                      Employer APIT Deducted Monthly
                    </label>
                    <p className="text-[11px] text-slate-400 font-normal">Advance Personal Income Tax shown on payslip</p>
                    <div className="relative mt-1">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-semibold text-slate-400">Rs.</span>
                      <input
                        type="number"
                        value={employerApitMonthly}
                        onChange={(e) => setEmployerApitMonthly(Number(e.target.value) || 0)}
                        className="w-full pl-9 pr-3 py-2 text-sm font-mono font-medium rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Statutory Relief Badge */}
                <div className="p-3.5 bg-pastel-mint border border-pastel-mintBorder rounded-xl flex items-start space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-pastel-mintText shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">Statutory Tax Relief Applied</p>
                    <p className="mt-0.5 text-slate-600 font-normal">
                      The first <strong>LKR 1,200,000 / year</strong> (Rs. 100,000 / month) is 100% tax-free under the Inland Revenue Act.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Tax Breakdown Card */}
              <div className="bg-[#1e2a44] text-white rounded-xl p-5 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">Tax Computation</span>
                    <span className="text-[11px] font-mono text-amber-200 bg-white/10 px-2 py-0.5 rounded border border-white/10">
                      Act No. 24 of 2017
                    </span>
                  </div>

                  <div className="mt-3.5 space-y-2 text-xs">
                    <div className="flex justify-between font-normal">
                      <span className="text-slate-300">Annual Gross Income:</span>
                      <span className="font-mono font-medium">LKR {annualGross.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-300 font-normal">
                      <span>Less Tax-Free Relief:</span>
                      <span className="font-mono font-medium">- LKR {ANNUAL_RELIEF_ALLOWANCE.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-semibold border-t border-slate-700 pt-1.5">
                      <span className="text-slate-200">Taxable Income:</span>
                      <span className="font-mono text-amber-200">LKR {pitResult.taxableIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-normal">
                      <span className="text-slate-300">Annual Tax Liability:</span>
                      <span className="font-mono font-medium">LKR {pitResult.totalTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-blue-300 font-normal">
                      <span>Less Employer APIT Paid:</span>
                      <span className="font-mono font-medium">- LKR {annualApit.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Slab Preview */}
                  <div className="mt-4 pt-3 border-t border-slate-700">
                    <p className="text-[11px] font-medium text-slate-300 mb-1.5">Applicable Tax Brackets:</p>
                    <div className="space-y-1">
                      {pitResult.breakdown.map((b, idx) => (
                        <div key={idx} className="flex justify-between text-[11px] text-slate-200 bg-white/5 px-2 py-1 rounded">
                          <span>{b.label}</span>
                          <span className="font-mono text-amber-200">Rs. {b.tax.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quarterly Due */}
                <div className="mt-5 pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-300 font-normal">Quarterly Installment for {selectedPeriod.quarter}:</p>
                  <div className="flex items-baseline justify-between mt-1">
                    <p className="text-2xl font-bold text-amber-200 font-mono">
                      LKR {quarterlyEstimatedPayable.toLocaleString()}
                    </p>
                    <span className="text-[10px] text-slate-300">Quarterly Equal Installment</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Direct Amount Mode */
            <div className="p-6 bg-slate-50/80 rounded-xl border border-slate-200 max-w-lg mx-auto space-y-4 text-center">
              <h4 className="font-bold text-slate-800 text-sm">Enter Custom Amount</h4>
              <p className="text-xs text-slate-500 font-normal">
                If your tax advisor has provided your exact liability, enter the amount to generate your payment slip.
              </p>
              <div className="relative mt-2">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center font-semibold text-slate-400">Rs.</span>
                <input
                  type="number"
                  value={customPayAmount}
                  onChange={(e) => setCustomPayAmount(Number(e.target.value) || 0)}
                  className="w-full pl-12 pr-4 py-3 text-2xl font-mono font-bold text-center rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                />
              </div>
            </div>
          )}

          {/* Stepper Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Step 1</span>
            </button>
            <button
              onClick={handleProceedToPayment}
              className="px-5 py-2.5 bg-[#1e2a44] text-white hover:bg-[#28385a] rounded-xl text-xs font-semibold flex items-center space-x-2 transition shadow-xs"
            >
              <span>Generate DIN & Proceed (LKR {payableAmount.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DIN Generation & Payment */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          {/* DIN Card */}
          <div className="bg-pastel-sand border border-pastel-sandBorder rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="bg-amber-100 border border-amber-300 text-amber-900 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  Document Identification Number (DIN)
                </span>
                <p className="text-xl sm:text-2xl font-bold font-mono text-slate-900 mt-1.5 tracking-wider">
                  {generatedDin}
                </p>
                <p className="text-xs text-slate-600 mt-1 font-normal">
                  Allocates payment to the RAMIS ledger for <strong>Period {selectedPeriod.periodCode}</strong>.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(generatedDin, 'din')}
                  className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold border border-slate-300 shadow-2xs transition flex items-center space-x-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-slate-600" />
                  <span>{copiedField === 'din' ? 'Copied' : 'Copy DIN'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-3">Select Payment Method</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Option 1: LankaPay Gateway */}
              <button
                type="button"
                onClick={() => setPaymentChannel('lankapay')}
                className={`p-3.5 rounded-xl border-2 text-left transition flex flex-col justify-between ${
                  paymentChannel === 'lankapay'
                    ? 'border-blue-600 bg-pastel-blue/60 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <CreditCard className={`w-5 h-5 ${paymentChannel === 'lankapay' ? 'text-blue-700' : 'text-slate-400'}`} />
                <div className="mt-3">
                  <p className="font-bold text-xs text-slate-900">LankaPay Gateway</p>
                  <p className="text-[11px] text-slate-500 font-normal">Card Checkout</p>
                </div>
              </button>

              {/* Option 2: LankaQR */}
              <button
                type="button"
                onClick={() => setPaymentChannel('qr')}
                className={`p-3.5 rounded-xl border-2 text-left transition flex flex-col justify-between ${
                  paymentChannel === 'qr'
                    ? 'border-blue-600 bg-pastel-blue/60 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <QrCode className={`w-5 h-5 ${paymentChannel === 'qr' ? 'text-blue-700' : 'text-slate-400'}`} />
                <div className="mt-3">
                  <p className="font-bold text-xs text-slate-900">LankaQR</p>
                  <p className="text-[11px] text-slate-500 font-normal">Any Bank App</p>
                </div>
              </button>

              {/* Option 3: Official Bank Deposit Slip */}
              <button
                type="button"
                onClick={() => setPaymentChannel('bank-slip')}
                className={`p-3.5 rounded-xl border-2 text-left transition flex flex-col justify-between ${
                  paymentChannel === 'bank-slip'
                    ? 'border-blue-600 bg-pastel-blue/60 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Printer className={`w-5 h-5 ${paymentChannel === 'bank-slip' ? 'text-blue-700' : 'text-slate-400'}`} />
                <div className="mt-3">
                  <p className="font-bold text-xs text-slate-900">Bank Deposit Slip</p>
                  <p className="text-[11px] text-slate-500 font-normal">BOC / People's Bank</p>
                </div>
              </button>

              {/* Option 4: Internet Banking Guide */}
              <button
                type="button"
                onClick={() => setPaymentChannel('online-banking')}
                className={`p-3.5 rounded-xl border-2 text-left transition flex flex-col justify-between ${
                  paymentChannel === 'online-banking'
                    ? 'border-blue-600 bg-pastel-blue/60 shadow-2xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <Building className={`w-5 h-5 ${paymentChannel === 'online-banking' ? 'text-blue-700' : 'text-slate-400'}`} />
                <div className="mt-3">
                  <p className="font-bold text-xs text-slate-900">Internet Banking</p>
                  <p className="text-[11px] text-slate-500 font-normal">Commercial, Sampath, etc.</p>
                </div>
              </button>
            </div>
          </div>

          {/* Channel Content Body */}
          <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200">
            {paymentChannel === 'lankapay' && (
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-semibold text-slate-800">LankaPay Secure 256-bit Checkout</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900">Rs. {payableAmount.toLocaleString()}</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-blue-500 bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-blue-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700">CVV</label>
                    <input
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full mt-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 focus:outline-blue-500 bg-white"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 text-center font-normal">
                  Your payment will be registered in the IRD RAMIS ledger under DIN <strong>{generatedDin}</strong>.
                </p>
              </div>
            )}

            {paymentChannel === 'qr' && (
              <div className="text-center max-w-sm mx-auto space-y-3">
                <p className="text-xs font-semibold text-slate-800">Scan with any LankaQR Banking App</p>
                <div className="w-40 h-40 mx-auto bg-white p-3 rounded-2xl border-2 border-slate-300 shadow-2xs flex items-center justify-center relative">
                  <div className="grid grid-cols-5 gap-1.5 w-full h-full p-2 bg-slate-900 rounded-lg">
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs col-span-2"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-amber-300 rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs col-span-2"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white text-slate-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs border border-slate-200">LankaQR</span>
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-900 font-mono">Amount: LKR {payableAmount.toLocaleString()}</p>
                <p className="text-[11px] text-slate-500 font-normal">
                  Supported by Commercial Bank Flash, Sampath WePay, BOC SmartPay, FriMi, Genie, etc.
                </p>
              </div>
            )}

            {paymentChannel === 'bank-slip' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">Bank of Ceylon / People's Bank Official Paying-in Slip</span>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-100 flex items-center space-x-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Slip</span>
                  </button>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-300 font-mono text-[11px] space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-bold text-slate-900">INLAND REVENUE DEPARTMENT - RAMIS VOUCHER</span>
                    <span className="text-slate-600 font-semibold">FORM PIT-05</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-700">
                    <div>Taxpayer Name: <strong>{currentUser.name}</strong></div>
                    <div>TIN: <strong>{currentUser.tin}</strong></div>
                    <div>DIN: <strong className="text-blue-900">{generatedDin}</strong></div>
                    <div>Tax Type: <strong>05 (Personal Income Tax)</strong></div>
                    <div>Period Code: <strong>{selectedPeriod.periodCode}</strong></div>
                    <div>Payment Type: <strong>01 (Self-Assessment)</strong></div>
                  </div>
                  <div className="pt-2 border-t flex justify-between font-bold text-slate-900 text-xs">
                    <span>PAYABLE AMOUNT:</span>
                    <span>LKR {payableAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {paymentChannel === 'online-banking' && (
              <div className="space-y-3 text-xs">
                <p className="font-semibold text-slate-800">
                  Pay through your Internet Banking Portal
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                    <div>
                      <p className="text-[10px] text-slate-400">1. Payee Name</p>
                      <p className="font-semibold text-slate-800">INLAND REVENUE DEPARTMENT</p>
                    </div>
                    <button
                      onClick={() => handleCopy('INLAND REVENUE DEPARTMENT', 'payee')}
                      className="px-2 py-1 rounded bg-slate-100 text-[10px] font-medium text-slate-700 hover:bg-slate-200"
                    >
                      {copiedField === 'payee' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                    <div>
                      <p className="text-[10px] text-slate-400">2. Taxpayer Identification Number (TIN)</p>
                      <p className="font-semibold font-mono text-slate-800">{currentUser.tin}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(currentUser.tin, 'tin')}
                      className="px-2 py-1 rounded bg-slate-100 text-[10px] font-medium text-slate-700 hover:bg-slate-200"
                    >
                      {copiedField === 'tin' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                    <div>
                      <p className="text-[10px] text-slate-400">3. Document Identification Number (DIN / Reference)</p>
                      <p className="font-semibold font-mono text-blue-900">{generatedDin}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(generatedDin, 'din-guide')}
                      className="px-2 py-1 rounded bg-slate-100 text-[10px] font-medium text-slate-700 hover:bg-slate-200"
                    >
                      {copiedField === 'din-guide' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
                    <div>
                      <p className="text-[10px] text-slate-400">4. Tax Period Code</p>
                      <p className="font-semibold font-mono text-slate-800">{selectedPeriod.periodCode}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedPeriod.periodCode, 'period')}
                      className="px-2 py-1 rounded bg-slate-100 text-[10px] font-medium text-slate-700 hover:bg-slate-200"
                    >
                      {copiedField === 'period' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Buttons */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Step 2</span>
            </button>
            <button
              onClick={handleFinalizePayment}
              disabled={isProcessing}
              className={`px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-xs transition ${
                isProcessing ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? (
                <span>Registering in RAMIS Network...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Pay LKR {payableAmount.toLocaleString()}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
