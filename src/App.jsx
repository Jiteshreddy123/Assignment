import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardView from './components/DashboardView';
import PayTaxWizard from './components/PayTaxWizard';
import PaymentHistoryView from './components/PaymentHistoryView';
import OfficialReceiptModal from './components/OfficialReceiptModal';
import DINGeneratorModal from './components/DINGeneratorModal';
import OldVsNewModal from './components/OldVsNewModal';
import CaseStudyModal from './components/CaseStudyModal';
import { MOCK_USERS, MOCK_PAYMENT_HISTORY, TRANSLATIONS } from './mockData';
import { PhoneCall } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [currentUser, setCurrentUser] = useState(MOCK_USERS[0]);
  const [payments, setPayments] = useState(MOCK_PAYMENT_HISTORY);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'pay', 'history'

  // Modals state
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);
  const [isOldVsNewOpen, setIsOldVsNewOpen] = useState(false);
  const [isDinModalOpen, setIsDinModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  const t = TRANSLATIONS[currentLang];

  // Callback when user finishes a payment in wizard
  const handleCompletePayment = (newPayment) => {
    setPayments([newPayment, ...payments]);
    // Deduct user due
    setCurrentUser((prev) => ({
      ...prev,
      currentDue: Math.max(0, prev.currentDue - newPayment.amount),
      status: 'Compliant'
    }));
    setActiveTab('dashboard');
    setActiveReceipt(newPayment);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] font-sans text-slate-800">
      {/* Navbar */}
      <Navbar
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        users={MOCK_USERS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        onOpenComparison={() => setIsOldVsNewOpen(true)}
        onOpenDinModal={() => setIsDinModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'dashboard' && (
          <DashboardView
            currentUser={currentUser}
            payments={payments}
            onStartPayment={() => setActiveTab('pay')}
            onOpenDinModal={() => setIsDinModalOpen(true)}
            onViewReceipt={(payment) => setActiveReceipt(payment)}
            onOpenOldVsNew={() => setIsOldVsNewOpen(true)}
            currentLang={currentLang}
          />
        )}

        {activeTab === 'pay' && (
          <PayTaxWizard
            currentUser={currentUser}
            onCompletePayment={handleCompletePayment}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'history' && (
          <PaymentHistoryView
            payments={payments}
            onViewReceipt={(payment) => setActiveReceipt(payment)}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* Clean Civic Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 text-xs text-slate-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <span className="text-xl">🇱🇰</span>
            <div>
              <p className="font-semibold text-slate-900 text-xs">
                Inland Revenue Department of Sri Lanka (IRD)
              </p>
              <p className="text-[11px] text-slate-400 font-normal">
                Sir Chittampalam A. Gardiner Mawatha, Colombo 02, Sri Lanka.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <button
              onClick={() => setIsOldVsNewOpen(true)}
              className="hover:text-slate-900 transition"
            >
              Usability Comparison
            </button>
            <span>•</span>
            <button
              onClick={() => setIsCaseStudyOpen(true)}
              className="text-slate-800 hover:text-blue-900 font-semibold"
            >
              Case Study & Proposal
            </button>
            <span>•</span>
            <span className="flex items-center space-x-1.5 text-slate-600 font-normal">
              <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
              <span>Call Center: 1944</span>
            </span>
          </div>

          <div className="text-center md:text-right text-[11px] text-slate-400 font-normal">
            LankaPay OTPP Network & RAMIS System Integration.
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isCaseStudyOpen && (
        <CaseStudyModal onClose={() => setIsCaseStudyOpen(false)} />
      )}

      {isOldVsNewOpen && (
        <OldVsNewModal
          onClose={() => setIsOldVsNewOpen(false)}
          onTryNewFlow={() => {
            setIsOldVsNewOpen(false);
            setActiveTab('pay');
          }}
        />
      )}

      {isDinModalOpen && (
        <DINGeneratorModal
          currentUser={currentUser}
          onClose={() => setIsDinModalOpen(false)}
        />
      )}

      {activeReceipt && (
        <OfficialReceiptModal
          payment={activeReceipt}
          currentUser={currentUser}
          onClose={() => setActiveReceipt(null)}
        />
      )}
    </div>
  );
}
