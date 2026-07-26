import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OtpModal } from './components/OtpModal';

import { PortalSelectionView } from './views/PortalSelectionView';
import { CitizenLoginView } from './views/CitizenLoginView';
import { CitizenRegisterView } from './views/CitizenRegisterView';
import { StaffLoginView } from './views/StaffLoginView';
import { StaffRegisterView } from './views/StaffRegisterView';
import { CitizenDashboardView } from './views/CitizenDashboardView';
import { HomeDeliveryOrderView } from './views/HomeDeliveryOrderView';
import { VisitBookingView } from './views/VisitBookingView';
import { BookingHistoryView } from './views/BookingHistoryView';
import { GrievanceRedressalView } from './views/GrievanceRedressalView';
import { StaffDashboardView } from './views/StaffDashboardView';
import { StaffOrdersView } from './views/StaffOrdersView';
import { StaffComplaintsView } from './views/StaffComplaintsView';
import { CitizenServicesView } from './views/CitizenServicesView';
import { CitizenProfileView } from './views/CitizenProfileView';

const MainRouter: React.FC = () => {
  const { activeScreen } = useApp();

  const renderScreen = () => {
    switch (activeScreen) {
      case 'portal_selection':
        return <PortalSelectionView />;
      case 'citizen_login':
        return <CitizenLoginView />;
      case 'citizen_register':
        return <CitizenRegisterView />;
      case 'staff_login':
        return <StaffLoginView />;
      case 'staff_register':
        return <StaffRegisterView />;
      case 'citizen_dashboard':
        return <CitizenDashboardView />;
      case 'home_delivery_order':
        return <HomeDeliveryOrderView />;
      case 'visit_booking':
        return <VisitBookingView />;
      case 'booking_history':
        return <BookingHistoryView />;
      case 'grievance_redressal':
        return <GrievanceRedressalView />;
      case 'staff_dashboard':
        return <StaffDashboardView />;
      case 'staff_orders':
        return <StaffOrdersView />;
      case 'staff_complaints':
        return <StaffComplaintsView />;
      case 'citizen_services':
        return <CitizenServicesView />;
      case 'citizen_profile':
        return <CitizenProfileView />;
      default:
        return <PortalSelectionView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fff0f0] flex flex-col relative text-[#1b1c1c]">
      {activeScreen !== 'portal_selection' && <Header />}
      <div className="flex-1 w-full">{renderScreen()}</div>
      <BottomNav />
      <OtpModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainRouter />
    </AppProvider>
  );
}
