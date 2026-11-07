import React, { useState } from 'react';
import { Search, Receipt, Calendar, ArrowLeft } from 'lucide-react';

export default function PaymentHistoryView({ payments, onViewReceipt, onBackToDashboard }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');

  const filteredPayments = payments.filter((p) => {
    const matchesSearch = 
      p.din.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === 'all' || p.taxYear === yearFilter;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center space-x-1.5 mb-2.5 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Payment Records & Vouchers</h2>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Official record of tax payments acknowledged in the RAMIS system
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search DIN or Ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-blue-500 w-44 sm:w-56"
            />
          </div>

          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:outline-blue-500"
          >
            <option value="all">All Tax Years</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2023/2024">2023/2024</option>
          </select>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="p-4">DIN / Voucher Ref</th>
                <th className="p-4">Tax Type & Period</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4 text-right">Amount (LKR)</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition">
                    <td className="p-4 font-mono font-medium text-slate-900">
                      <div>{p.din}</div>
                      <span className="text-[10px] text-slate-400 font-normal">Ref: {p.reference}</span>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-800">{p.taxType}</p>
                      <p className="text-[11px] text-slate-500 font-normal">{p.period}</p>
                    </td>
                    <td className="p-4 text-slate-600 font-normal">
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.date}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-600 font-normal">{p.method}</td>
                    <td className="p-4 text-right font-mono font-bold text-slate-900 text-sm">
                      {p.amount.toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-pastel-mint text-pastel-mintText border border-pastel-mintBorder text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => onViewReceipt(p)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-medium transition inline-flex items-center space-x-1 shadow-2xs"
                      >
                        <Receipt className="w-3.5 h-3.5 text-slate-500" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400 font-normal">
                    No transactions match your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
