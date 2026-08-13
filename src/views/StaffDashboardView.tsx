import React from 'react';
import { useApp } from '../context/AppContext';

export const StaffDashboardView: React.FC = () => {
  const { staffUser, navigateTo, logout, complaints, bookings } = useApp();

  const shopArea = staffUser?.shopArea || 'Velachery 04';
  const pendingComplaints = complaints.filter(c => c.status === 'PENDING').length;
  const pendingOrders = bookings.filter(b => b.status === 'SCHEDULED' || b.status === 'PENDING').length;

  return (
    <div className="bg-[#fff0f0] min-h-screen flex flex-col pt-16 pb-28 font-sans">
      <main className="flex-grow pt-6 px-5 max-w-lg mx-auto w-full">
        {/* Welcome Section */}
        <section className="mb-6">
          <p className="text-xs font-bold text-[#5a403c] uppercase tracking-wider">
            Staff Dashboard
          </p>
          <h2 className="text-2xl font-extrabold text-[#610000] mt-0.5">
            Shop Area: {shopArea}
          </h2>
        </section>

        {/* Functional Grid */}
        <div className="grid grid-cols-1 gap-4">
          {/* Hero Card: Local Orders */}
          <div 
            onClick={() => navigateTo('staff_orders')}
            className="bg-white rounded-2xl p-6 tonal-shadow border border-[#e3beb8]/30 relative overflow-hidden group hover:border-[#8b0000]/50 transition-colors cursor-pointer"
          >
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-[#8b0000]/5 rounded-full blur-2xl group-hover:bg-[#8b0000]/10 transition-colors"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#f2dada] flex items-center justify-center text-[#8b0000]">
                  <span
                    className="material-symbols-outlined text-[28px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    inventory_2
                  </span>
                </div>
                {pendingOrders > 0 && (
                  <span className="px-2.5 py-1 bg-red-100 text-[#8b0000] text-xs font-bold rounded-full">
                    {pendingOrders} Active
                  </span>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">View Local Orders</h3>
              <p className="text-xs text-[#5a403c] mb-5 leading-relaxed">
                Manage ration distribution and pending requests for your area.
              </p>

              <button
                type="button"
                className="w-full h-12 bg-[#a00000] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:bg-red-900 transition-colors"
              >
                <span>Check Orders</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Secondary Card: Local Complaints */}
          <div 
            onClick={() => navigateTo('staff_complaints')}
            className="bg-white rounded-2xl p-5 tonal-shadow border border-[#e3beb8]/30 relative overflow-hidden group hover:border-[#8b0000]/50 transition-colors cursor-pointer"
          >
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-[#8b0000]">
                  <span
                    className="material-symbols-outlined text-[28px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    notification_important
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Local Complaints</h3>
                  <p className="text-xs text-gray-500">
                    {pendingComplaints} pending {pendingComplaints === 1 ? 'ticket' : 'tickets'} to resolve
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="h-11 px-5 bg-[#f2dada] text-[#8b0000] font-bold text-xs rounded-xl hover:bg-red-200 transition-colors cursor-pointer self-start sm:self-auto"
              >
                Resolve Now
              </button>
            </div>
          </div>

          {/* Operational Hours Notice */}
          <div className="mt-2">
            <div className="bg-[#f6f3f2] rounded-xl p-4 border border-[#e3beb8]/20 flex items-start gap-3">
              <span
                className="material-symbols-outlined text-[#ffb4a8] mt-0.5 text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                info
              </span>
              <p className="text-xs text-[#6c5a5a] leading-relaxed">
                Operational hours: 9:00 AM - 5:00 PM. Please ensure all stocks are updated before logout.
              </p>
            </div>
          </div>
        </div>

        {/* Logout Action Area */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={logout}
            className="w-full h-14 bg-[#303030] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-black transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>

          <p className="text-center text-xs text-gray-500 mt-2">
            Smart PDS Version 2.4.1 (Admin Mode)
          </p>
        </div>
      </main>
    </div>
  );
};
