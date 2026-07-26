import React from 'react';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack = true, onBack }) => {
  const { activeScreen, navigateTo, role, citizenUser, staffUser } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    // Default back navigation rules
    switch (activeScreen) {
      case 'citizen_login':
      case 'staff_login':
        navigateTo('portal_selection');
        break;
      case 'citizen_register':
        navigateTo('citizen_login');
        break;
      case 'staff_register':
        navigateTo('staff_login');
        break;
      case 'home_delivery_order':
      case 'visit_booking':
      case 'grievance_redressal':
      case 'booking_history':
      case 'citizen_services':
      case 'citizen_profile':
        navigateTo('citizen_dashboard');
        break;
      case 'staff_orders':
      case 'staff_complaints':
        navigateTo('staff_dashboard');
        break;
      case 'citizen_dashboard':
      case 'staff_dashboard':
        navigateTo('portal_selection');
        break;
      default:
        navigateTo('portal_selection');
    }
  };

  if (activeScreen === 'portal_selection') {
    return (
      <header className="bg-[#8b0000] py-6 shadow-md" data-purpose="page-header">
        <h1 className="text-white text-3xl font-bold text-center tracking-wide">
          Smart PDS System
        </h1>
      </header>
    );
  }

  // Titles for screens if not provided
  const getScreenTitle = () => {
    if (title) return title;
    switch (activeScreen) {
      case 'citizen_login':
        return 'Smart PDS';
      case 'citizen_register':
        return 'New Citizen Registration';
      case 'staff_login':
        return 'Staff Login';
      case 'staff_register':
        return 'Staff Registration';
      case 'citizen_dashboard':
        return 'Smart PDS';
      case 'home_delivery_order':
        return 'Smart PDS';
      case 'visit_booking':
        return 'Smart PDS';
      case 'booking_history':
        return 'Smart PDS';
      case 'grievance_redressal':
        return 'Smart PDS';
      case 'staff_dashboard':
        return 'Smart PDS';
      case 'staff_orders':
        return 'Local Orders';
      case 'staff_complaints':
        return 'Local Complaints';
      case 'citizen_services':
        return 'PDS Services';
      case 'citizen_profile':
        return 'Citizen Profile';
      default:
        return 'Smart PDS';
    }
  };

  const avatar = role === 'citizen' ? citizenUser?.avatarUrl : staffUser?.avatarUrl;

  return (
    <header className="fixed top-0 w-full z-40 flex items-center justify-between px-5 h-16 bg-[#a00000] shadow-md text-white">
      <div className="flex items-center gap-3 max-w-xl mx-auto w-full justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={handleBack}
              className="p-1 -ml-1 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center active:scale-95"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-white text-2xl">arrow_back</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            {(activeScreen === 'citizen_login' || activeScreen === 'staff_login' || activeScreen === 'staff_register') && (
              <span className="material-symbols-outlined text-white text-2xl">account_balance</span>
            )}
            <h1 className="font-semibold text-xl tracking-tight text-white">{getScreenTitle()}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {(activeScreen === 'citizen_dashboard' || activeScreen === 'booking_history') && (
            <button className="text-white/90 hover:text-white active:scale-95 transition-transform">
              <span className="material-symbols-outlined">notifications</span>
            </button>
          )}

          {avatar && (
            <div 
              onClick={() => navigateTo(role === 'citizen' ? 'citizen_profile' : 'staff_dashboard')}
              className="w-8 h-8 rounded-full border border-white/40 overflow-hidden bg-white/20 cursor-pointer flex items-center justify-center"
            >
              <img 
                src={avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback icon if image network restricted
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="material-symbols-outlined text-white text-sm">person</span>
            </div>
          )}

          {!avatar && (activeScreen === 'staff_login' || activeScreen === 'staff_dashboard') && (
            <span className="material-symbols-outlined text-white/80">account_balance</span>
          )}
        </div>
      </div>
    </header>
  );
};
