import React from 'react';
import { useApp } from '../context/AppContext';

export const PortalSelectionView: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-[#fef2f2] min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#8b0000] py-6 shadow-md">
        <h1 className="text-white text-3xl font-bold text-center tracking-wide">
          Smart PDS System
        </h1>
      </header>

      {/* Main Content */}
      <main className="px-6 py-10 flex flex-col gap-8 max-w-md mx-auto w-full flex-1 justify-center">
        {/* Citizen Portal Card */}
        <section className="bg-white rounded-3xl p-8 card-shadow flex flex-col items-center">
          <div className="flex items-center justify-center mb-8">
            <svg
              className="h-8 w-8 text-blue-500 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-[#8b0000] text-2xl font-bold">Citizen Portal</h2>
          </div>
          <button
            onClick={() => navigateTo('citizen_login')}
            className="w-full bg-[#8b0000] text-white text-center py-4 rounded-xl font-semibold text-lg hover:bg-red-900 transition-colors duration-200 active:scale-[0.98] shadow-md cursor-pointer"
          >
            Login / Register
          </button>
        </section>

        {/* Staff Portal Card */}
        <section className="bg-white rounded-3xl p-8 card-shadow flex flex-col items-center">
          <div className="flex items-center justify-center mb-8">
            <span className="text-3xl mr-2" role="img" aria-label="staff-icon">
              👨‍💼
            </span>
            <h2 className="text-[#8b0000] text-2xl font-bold">Staff Portal</h2>
          </div>
          <button
            onClick={() => navigateTo('staff_login')}
            className="w-full bg-[#8b0000] text-white text-center py-4 rounded-xl font-semibold text-lg hover:bg-red-900 transition-colors duration-200 active:scale-[0.98] shadow-md cursor-pointer"
          >
            Staff Login
          </button>
        </section>
      </main>

      {/* Subtle Footer */}
      <footer className="py-6 text-center text-xs text-gray-500">
        © 2026 TRIVEDIXA . Smart PDS System.
      </footer>
    </div>
  );
};
