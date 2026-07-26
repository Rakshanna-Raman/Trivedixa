import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CitizenLoginView: React.FC = () => {
  const { navigateTo, loginCitizen } = useApp();
  const [rationCardOrMobile, setRationCardOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rationCardOrMobile) {
      setError('Please enter your Ration Card Number or Mobile Number');
      return;
    }
    loginCitizen(rationCardOrMobile);
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen flex flex-col pt-16 font-sans">
      <main className="flex-grow flex flex-col items-center justify-center py-10 px-5 relative z-10">
        {/* Soft Tonal Shift Decoration */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#fff0f0] opacity-50 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#fff0f0] opacity-30 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4"></div>
        </div>

        {/* Login Card Container */}
        <div className="relative z-10 w-full max-w-md bg-white rounded-2xl tinted-shadow p-8 flex flex-col items-center border border-red-50">
          {/* Avatar Illustration Section */}
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full border-2 border-[#8b0000] flex items-center justify-center bg-[#fff0f0] overflow-hidden p-1 shadow-inner">
              <img
                className="w-full h-full object-cover rounded-full"
                alt="Citizen Avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl7ZftlZmhEZBSkKsGm_UoOUpQk2VjIF5HvgCd_SaWi_eCvUKjAG9MSp7gBQEncymStp3MTlYApjpP3j-zRdnTPmCDW1UVtLCKH5U4jtWRgeznhkZD0ohd1taNaGD76FuyHk99isPlun02GNzSk3ZxdwB7fHZxOyg1I7bAZq2ksCY-OKSPWfeoweiBhnvBHhWdd9g8I8wYV8DxYpVOsdI45B1VJHUwAy9UiMpw6zaztl6AHfLnc081kFVjsBrKzKoztrgoOluwtFIl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="material-symbols-outlined text-[#8b0000] text-4xl">person</span>
            </div>
          </div>

          {/* Form Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#610000] mb-2">Citizen Login</h2>
            <p className="text-sm text-[#6c5a5a] opacity-90">
              Access your Public Distribution System portal
            </p>
          </div>

          {error && (
            <div className="w-full p-3 mb-4 text-xs text-red-800 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form className="w-full space-y-5" onSubmit={handleSubmit}>
            {/* Ration Card / Mobile Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a403c] block" htmlFor="id-field">
                Ration Card Number or Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                  person
                </span>
                <input
                  id="id-field"
                  type="text"
                  value={rationCardOrMobile}
                  onChange={(e) => setRationCardOrMobile(e.target.value)}
                  placeholder="Enter 12-digit number"
                  className="w-full h-14 pl-12 pr-4 bg-[#fbf9f8] border border-[#e3beb8] rounded-xl focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all outline-none text-sm"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#5a403c] block" htmlFor="password-field">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">
                  lock
                </span>
                <input
                  id="password-field"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-12 bg-[#fbf9f8] border border-[#e3beb8] rounded-xl focus:border-[#8b0000] focus:ring-1 focus:ring-[#8b0000] transition-all outline-none text-sm"
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

            {/* Forgot Password */}
            <div className="flex justify-end">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered mobile number.'); }} className="text-xs font-semibold text-[#8b0000] hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-14 bg-[#8b0000] text-white font-bold rounded-xl hover:bg-red-900 transition-all duration-200 shadow-md flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.98]"
            >
              <span className="text-base">Login</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                login
              </span>
            </button>
          </form>
        </div>

        {/* Registration Link */}
        <div className="mt-8 relative z-10 text-center">
          <p className="text-sm text-[#5a403c]">
            Don't have an account?{' '}
            <button
              onClick={() => navigateTo('citizen_register')}
              className="text-[#8b0000] font-bold ml-1 hover:underline cursor-pointer"
            >
              Register
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center px-5 border-t border-red-50">
        <p className="text-xs text-gray-500">
          © 2024 Smart PDS System. Department of Food & Public Distribution.
        </p>
        <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Smart PDS Privacy Policy: All personal citizen data is encrypted & secured.'); }} className="hover:text-[#8b0000] underline">
            Privacy Policy
          </a>
          <a href="#help" onClick={(e) => { e.preventDefault(); alert('Smart PDS Help Desk: Toll-free 1800-111-737'); }} className="hover:text-[#8b0000] underline">
            Help Desk
          </a>
        </div>
      </footer>
    </div>
  );
};
