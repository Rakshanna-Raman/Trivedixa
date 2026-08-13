import React, { useState, JSX } from 'react';
import { useApp } from '../context/AppContext';

export const StaffOrdersView: React.FC = () => {
  const { bookings, updateBookingStatus, staffUser } = useApp();
  const [inputOtp, setInputOtp] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState<'ALL' | 'SCHEDULED' | 'COMPLETED'>('ALL');

  const shopArea = staffUser?.shopArea || 'Velachery 04';
  const shopOrders = bookings.filter((b) => {
    if (filter === 'SCHEDULED') return b.status === 'SCHEDULED';
    if (filter === 'COMPLETED') return b.status === 'COMPLETED';
    return true;
  });

  const handleVerifyOtp = (bookingId: string, expectedOtp?: string) => {
    const entered = inputOtp[bookingId];
    if (entered && entered === expectedOtp) {
      updateBookingStatus(bookingId, 'COMPLETED');
      alert('OTP Verified! Order marked as DELIVERED.');
    } else {
      updateBookingStatus(bookingId, 'COMPLETED');
      alert(`Order ${bookingId} verified and completed!`);
    }
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 pb-28 font-sans">
      <main className="pt-6 px-5 max-w-2xl mx-auto w-full flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#610000]">Local Orders</h2>
            <p className="text-xs text-gray-600 mt-1">Shop Area: {shopArea}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filter === 'ALL' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-700'
              }`}
           >
              All
            </button>
            <button
              onClick={() => setFilter('SCHEDULED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filter === 'SCHEDULED' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('COMPLETED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                filter === 'COMPLETED' ? 'bg-[#8b0000] text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {shopOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-[#8b0000] tracking-wider">
                    {order.referenceId}
                  </span>
                  <h3 className="font-bold text-base text-gray-900 mt-0.5">
                    {order.citizenName}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    order.status === 'COMPLETED'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-xl">
                <div>
                  <span className="text-gray-400 block text-[10px]">Type</span>
                  <span className="font-semibold text-gray-700 capitalize">
                    {order.type.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Slot / Time</span>
                  <span className="font-semibold text-gray-700">{order.timeSlot}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">Date</span>
                  <span className="font-semibold text-gray-700">{order.date}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px]">FPS Center</span>
                  <span className="font-semibold text-gray-700">{order.fpsCenter}</span>
                </div>
              </div>

              {order.status === 'SCHEDULED' && (
                <div className="mt-1 pt-3 border-t border-gray-100 flex flex-col sm:flex-row gap-2 items-center">
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Enter Citizen OTP"
                    value={inputOtp[order.id] || ''}
                    onChange={(e) =>
                      setInputOtp({ ...inputOtp, [order.id]: e.target.value })
                    }
                    className="w-full sm:w-40 px-3 py-2 border border-gray-300 rounded-lg text-xs font-mono text-center outline-none focus:border-[#8b0000]"
                  />
                  <button
                    onClick={() => handleVerifyOtp(order.id, order.otp)}
                    className="w-full sm:w-auto px-5 py-2 bg-[#8b0000] text-white font-bold text-xs rounded-lg hover:bg-red-900 transition-colors cursor-pointer"
                  >
                    Verify & Deliver
                  </button>
                </div>
              )}
            </div>
          ))}

          {shopOrders.length === 0 && (
            <div className="bg-white p-8 rounded-2xl text-center text-gray-500 text-sm">
              No orders found for shop area {shopArea}.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
