import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const StaffLoginView: React.FC = () => {
  const { navigateTo, loginStaff } = useApp();
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffId) {
      setError('Please enter your Staff ID / Employee Number');
      return;
    }
    loginStaff(staffId);
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 font-sans">
      <main className="flex-grow flex items-center justify-center py-10 px-5">
        <div className="w-full max-w-md">
          {/* Central Login Card */}
          <div className="bg-white rounded-2xl p-8 tinted-shadow border border-[#e3beb8]/30 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#8b0000]/5 rounded-full blur-3xl"></div>

            <div className="flex flex-col items-center mb-8 relative z-10">
              <div className="w-20 h-20 bg-[#ffdad4] flex items-center justify-center rounded-full border-2 border-[#8b0000] mb-4">
                <span
                  className="material-symbols-outlined text-[#8b0000] !text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  admin_panel_settings
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#610000] text-center">Official Portal</h2>
              <p className="text-xs text-[#5a403c] text-center mt-1">Authorized Personnel Access Only</p>
            </div>

            {error && (
              <div className="p-3 mb-4 text-xs text-red-800 bg-red-100 rounded-lg text-center">
                {error}
              </div>
            )}

            <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
              {/* Staff ID Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#5a403c] ml-1" htmlFor="staff-id">
                  Staff ID / Employee Number
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    badge
                  </span>
                  <input
                    id="staff-id"
                    type="text"
                    value={staffId}
                    onChange={(e) => setStaffId(e.target.value)}
                    placeholder="e.g. EMP-99823"
                    className="w-full h-14 pl-12 pr-4 rounded-xl border border-[#e3beb8] bg-[#fbf9f8] text-sm focus:ring-2 focus:ring-[#8b0000] focus:border-[#8b0000] transition-all outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#5a403c] ml-1" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    lock
                  </span>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-12 rounded-xl border border-[#e3beb8] bg-[#fbf9f8] text-sm focus:ring-2 focus:ring-[#8b0000] focus:border-[#8b0000] transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8b0000] transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <a
                  href="#forgot"
                  onClick={(e) => { e.preventDefault(); alert('Please contact your regional PDS Administrator to reset your official staff password.'); }}
                  className="text-xs font-semibold text-[#8b0000] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-14 bg-[#8b0000] text-white rounded-xl font-bold text-base shadow-lg hover:bg-red-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Login</span>
                <span className="material-symbols-outlined">login</span>
              </button>
            </form>

            {/* Help Text */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-[#fff0f0] rounded-xl border border-[#ffdad4]">
              <span className="material-symbols-outlined text-[#8b0000]">info</span>
              <p className="text-xs text-[#5a403c] leading-relaxed">
                Use your department-issued credentials. Password resets must be initiated by your regional PDS Administrator.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-[#5a403c]">
              New to the department?{' '}
              <button
                onClick={() => navigateTo('staff_register')}
                className="text-[#8b0000] font-bold hover:underline ml-1 cursor-pointer"
              >
                Staff Registration
              </button>
            </p>

            <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200">
              <button 
                onClick={() => alert('Support Desk: Contact PDS Admin at staff-support@pds.gov.in')}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8b0000] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[18px]">help_center</span>
                <span>Support Desk</span>
              </button>
              <button 
                onClick={() => alert('Security Policy: Unauthorized access is strictly prohibited and subject to legal prosecution under IT Act.')}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8b0000] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[18px]">policy</span>
                <span>Security Policy</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-5 text-center text-xs text-gray-500 border-t border-red-50">
        © 2024 Smart PDS System | Department of Food & Public Distribution
      </footer>
    </div>
  );
};
