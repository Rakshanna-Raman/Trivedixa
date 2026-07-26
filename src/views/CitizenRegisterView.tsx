import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CardType, ShopArea } from '../types';

export const CitizenRegisterView: React.FC = () => {
  const { navigateTo, registerCitizen } = useApp();
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [cardType, setCardType] = useState<CardType | ''>('');
  const [shopArea, setShopArea] = useState<ShopArea | ''>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !cardType || !shopArea || !password) {
      setError('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      registerCitizen({
        fullName,
        mobileNumber,
        cardType: cardType as CardType,
        shopArea: shopArea as ShopArea
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 font-sans">
      <main className="flex-grow pt-8 pb-12 px-5 flex justify-center items-center">
        <div className="w-full max-w-md space-y-6">
          {/* Registration Header Illustration/Context */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f2dada] text-[#8b0000] mb-1">
              <span className="material-symbols-outlined text-[32px]">person_add</span>
            </div>
            <h2 className="text-2xl font-bold text-[#610000]">Join Smart PDS</h2>
            <p className="text-sm text-[#5a403c]">
              Access your ration benefits digitally and securely.
            </p>
          </div>

          {error && (
            <div className="p-3 text-xs text-red-800 bg-red-100 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Registration Card */}
          <div className="bg-white rounded-2xl p-6 tinted-shadow border border-[#e4e2e1]">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5a403c] block" htmlFor="full_name">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    person
                  </span>
                  <input
                    id="full_name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e3beb8] bg-[#fbf9f8] text-sm outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5a403c] block" htmlFor="mobile_number">
                  Mobile Number
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    phone_android
                  </span>
                  <input
                    id="mobile_number"
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e3beb8] bg-[#fbf9f8] text-sm outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all"
                  />
                </div>
              </div>

              {/* Ration Card Type */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5a403c] block" htmlFor="card_type">
                  Ration Card Type
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    credit_card
                  </span>
                  <select
                    id="card_type"
                    required
                    value={cardType}
                    onChange={(e) => setCardType(e.target.value as CardType)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#e3beb8] bg-[#fbf9f8] text-sm outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all appearance-none"
                  >
                    <option value="" disabled>Select Card Type</option>
                    <option value="priority">Priority</option>
                    <option value="non-priority">Non-Priority</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Select Ration Shop Area */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#5a403c] block" htmlFor="shop_area">
                  Select Ration Shop Area
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    storefront
                  </span>
                  <select
                    id="shop_area"
                    required
                    value={shopArea}
                    onChange={(e) => setShopArea(e.target.value as ShopArea)}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#e3beb8] bg-[#fbf9f8] text-sm outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all appearance-none"
                  >
                    <option value="" disabled>Select your area</option>
                    <option value="Adambakkam 01">Adambakkam 01</option>
                    <option value="Nanganallur 02">Nanganallur 02</option>
                    <option value="Pallavaram 03">Pallavaram 03</option>
                    <option value="Velachery 04">Velachery 04</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Passwords */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5a403c] block" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      lock
                    </span>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e3beb8] bg-[#fbf9f8] text-sm outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#5a403c] block" htmlFor="confirm_password">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      lock_reset
                    </span>
                    <input
                      id="confirm_password"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#e3beb8] bg-[#fbf9f8] text-sm outline-none focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Primary Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#8b0000] text-white py-4 rounded-xl font-bold text-sm shadow-md hover:bg-red-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin material-symbols-outlined">progress_activity</span>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <span className="material-symbols-outlined">how_to_reg</span>
                  </>
                )}
              </button>

              {/* Secondary Action */}
              <button
                type="button"
                onClick={() => navigateTo('citizen_login')}
                className="w-full text-[#6c5a5a] font-semibold text-sm text-center hover:bg-gray-100 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Back
              </button>
            </form>
          </div>

          {/* Login Prompt */}
          <p className="text-center text-sm text-[#5a403c]">
            Already have an account?{' '}
            <button
              onClick={() => navigateTo('citizen_login')}
              className="text-[#8b0000] font-bold hover:underline cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};
