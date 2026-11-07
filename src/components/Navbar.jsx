import React from 'react';
import { 
  Building2, 
  FileText, 
  UserCheck, 
  Layers, 
  CreditCard,
  ChevronDown
} from 'lucide-react';

export default function Navbar({ 
  currentUser, 
  setCurrentUser, 
  users, 
  activeTab, 
  setActiveTab,
  onOpenCaseStudy,
  onOpenComparison,
  onOpenDinModal
}) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center py-3.5 sm:py-4 gap-4 min-h-[76px]">
          {/* Logo & Department Branding */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer shrink-0" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-[#1e2a44] text-white flex items-center justify-center shadow-xs border border-slate-700">
              <Building2 className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">IRD e-Services</span>
                <span className="bg-pastel-mint text-pastel-mintText text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-pastel-mintBorder">
                  Citizen Portal 2.0
                </span>
              </div>
              <p className="text-xs text-slate-500 font-normal">Inland Revenue Department of Sri Lanka</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'dashboard'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('pay')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
                activeTab === 'pay'
                  ? 'bg-pastel-sand border border-pastel-sandBorder text-slate-900 font-bold shadow-2xs'
                  : 'text-slate-700 bg-pastel-sand/50 hover:bg-pastel-sand border border-pastel-sandBorder/70'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-amber-800" />
              <span>Pay Taxes</span>
            </button>

            <button
              onClick={onOpenDinModal}
              className="px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
            >
              DIN Voucher Slip
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                activeTab === 'history'
                  ? 'bg-slate-100 text-slate-900 font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Payment History
            </button>
          </nav>

          {/* Action Buttons & Taxpayer Profile */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            {/* Old vs New Comparison Button */}
            <button
              onClick={onOpenComparison}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200 transition"
            >
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Old vs New Flow</span>
              <span className="sm:hidden">Comparison</span>
            </button>

            {/* Case Study Submission Button */}
            <button
              onClick={onOpenCaseStudy}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#1e2a44] text-white hover:bg-[#28385a] transition shadow-2xs"
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden md:inline">Case Study & Submission</span>
              <span className="md:hidden">Case Study</span>
            </button>

            {/* Profile Selector */}
            <div className="relative group">
              <div className="flex items-center space-x-2.5 pl-2.5 border-l border-slate-200 cursor-pointer py-1">
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs border border-slate-300 shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left max-w-[150px] sm:max-w-[180px]">
                  <p className="text-xs font-semibold text-slate-900 leading-tight truncate">
                    {currentUser.name}
                  </p>
                  <p className="text-[11px] text-slate-500 font-mono leading-tight mt-0.5">
                    TIN: {currentUser.tin.slice(0, 9)}...
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0" />
              </div>

              {/* Persona Switcher Dropdown */}
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-2 hidden group-hover:block z-50">
                <div className="px-3.5 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Taxpayer Profile
                </div>
                {users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => setCurrentUser(u)}
                    className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-slate-50 transition ${
                      currentUser.id === u.id ? 'bg-pastel-blue/60 font-semibold text-slate-900' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{u.name}</p>
                      <p className="text-[11px] text-slate-500 font-normal mt-0.5">{u.occupation}</p>
                    </div>
                    {currentUser.id === u.id && <UserCheck className="w-4 h-4 text-blue-700 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
