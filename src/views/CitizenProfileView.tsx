import React from 'react';
import { useApp } from '../context/AppContext';

export const CitizenProfileView: React.FC = () => {
  const { citizenUser, logout } = useApp();

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 pb-28 font-sans">
      <main className="pt-6 px-5 max-w-xl mx-auto w-full flex-grow">
        {/* Profile Header */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-[#8b0000] p-1 mb-3">
            <div className="w-full h-full rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
              {citizenUser?.avatarUrl ? (
                <img
                  src={citizenUser.avatarUrl}
                  alt={citizenUser.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="material-symbols-outlined text-[#8b0000] text-3xl">person</span>
              )}
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900">{citizenUser?.fullName || 'Rakshanna'}</h2>
          <p className="text-xs text-gray-500 mt-0.5">Ration Card Holder</p>

          <span className="mt-2 px-3 py-1 bg-[#fff0f0] text-[#8b0000] font-bold text-xs rounded-full border border-red-100">
            Card No: {citizenUser?.rationCardNumber || '123456789'}
          </span>
        </div>

        {/* Details List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 divide-y divide-gray-100 text-xs">
          <div className="p-4 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Card Type</span>
            <span className="font-bold text-gray-800 capitalize">{citizenUser?.cardType || 'Priority'}</span>
          </div>

          <div className="p-4 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Mobile Number</span>
            <span className="font-bold text-gray-800">+91 {citizenUser?.mobileNumber || '9876543210'}</span>
          </div>

          <div className="p-4 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Assigned Ration Shop</span>
            <span className="font-bold text-gray-800">{citizenUser?.shopArea || 'Velachery 04'}</span>
          </div>

          <div className="p-4 flex justify-between items-center">
            <span className="text-gray-500 font-medium">Quota Status (This Month)</span>
            <span className={`font-bold ${citizenUser?.quotaUsed ? 'text-red-700' : 'text-green-700'}`}>
              {citizenUser?.quotaUsed ? 'Used / Order Placed' : 'Available'}
            </span>
          </div>
        </div>

        {/* Family Members Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
          <h3 className="text-sm font-bold text-[#610000] mb-3">Linked Family Members</h3>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-gray-50 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-800 block">Rakshanna (Head)</span>
                <span className="text-[10px] text-gray-400">Female | 28 Yrs</span>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 font-semibold text-[10px] rounded-md">KYC Verified</span>
            </div>

            <div className="p-2.5 bg-gray-50 rounded-xl flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-800 block">Siddharth R (Spouse)</span>
                <span className="text-[10px] text-gray-400">Male | 31 Yrs</span>
              </div>
              <span className="px-2 py-0.5 bg-green-100 text-green-800 font-semibold text-[10px] rounded-md">KYC Verified</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full py-4 bg-[#8b0000] text-white font-bold rounded-xl shadow-md hover:bg-red-900 transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout Account</span>
        </button>
      </main>
    </div>
  );
};
