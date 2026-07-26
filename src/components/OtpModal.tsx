import React from 'react';
import { useApp } from '../context/AppContext';

export const OtpModal: React.FC = () => {
  const { selectedOtpBooking, closeOtpModal } = useApp();

  if (!selectedOtpBooking) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-red-100 flex flex-col items-center text-center relative">
        <button
          onClick={closeOtpModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-800 mb-4">
          <span className="material-symbols-outlined text-3xl">key</span>
        </div>

        <h3 className="font-bold text-xl text-red-900 mb-1">
          {selectedOtpBooking.type === 'home_delivery' ? 'Home Delivery OTP' : 'Visit Booking OTP'}
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Share this OTP code with the PDS agent at the time of delivery or shop visit.
        </p>

        <div className="bg-red-50 border-2 border-dashed border-red-200 rounded-xl px-6 py-4 mb-4 w-full">
          <span className="text-xs font-semibold text-red-800 tracking-wider uppercase block mb-1">
            Verification OTP
          </span>
          <span className="text-3xl font-mono font-extrabold text-red-900 tracking-widest">
            {selectedOtpBooking.otp || '5829'}
          </span>
        </div>

        <div className="w-full text-left bg-gray-50 p-3 rounded-lg text-xs space-y-1 mb-5">
          <div className="flex justify-between">
            <span className="text-gray-500">Reference ID:</span>
            <span className="font-semibold text-gray-800">{selectedOtpBooking.referenceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Scheduled Date:</span>
            <span className="font-semibold text-gray-800">{selectedOtpBooking.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Slot:</span>
            <span className="font-semibold text-gray-800">{selectedOtpBooking.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Ration Shop:</span>
            <span className="font-semibold text-gray-800">{selectedOtpBooking.fpsCenter}</span>
          </div>
        </div>

        <button
          onClick={closeOtpModal}
          className="w-full py-3 bg-[#8b0000] text-white font-semibold rounded-xl hover:bg-red-900 transition-colors shadow-md active:scale-95"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
