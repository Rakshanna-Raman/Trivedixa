import React, { createContext, useContext, useState } from 'react';
import { 
  Role, 
  CitizenUser, 
  StaffUser, 
  Booking, 
  Complaint, 
  Screen, 
  ShopArea, 
  CardType,
  ComplaintCategory 
} from '../types';
import { 
  INITIAL_CITIZEN, 
  INITIAL_STAFF, 
  INITIAL_BOOKINGS, 
  INITIAL_COMPLAINTS 
} from '../mockData';

interface AppContextType {
  role: Role;
  citizenUser: CitizenUser | null;
  staffUser: StaffUser | null;
  activeScreen: Screen;
  bookings: Booking[];
  complaints: Complaint[];
  selectedOtpBooking: Booking | null;
  
  // Navigation & Auth
  navigateTo: (screen: Screen) => void;
  loginCitizen: (idNumber: string) => boolean;
  registerCitizen: (data: { fullName: string; mobileNumber: string; cardType: CardType; shopArea: ShopArea }) => void;
  loginStaff: (staffId: string) => boolean;
  registerStaff: (data: { fullName: string; employeeId: string; mobileNumber: string; shopArea: ShopArea }) => void;
  logout: () => void;

  // Actions
  placeHomeDeliveryOrder: (slot: string) => Booking;
  bookVisit: (date: string, timeSlot: string) => Booking;
  submitComplaint: (category: ComplaintCategory, description: string, evidenceUrl?: string) => Complaint;
  resolveComplaint: (complaintId: string, resolutionNote?: string) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  openOtpModal: (booking: Booking) => void;
  closeOtpModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>(null);
  const [citizenUser, setCitizenUser] = useState<CitizenUser | null>(INITIAL_CITIZEN);
  const [staffUser, setStaffUser] = useState<StaffUser | null>(INITIAL_STAFF);
  const [activeScreen, setActiveScreen] = useState<Screen>('portal_selection');
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [selectedOtpBooking, setSelectedOtpBooking] = useState<Booking | null>(null);

  const navigateTo = (screen: Screen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginCitizen = (idNumber: string) => {
    // Standard simulation
    setRole('citizen');
    if (!citizenUser) {
      setCitizenUser({
        ...INITIAL_CITIZEN,
        rationCardNumber: idNumber || INITIAL_CITIZEN.rationCardNumber
      });
    }
    navigateTo('citizen_dashboard');
    return true;
  };

  const registerCitizen = (data: { fullName: string; mobileNumber: string; cardType: CardType; shopArea: ShopArea }) => {
    const newCitizen: CitizenUser = {
      id: `cit-${Date.now().toString().slice(-4)}`,
      fullName: data.fullName,
      rationCardNumber: Math.floor(100000000 + Math.random() * 900000000).toString(),
      mobileNumber: data.mobileNumber,
      cardType: data.cardType,
      shopArea: data.shopArea,
      avatarUrl: INITIAL_CITIZEN.avatarUrl,
      quotaUsed: false
    };
    setCitizenUser(newCitizen);
    setRole('citizen');
    navigateTo('citizen_dashboard');
  };

  const loginStaff = (staffId: string) => {
    setRole('staff');
    if (!staffUser) {
      setStaffUser({
        ...INITIAL_STAFF,
        employeeId: staffId || INITIAL_STAFF.employeeId
      });
    }
    navigateTo('staff_dashboard');
    return true;
  };

  const registerStaff = (data: { fullName: string; employeeId: string; mobileNumber: string; shopArea: ShopArea }) => {
    const newStaff: StaffUser = {
      id: `stf-${Date.now().toString().slice(-4)}`,
      fullName: data.fullName,
      employeeId: data.employeeId || `EMP-${Math.floor(10000 + Math.random() * 90000)}`,
      mobileNumber: data.mobileNumber,
      shopArea: data.shopArea,
      avatarUrl: INITIAL_STAFF.avatarUrl
    };
    setStaffUser(newStaff);
    setRole('staff');
    navigateTo('staff_dashboard');
  };

  const logout = () => {
    setRole(null);
    navigateTo('portal_selection');
  };

  const placeHomeDeliveryOrder = (slot: string): Booking => {
    const refNum = `#PDS-${Math.floor(10000 + Math.random() * 90000)}`;
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      referenceId: refNum,
      citizenId: citizenUser?.id || 'cit-101',
      citizenName: citizenUser?.fullName || 'Rakshanna',
      type: 'home_delivery',
      status: 'SCHEDULED',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      timeSlot: slot,
      fpsCenter: citizenUser?.shopArea || 'Velachery Shop #04',
      amount: 0,
      otp: otpCode,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    if (citizenUser) {
      setCitizenUser({ ...citizenUser, quotaUsed: true });
    }
    return newBooking;
  };

  const bookVisit = (date: string, timeSlot: string): Booking => {
    const refNum = `#PDS-${Math.floor(10000 + Math.random() * 90000)}`;
    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    const newBooking: Booking = {
      id: `b-${Date.now()}`,
      referenceId: refNum,
      citizenId: citizenUser?.id || 'cit-101',
      citizenName: citizenUser?.fullName || 'Rakshanna',
      type: 'in_person',
      status: 'SCHEDULED',
      date,
      timeSlot,
      fpsCenter: citizenUser?.shopArea || 'Velachery Shop #04',
      amount: 0,
      otp: otpCode,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const getCategoryLabel = (cat: ComplaintCategory): string => {
    const map: Record<ComplaintCategory, string> = {
      quality: 'Quality Issue (Food Grains)',
      delivery: 'Delayed Delivery',
      behavior: 'Staff Behavior',
      overcharging: 'Overcharging / Weights',
      card_issue: 'Ration Card Processing',
      fps_closed: 'FPS Shop Closed during hours'
    };
    return map[cat] || 'General Issue';
  };

  const submitComplaint = (category: ComplaintCategory, description: string, evidenceUrl?: string): Complaint => {
    const trackingId = `PDS-2023-${Math.floor(10000 + Math.random() * 90000)}`;
    const newComplaint: Complaint = {
      id: `c-${Date.now()}`,
      trackingId,
      citizenId: citizenUser?.id || 'cit-101',
      citizenName: citizenUser?.fullName || 'Rakshanna',
      shopArea: citizenUser?.shopArea || 'Velachery 04',
      category,
      categoryLabel: getCategoryLabel(category),
      description,
      evidenceUrl,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    setComplaints(prev => [newComplaint, ...prev]);
    return newComplaint;
  };

  const resolveComplaint = (complaintId: string, resolutionNote?: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        return {
          ...c,
          status: 'RESOLVED',
          resolutionNote: resolutionNote || 'Resolved by department staff after physical verification.'
        };
      }
      return c;
    }));
  };

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status };
      }
      return b;
    }));
  };

  const openOtpModal = (booking: Booking) => {
    setSelectedOtpBooking(booking);
  };

  const closeOtpModal = () => {
    setSelectedOtpBooking(null);
  };

  return (
    <AppContext.Provider
      value={{
        role,
        citizenUser,
        staffUser,
        activeScreen,
        bookings,
        complaints,
        selectedOtpBooking,
        navigateTo,
        loginCitizen,
        registerCitizen,
        loginStaff,
        registerStaff,
        logout,
        placeHomeDeliveryOrder,
        bookVisit,
        submitComplaint,
        resolveComplaint,
        updateBookingStatus,
        openOtpModal,
        closeOtpModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
