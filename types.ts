export interface Member {
  id: string;
  fullName: string;
  email: string;
  joinDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  plan: 'Basic' | 'Premium' | 'VIP';
  bmi?: number;
  attendanceRate: number; // percentage
  lastCheckIn?: string;
  fitnessGoals?: string;
  aiWorkoutPlan?: string;
  riskLevel: 'Low' | 'Medium' | 'High'; // Churn risk
  paymentDue: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  specialization: string;
  activeClients: number;
  rating: number;
}

export interface Transaction {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  status: 'Completed' | 'Pending' | 'Failed';
  plan: string;
}

export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  monthlyRevenue: number;
  retentionRate: number;
  todaysCheckIns: number;
}

export interface AnalyticsFilter {
  dateRange: '7d' | '30d' | '90d' | '1y';
  plan: 'All' | 'Basic' | 'Premium' | 'VIP';
}

export enum ViewState {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
