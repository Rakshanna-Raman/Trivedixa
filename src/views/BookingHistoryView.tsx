import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';

export const BookingHistoryView: React.FC = () => {
  const { bookings, openOtpModal } = useApp();
  const [filter, setFilter] = useState<'all' | 'in_person'>('all');
  const [showAll, setShowAll] = useState(false);

  const filteredBookings = bookings.filter((b) => {
    if (b.type === 'home_delivery') return false;
    if (filter === 'in_person') return b.type === 'in_person';
    return true;
  });

  const displayedBookings = showAll ? filteredBookings : filteredBookings.slice(0, 5);

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'COMPLETED':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-[11px] font-bold uppercase tracking-wide">
            Completed
          </span>
        );
      case 'SCHEDULED':
      case 'PENDING':
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-[11px] font-bold uppercase tracking-wide">
            Scheduled
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-[11px] font-bold uppercase tracking-wide">
            Cancelled
          </span>
        );
    }
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 pb-28 font-sans">
      <main className="pt-6 px-5 max-w-2xl mx-auto w-full flex-grow">
        {/* Header Section */}
        <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#610000]">Booking History</h2>
            <p className="text-sm text-[#6c5a5a] mt-1">
              Manage and track your visit requests.
            </p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#8b0000] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setFilter('in_person')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === 'in_person'
                  ? 'bg-[#8b0000] text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              In-Person
            </button>
          </div>
        </section>

        {/* Booking List */}
        <div className="space-y-4">
          {displayedBookings.map((b) => (
            <article
              key={b.id}
              onClick={() => openOtpModal(b)}
              className={`bg-white p-4 rounded-2xl tonal-shadow flex flex-col sm:flex-row gap-4 border border-gray-100 hover:border-[#8b0000]/40 transition-all cursor-pointer ${
                b.status === 'SCHEDULED' ? 'border-l-4 border-l-[#8b0000]' : ''
              }`}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  b.type === 'in_person'
                    ? 'bg-red-100 text-[#8b0000]'
                    : 'bg-red-100 text-[#8b0000]'
                }`}
              >
                <span className="material-symbols-outlined">
                  storefront
                </span>
              </div>

              {/* Info */}
              <div className="flex-grow space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-base font-bold text-gray-900">
                    In-Person Visit
                  </h3>
                  {getStatusBadge(b.status)}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 text-xs">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tight font-semibold">
                      Appointment Date
                    </p>
                    <p className="font-semibold text-gray-800">{b.date}</p>
                  </div>

                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tight font-semibold">
                      Reference ID
                    </p>
                    <p className="font-semibold text-gray-800">{b.referenceId}</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[10px] text-gray-500 uppercase tracking-tight font-semibold">
                      {b.reason ? 'Reason' : 'Time Slot'}
                    </p>
                    <p className="font-semibold text-gray-800">
                      {b.reason || b.timeSlot}
                    </p>
                  </div>
                </div>

                {b.otp && (
                  <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center text-xs">
                    <span className="text-red-800 font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">key</span>
                      OTP: <span className="font-mono text-sm tracking-widest">{b.otp}</span>
                    </span>
                    <span className="text-[11px] text-gray-400">Click card for details</span>
                  </div>
                )}
              </div>
            </article>
          ))}

          {filteredBookings.length === 0 && (
            <div className="bg-white p-8 rounded-2xl text-center text-gray-500 text-sm">
              No bookings found in this category.
            </div>
          )}
        </div>

        {/* Show Older Records Button */}
        {filteredBookings.length > 5 && !showAll && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="bg-white border border-[#8e706b] px-6 py-3 rounded-xl text-xs font-bold text-[#610000] hover:bg-[#fff0f0] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Show Older Records</span>
              <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};