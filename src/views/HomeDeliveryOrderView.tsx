import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const HomeDeliveryOrderView: React.FC = () => {
  const { citizenUser, navigateTo, placeHomeDeliveryOrder, openOtpModal } = useApp();
  const [selectedSlot, setSelectedSlot] = useState('Morning (9:00 AM - 11:00 AM)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const shopArea = citizenUser?.shopArea || 'Velachery 04';

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking = placeHomeDeliveryOrder(selectedSlot);
      setIsSubmitting(false);
      openOtpModal(newBooking);
      navigateTo('booking_history');
    }, 1200);
  };

  return (
    <div className="bg-[#fff0f0] min-h-screen flex flex-col pt-16 pb-20 font-sans">
      <main className="px-5 max-w-lg mx-auto w-full flex-grow mt-4">
        {/* Progress Stepper */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[#a00000] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              1
            </div>
            <span className="text-xs font-semibold text-[#8b0000]">Cart</span>
          </div>

          <div className="flex-1 h-[2px] bg-[#e3beb8] mx-2 mb-4"></div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[#a00000] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              2
            </div>
            <span className="text-xs font-semibold text-[#8b0000]">Slot</span>
          </div>

          <div className="flex-1 h-[2px] bg-[#e3beb8] mx-2 mb-4"></div>

          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-full bg-[#dcd9d9] text-[#5a403c] flex items-center justify-center text-xs font-bold">
              3
            </div>
            <span className="text-xs font-medium text-gray-500">Pay</span>
          </div>
        </div>

        {/* Home Delivery Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 tinted-shadow border border-[#e3beb8]/30 mb-6">
          <h2 className="text-xl font-bold text-[#8b0000] mb-2 text-center">
            Home Delivery Order
          </h2>
          <p className="text-sm text-[#5a403c] mb-6 text-center leading-relaxed">
            Select your preferred time slot for the delivery of your monthly rations to{' '}
            <span className="font-bold text-[#8b0000]">{shopArea}</span>.
          </p>

          {/* Time Slots */}
          <div className="space-y-3 mb-6">
            {/* Slot 1 */}
            <label
              onClick={() => setSelectedSlot('Morning (9:00 AM - 11:00 AM)')}
              className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                selectedSlot.startsWith('Morning')
                  ? 'border-2 border-[#a00000] bg-[#fef2f2]'
                  : 'border-[#e3beb8] hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="delivery_slot"
                checked={selectedSlot.startsWith('Morning')}
                onChange={() => {}}
                className="hidden"
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#f2dada] flex items-center justify-center text-[#8b0000]">
                    <span className="material-symbols-outlined">light_mode</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#8b0000]">Morning</p>
                    <p className="text-xs text-[#6c5a5a]">9:00 AM - 11:00 AM</p>
                  </div>
                </div>
                {selectedSlot.startsWith('Morning') && (
                  <span className="material-symbols-outlined text-[#8b0000]">check_circle</span>
                )}
              </div>
            </label>

            {/* Slot 2 */}
            <label
              onClick={() => setSelectedSlot('Afternoon (12:00 PM - 2:00 PM)')}
              className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                selectedSlot.startsWith('Afternoon')
                  ? 'border-2 border-[#a00000] bg-[#fef2f2]'
                  : 'border-[#e3beb8] hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="delivery_slot"
                checked={selectedSlot.startsWith('Afternoon')}
                onChange={() => {}}
                className="hidden"
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#f2dada] flex items-center justify-center text-[#8b0000]">
                    <span className="material-symbols-outlined">sunny</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#8b0000]">Afternoon</p>
                    <p className="text-xs text-[#6c5a5a]">12:00 PM - 2:00 PM</p>
                  </div>
                </div>
                {selectedSlot.startsWith('Afternoon') && (
                  <span className="material-symbols-outlined text-[#8b0000]">check_circle</span>
                )}
              </div>
            </label>

            {/* Slot 3 */}
            <label
              onClick={() => setSelectedSlot('Evening (3:00 PM - 5:00 PM)')}
              className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                selectedSlot.startsWith('Evening')
                  ? 'border-2 border-[#a00000] bg-[#fef2f2]'
                  : 'border-[#e3beb8] hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="delivery_slot"
                checked={selectedSlot.startsWith('Evening')}
                onChange={() => {}}
                className="hidden"
              />
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#f2dada] flex items-center justify-center text-[#8b0000]">
                    <span className="material-symbols-outlined">bedtime</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#8b0000]">Evening</p>
                    <p className="text-xs text-[#6c5a5a]">3:00 PM - 5:00 PM</p>
                  </div>
                </div>
                {selectedSlot.startsWith('Evening') && (
                  <span className="material-symbols-outlined text-[#8b0000]">check_circle</span>
                )}
              </div>
            </label>
          </div>

          {/* Total Amount Card */}
          <div className="bg-[#f6f3f2] border-2 border-dashed border-[#e3beb8] rounded-xl p-4 mb-6 flex justify-between items-center">
            <span className="text-sm font-semibold text-[#6c5a5a]">Total Amount Payable</span>
            <span className="text-xl font-bold text-[#8b0000]">₹0</span>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="w-full h-14 bg-[#a00000] text-white font-bold rounded-xl shadow-md transition-all active:scale-[0.98] hover:bg-red-900 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">task_alt</span>
                  <span>Confirm Order</span>
                </>
              )}
            </button>

            <button
              onClick={() => navigateTo('citizen_dashboard')}
              className="w-full h-14 bg-transparent border-2 border-[#a00000] text-[#a00000] font-bold rounded-xl transition-all active:scale-[0.98] hover:bg-red-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined">keyboard_backspace</span>
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Help Info Box */}
        <div className="flex items-start gap-3 p-4 bg-white/80 rounded-xl border border-[#e3beb8]/30">
          <span className="material-symbols-outlined text-[#8b0000] mt-0.5">info</span>
          <p className="text-xs text-[#6c5a5a] leading-relaxed">
            Orders placed for home delivery are non-refundable. Please ensure someone is available at the address to receive the rations during the selected slot.
          </p>
        </div>
      </main>
    </div>
  );
};
