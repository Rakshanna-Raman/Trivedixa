export type Role = 'citizen' | 'staff' | null;

export type CardType = 'priority' | 'non-priority';

export type ShopArea = 
  | 'Adambakkam 01' 
  | 'Nanganallur 02' 
  | 'Pallavaram 03' 
  | 'Velachery 04';

export interface CitizenUser {
  id: string;
  fullName: string;
  rationCardNumber: string;
  mobileNumber: string;
  cardType: CardType;
  shopArea: ShopArea;
  avatarUrl?: string;
  quotaUsed: boolean;
}

export interface StaffUser {
  id: string;
  fullName: string;
  employeeId: string;
  mobileNumber: string;
  shopArea: ShopArea;
  avatarUrl?: string;
}

export type BookingType = 'home_delivery' | 'in_person';
export type BookingStatus = 'COMPLETED' | 'SCHEDULED' | 'CANCELLED' | 'PENDING';

export interface Booking {
  id: string;
  referenceId: string;
  citizenId: string;
  citizenName: string;
  type: BookingType;
  status: BookingStatus;
  date: string;
  timeSlot: string;
  fpsCenter: string;
  amount: number;
  otp?: string;
  reason?: string;
  createdAt: string;
}

export type ComplaintCategory = 
  | 'quality'
  | 'delivery'
  | 'behavior'
  | 'overcharging'
  | 'card_issue'
  | 'fps_closed';

export type ComplaintStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';

export interface Complaint {
  id: string;
  trackingId: string;
  citizenId: string;
  citizenName: string;
  shopArea: ShopArea;
  category: ComplaintCategory;
  categoryLabel: string;
  description: string;
  evidenceUrl?: string;
  status: ComplaintStatus;
  createdAt: string;
  resolutionNote?: string;
}

export type Screen = 
  | 'portal_selection'
  | 'citizen_login'
  | 'citizen_register'
  | 'staff_login'
  | 'staff_register'
  | 'citizen_dashboard'
  | 'home_delivery_order'
  | 'visit_booking'
  | 'booking_history'
  | 'grievance_redressal'
  | 'staff_dashboard'
  | 'staff_orders'
  | 'staff_complaints'
  | 'citizen_services'
  | 'citizen_profile';
