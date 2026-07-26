import React from 'react';
import { useApp } from '../context/AppContext';

export const CitizenDashboardView: React.FC = () => {
  const { citizenUser, navigateTo, logout, openOtpModal, bookings } = useApp();

  const activeBooking = bookings.find(b => b.status === 'SCHEDULED' || b.status === 'COMPLETED');

  return (
    <div className="bg-[#fff0f0] min-h-screen flex flex-col pt-16 pb-24 font-sans">
      <main className="px-5 flex-grow flex flex-col items-center">
        <div className="w-full max-w-md mt-4 flex flex-col gap-4">
          {/* Alert/Notification Section */}
          {citizenUser?.quotaUsed && (
            <div 
              onClick={() => {
                if (activeBooking) openOtpModal(activeBooking);
                else navigateTo('booking_history');
              }}
              className="bg-[#ffdad6] p-4 rounded-2xl flex items-start gap-3 border border-red-200 shadow-sm cursor-pointer hover:border-red-400 transition-colors"
            >
              <span
                className="material-symbols-outlined text-[#ba1a1a] mt-0.5"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
              <div>
                <h3 className="text-sm font-bold text-[#93000a]">Monthly Quota Used!</h3>
                <p className="text-xs text-[#93000a] mt-1 opacity-90 leading-relaxed">
                  You have already placed an order for this month. Please check your History for the OTP.
                </p>
                <span className="text-[11px] font-semibold text-[#8b0000] underline mt-1.5 inline-block">
                  View OTP Code →
                </span>
              </div>
            </div>
          )}

          {/* Welcome Card */}
          <div className="bg-white p-5 rounded-2xl tinted-shadow border border-red-100/50 text-center flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full border-2 border-[#a00000] p-1 shadow-sm">
              <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                {citizenUser?.avatarUrl ? (
                  <img
                    src={citizenUser.avatarUrl}
                    alt={citizenUser.fullName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : null}
                <span className="material-symbols-outlined text-[#a00000] text-3xl">person</span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#610000]">
              Citizen: {citizenUser?.fullName || 'Rakshanna'}
            </h2>

            <div className="flex items-center gap-2 px-3 py-1 bg-[#fff0f0] rounded-full border border-red-100">
              <span className="material-symbols-outlined text-[#610000] text-base">id_card</span>
              <span className="text-xs font-semibold text-[#610000]">
                Card: {citizenUser?.rationCardNumber || '123456789'}
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-3 mt-1">
            {/* Action Button 1 */}
            <button
              onClick={() => navigateTo('home_delivery_order')}
              className="w-full h-14 bg-[#8b0000] text-white font-semibold text-sm rounded-xl flex items-center justify-between px-5 shadow-md active:scale-[0.98] transition-all hover:bg-red-900 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  shopping_cart
                </span>
                <span>Online Shopping (Home Delivery)</span>
              </div>
              <span className="material-symbols-outlined text-white/60">chevron_right</span>
            </button>

            {/* Action Button 2 */}
            <button
              onClick={() => navigateTo('visit_booking')}
              className="w-full h-14 bg-[#a00000] text-white font-semibold text-sm rounded-xl flex items-center justify-between px-5 shadow-md active:scale-[0.98] transition-all hover:bg-red-900 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl">storefront</span>
                <span>Book In-Person Visit</span>
              </div>
              <span className="material-symbols-outlined text-white/60">chevron_right</span>
            </button>

            {/* Action Button 3 */}
            <button
              onClick={() => navigateTo('grievance_redressal')}
              className="w-full h-14 bg-[#a00000] text-white font-semibold text-sm rounded-xl flex items-center justify-between px-5 shadow-md active:scale-[0.98] transition-all hover:bg-red-900 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl">rate_review</span>
                <span>Submit Complaint</span>
              </div>
              <span className="material-symbols-outlined text-white/60">chevron_right</span>
            </button>

            {/* Action Button 4 */}
            <button
              onClick={() => navigateTo('booking_history')}
              className="w-full h-14 bg-[#a00000] text-white font-semibold text-sm rounded-xl flex items-center justify-between px-5 shadow-md active:scale-[0.98] transition-all hover:bg-red-900 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl">history</span>
                <span>Booking History</span>
              </div>
              <span className="material-symbols-outlined text-white/60">chevron_right</span>
            </button>

            {/* Secondary / Logout Action */}
            <button
              onClick={logout}
              className="w-full h-14 bg-[#6c5a5a] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-3 mt-3 active:scale-[0.98] transition-all shadow-sm hover:bg-gray-700 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span>Logout</span>
            </button>
          </div>

          {/* Footer Info */}
          <p className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
            Authorized by Department of Civil Supplies
            <br />
            © 2024 Smart PDS System
          </p>
        </div>
      </main>
    </div>
  );
};
