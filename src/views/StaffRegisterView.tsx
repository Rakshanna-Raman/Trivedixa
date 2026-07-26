import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShopArea } from '../types';

export const StaffRegisterView: React.FC = () => {
  const { navigateTo, registerStaff } = useApp();
  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [shopArea, setShopArea] = useState<ShopArea | ''>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !employeeId || !mobileNumber || !shopArea || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      registerStaff({
        fullName,
        employeeId,
        mobileNumber,
        shopArea: shopArea as ShopArea
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-[#fff0f0] min-h-screen flex flex-col pt-16 font-sans">
      <main className="flex-grow pt-8 pb-12 px-5 max-w-lg mx-auto w-full">
        {/* Official Branding Section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-2 border-[#a00000] shadow-lg mb-4">
            <span
              className="material-symbols-outlined text-[#a00000] text-[40px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#610000] mb-1">Official Registration</h2>
          <p className="text-sm text-[#6c5a5a] max-w-xs">
            Join the department to manage local distribution and complaints.
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-xs text-red-800 bg-red-100 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Registration Card */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#5a403c]">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-14 px-4 bg-[#fff0f0] border border-[#e3beb8] rounded-xl text-sm outline-none focus:border-[#8b0000] transition-all"
              />
            </div>

            {/* Employee ID */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#5a403c]">
                Employee ID / Staff ID
              </label>
              <input
                type="text"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="e.g. EMP-99823"
                className="w-full h-14 px-4 bg-[#fff0f0] border border-[#e3beb8] rounded-xl text-sm outline-none focus:border-[#8b0000] transition-all"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#5a403c]">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#5a403c] font-semibold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="98765 43210"
                  className="w-full h-14 pl-14 pr-4 bg-[#fff0f0] border border-[#e3beb8] rounded-xl text-sm outline-none focus:border-[#8b0000] transition-all"
                />
              </div>
            </div>

            {/* Ration Shop Area */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#5a403c]">Ration Shop Area</label>
              <select
                required
                value={shopArea}
                onChange={(e) => setShopArea(e.target.value as ShopArea)}
                className="w-full h-14 px-4 bg-[#fff0f0] border border-[#e3beb8] rounded-xl text-sm outline-none focus:border-[#8b0000] transition-all appearance-none"
              >
                <option value="" disabled>Select Shop Area</option>
                <option value="Adambakkam 01">Adambakkam 01</option>
                <option value="Nanganallur 02">Nanganallur 02</option>
                <option value="Pallavaram 03">Pallavaram 03</option>
                <option value="Velachery 04">Velachery 04</option>
              </select>
            </div>

            {/* Passwords */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#5a403c]">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 px-4 bg-[#fff0f0] border border-[#e3beb8] rounded-xl text-sm outline-none focus:border-[#8b0000] transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#5a403c]">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-14 px-4 bg-[#fff0f0] border border-[#e3beb8] rounded-xl text-sm outline-none focus:border-[#8b0000] transition-all"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-[#8b0000] text-white font-bold rounded-xl shadow-md hover:bg-red-900 active:scale-[0.98] transition-all duration-150 mt-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Register</span>
                  <span className="material-symbols-outlined">how_to_reg</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <p className="text-sm text-[#5a403c]">
            Already registered?{' '}
            <button
              onClick={() => navigateTo('staff_login')}
              className="text-[#8b0000] font-bold hover:underline cursor-pointer"
            >
              Staff Login
            </button>
          </p>
        </div>

        {/* Decoration emblem */}
        <div className="mt-8 flex justify-center items-center opacity-25 grayscale pointer-events-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuANkUwg549ScW0nYJSLzkzzvO66mgzoF3IX_w40lJHWchZeUPCCZ87WllVtAfu3FU79jNS0MNc_AsaQzLQYhB2Uo7dwS8SBk008xxBgTXSniBkKpCydpR_gWcALcrprV1sMqye7O7rSDFquXik-yE2FPOjY7LiKpvoyI3wKnFHUBvs3ivXFIn9d9KeGVbthqaFSu8MM8IzIUEBUsdE9zThlzABuOeJu67PY0W9zqaSmqSS0zSE2zaU8RV0pzPtFKmqsgmCP-8Lf79nl"
            alt="Government Seal"
            className="w-28 h-28 object-contain"
          />
        </div>
      </main>
    </div>
  );
};
