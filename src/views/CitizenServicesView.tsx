import React from 'react';
import { useApp } from '../context/AppContext';
import { RATION_ENTITLEMENTS } from '../mockData';

export const CitizenServicesView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 pb-28 font-sans">
      <main className="pt-6 px-5 max-w-2xl mx-auto w-full flex-grow">
        <h2 className="text-2xl font-bold text-[#610000] mb-1">PDS Services</h2>
        <p className="text-sm text-[#6c5a5a] mb-6">
          Access all Public Distribution System benefits and entitlements.
        </p>

        {/* Quick Service Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">

          <div
            onClick={() => navigateTo('visit_booking')}
            className="bg-white p-4 rounded-2xl border border-red-100 shadow-xs hover:border-[#8b0000] transition-all cursor-pointer flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#f2dada] text-[#8b0000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">storefront</span>
            </div>
            <span className="text-xs font-bold text-gray-900">Book FPS Visit</span>
            <span className="text-[10px] text-gray-500 mt-0.5">Skip the Queue</span>
          </div>

          <div
            onClick={() => navigateTo('grievance_redressal')}
            className="bg-white p-4 rounded-2xl border border-red-100 shadow-xs hover:border-[#8b0000] transition-all cursor-pointer flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#f2dada] text-[#8b0000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">rate_review</span>
            </div>
            <span className="text-xs font-bold text-gray-900">Grievances</span>
            <span className="text-[10px] text-gray-500 mt-0.5">File Complaint</span>
          </div>

          <div
            onClick={() => navigateTo('booking_history')}
            className="bg-white p-4 rounded-2xl border border-red-100 shadow-xs hover:border-[#8b0000] transition-all cursor-pointer flex flex-col items-center text-center group"
          >
            <div className="w-12 h-12 rounded-full bg-[#f2dada] text-[#8b0000] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">quick_reference</span>
            </div>
            <span className="text-xs font-bold text-gray-900">Tracking & Status</span>
            <span className="text-[10px] text-gray-500 mt-0.5">View History & OTP</span>
          </div>
        </div>

        {/* Ration Entitlement Schedule Table */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-bold text-[#610000]">Monthly Entitlement Chart</h3>
            <span className="px-2.5 py-0.5 bg-[#f2dada] text-[#8b0000] text-[10px] font-bold rounded-full">
              Priority Card
            </span>
          </div>

          <div className="divide-y divide-gray-100">
            {RATION_ENTITLEMENTS.map((item, idx) => (
              <div key={idx} className="py-3 flex justify-between items-center text-xs">
                <span className="font-semibold text-gray-800">{item.item}</span>
                <div className="text-right">
                  <span className="font-bold text-[#8b0000] block">{item.limit}</span>
                  <span className="text-[10px] text-gray-400">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
