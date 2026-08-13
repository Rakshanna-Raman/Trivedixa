import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CitizenRegisterView: React.FC = () => {
  const { citizenUser, navigateTo, bookVisit, openOtpModal } = useApp();

  const today = new Date();

  const dates = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index + 1);

    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      date: date.getDate().toString(),
      full: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
  });

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState('Morning (9-11 AM)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookVisit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking = bookVisit(selectedDate.full, selectedSlot);
      setIsSubmitting(false);
      openOtpModal(newBooking);
      navigateTo('booking_history');
    }, 1200);
  };

  return (
    <div className="bg-[#fff0f0] min-h-screen flex flex-col pt-16 pb-24 font-sans">
      <main className="flex-1 w-full max-w-md px-5 pt-4 pb-12 mx-auto">
        {/* Main Card Container */}
        <div className="bg-white rounded-2xl p-6 custom-shadow w-full border border-red-100">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-[#a00000] text-2xl">
              event_available
            </span>
            <h2 className="text-xl font-bold text-[#610000]">Visit Booking</h2>
          </div>

          <p className="text-sm text-[#5a403c] mb-6 leading-relaxed">
            Select a convenient date and time to visit your assigned ration shop for collection or assistance.
          </p>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#610000] mb-2">
              Select Date
            </label>
            <div className="grid grid-cols-4 gap-2">
              {dates.map((d) => {
                const isSelected = selectedDate.full === d.full;
                return (
                  <button
                    key={d.full}
                    onClick={() => setSelectedDate(d)}
                    type="button"
                    className={`p-2.5 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-2 border-[#a00000] bg-[#fff0f0] text-[#a00000]'
                        : 'border border-[#e3beb8] bg-white text-gray-700 hover:bg-[#fff0f0]'
                    }`}
                  >
                    <span className={`text-[10px] uppercase font-bold ${isSelected ? 'text-[#a00000]' : 'text-gray-500'}`}>
                      {d.day}
                    </span>
                    <span className="font-bold text-lg">{d.date}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-[#610000] mb-2">
              Available Time Slots
            </label>
            <div className="space-y-3">
              {/* Morning */}
              <label
                onClick={() => setSelectedSlot('Morning (9-11 AM)')}
                className={`relative flex items-center p-3.5 border rounded-xl cursor-pointer transition-all ${
                  selectedSlot.startsWith('Morning')
                    ? 'border-2 border-[#a00000] bg-[#fff0f0]'
                    : 'border-[#e3beb8] hover:border-[#a00000]'
                }`}
              >
                <input
                  type="radio"
                  name="timeslot"
                  checked={selectedSlot.startsWith('Morning')}
                  onChange={() => {}}
                  className="w-4 h-4 text-[#a00000] accent-[#a00000]"
                />
                <div className="ml-3 flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">Morning (9-11 AM)</span>
                  <span className="text-xs text-gray-500">8 slots available</span>
                </div>
                <span className="material-symbols-outlined ml-auto text-gray-400">
                  wb_sunny
                </span>
              </label>

              {/* Late Morning */}
              <label
                onClick={() => setSelectedSlot('Late Morning (11:30 AM - 1:00 PM)')}
                className={`relative flex items-center p-3.5 border rounded-xl cursor-pointer transition-all ${
                  selectedSlot.startsWith('Late Morning')
                    ? 'border-2 border-[#a00000] bg-[#fff0f0]'
                    : 'border-[#e3beb8] hover:border-[#a00000]'
                }`}
              >
                <input
                  type="radio"
                  name="timeslot"
                  checked={selectedSlot.startsWith('Late Morning')}
                  onChange={() => {}}
                  className="w-4 h-4 text-[#a00000] accent-[#a00000]"
                />
                <div className="ml-3 flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">Late Morning (11:30 AM - 1:00 PM)</span>
                  <span className="text-xs text-gray-500">15 slots available</span>
                </div>
                <span className="material-symbols-outlined ml-auto text-gray-400">
                  light_mode
                </span>
              </label>

              {/* Evening */}
              <label
                onClick={() => setSelectedSlot('Evening (3-5:00 PM)')}
                className={`relative flex items-center p-3.5 border rounded-xl cursor-pointer transition-all ${
                  selectedSlot.startsWith('Evening')
                    ? 'border-2 border-[#a00000] bg-[#fff0f0]'
                    : 'border-[#e3beb8] hover:border-[#a00000]'
                }`}
              >
                <input
                  type="radio"
                  name="timeslot"
                  checked={selectedSlot.startsWith('Evening')}
                  onChange={() => {}}
                  className="w-4 h-4 text-[#a00000] accent-[#a00000]"
                />
                <div className="ml-3 flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">Evening (3-5:00 PM)</span>
                  <span className="text-xs text-gray-500">4 slots available</span>
                </div>
                <span className="material-symbols-outlined ml-auto text-gray-400">
                  wb_twilight
                </span>
              </label>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-[#fff0f0] rounded-xl p-4 mb-6 flex justify-between items-center border border-red-100">
            <span className="text-sm font-semibold text-[#610000]">Total Amount:</span>
            <span className="text-xl font-bold text-[#610000]">₹0</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleBookVisit}
              disabled={isSubmitting}
              className="w-full h-14 bg-[#a00000] text-white font-bold text-base rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 hover:bg-red-900 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>Booking Slot...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">check_circle</span>
                  <span>Book Visit</span>
                </>
              )}
            </button>

            <button
              onClick={() => navigateTo('citizen_dashboard')}
              className="w-full h-14 bg-white border-2 border-[#a00000] text-[#a00000] font-bold text-base rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 hover:bg-red-50 cursor-pointer"
            >
              <span className="material-symbols-outlined">chevron_left</span>
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Shop Info Card */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-4 flex items-start gap-3 shadow-xs">
          <div className="bg-[#a00000]/10 p-2 rounded-full text-[#a00000]">
            <span className="material-symbols-outlined">storefront</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#610000]">Assigned Ration Shop</h4>
            <p className="text-xs font-semibold text-[#5a403c] mt-0.5">
              {citizenUser?.shopArea || 'Velachery Shop #04'}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              123, Main Road, Velachery, Chennai - 600042
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};