import React from 'react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeScreen, navigateTo, role } = useApp();

  // Hide bottom nav on login, registration, and nested transactional steps unless top dashboard
  const hideScreens = [
    'portal_selection',
    'citizen_login',
    'citizen_register',
    'staff_login',
    'staff_register',
    'home_delivery_order',
    'visit_booking',
    'grievance_redressal',
  ];

  if (hideScreens.includes(activeScreen)) {
    return null;
  }

  if (role === 'staff') {
    return (
      <nav className="fixed bottom-0 w-full z-40 flex justify-around items-center px-4 py-2.5 bg-white shadow-[0px_-4px_12px_rgba(139,0,0,0.08)] rounded-t-2xl border-t border-red-50 max-w-xl mx-auto left-0 right-0">
        <button
          onClick={() => navigateTo('staff_dashboard')}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all ${
            activeScreen === 'staff_dashboard'
              ? 'bg-red-100 text-[#8b0000] font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <span className="material-symbols-outlined fill-1">home</span>
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => navigateTo('staff_orders')}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all ${
            activeScreen === 'staff_orders'
              ? 'bg-red-100 text-[#8b0000] font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="text-xs">Orders</span>
        </button>

        <button
          onClick={() => navigateTo('staff_complaints')}
          className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all ${
            activeScreen === 'staff_complaints'
              ? 'bg-red-100 text-[#8b0000] font-bold'
              : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <span className="material-symbols-outlined">notification_important</span>
          <span className="text-xs">Complaints</span>
        </button>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 w-full z-40 flex justify-around items-center px-2 py-2 bg-white shadow-[0px_-4px_12px_rgba(139,0,0,0.08)] rounded-t-2xl border-t border-red-50 max-w-xl mx-auto left-0 right-0">
      {/* Home */}
      <button
        onClick={() => navigateTo('citizen_dashboard')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all ${
          activeScreen === 'citizen_dashboard'
            ? 'bg-red-100 text-[#8b0000] font-bold'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <span className="material-symbols-outlined fill-1">home</span>
        <span className="text-[11px] font-medium">Home</span>
      </button>

      {/* Services */}
      <button
        onClick={() => navigateTo('citizen_services')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all ${
          activeScreen === 'citizen_services'
            ? 'bg-red-100 text-[#8b0000] font-bold'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <span className="material-symbols-outlined">grid_view</span>
        <span className="text-[11px] font-medium">Services</span>
      </button>

      {/* Status / History */}
      <button
        onClick={() => navigateTo('booking_history')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all ${
          activeScreen === 'booking_history'
            ? 'bg-red-100 text-[#8b0000] font-bold'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <span className="material-symbols-outlined">quick_reference</span>
        <span className="text-[11px] font-medium">Status</span>
      </button>

      {/* Profile */}
      <button
        onClick={() => navigateTo('citizen_profile')}
        className={`flex flex-col items-center justify-center px-3 py-1 rounded-full transition-all ${
          activeScreen === 'citizen_profile'
            ? 'bg-red-100 text-[#8b0000] font-bold'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <span className="material-symbols-outlined">person</span>
        <span className="text-[11px] font-medium">Profile</span>
      </button>
    </nav>
  );
};
