import React, { useState } from 'react';
import { User, Member } from '../types';
import { Analytics } from './Analytics';
import { Members } from './Members';
import { AdminPanel } from './AdminPanel';
import { AiAssistant } from './AiAssistant';
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  Dumbbell, 
  MessageSquare,
  Menu,
  BarChart3,
  Utensils,
  CreditCard,
  UserCheck,
  Bell,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

type Tab = 'analytics' | 'members' | 'trainers' | 'diets' | 'finance' | 'ai-assistant';
type NotificationType = 'success' | 'error' | 'info';

// Mock Data with Risks and Payment issues for demo
const initialMembers: Member[] = [
  { id: '1', fullName: 'Sarah Connor', email: 'sarah@example.com', joinDate: '2023-01-15', status: 'Active', plan: 'VIP', bmi: 22.4, attendanceRate: 85, fitnessGoals: 'Build muscle', riskLevel: 'Low', paymentDue: false },
  { id: '2', fullName: 'John Wick', email: 'john@example.com', joinDate: '2023-03-22', status: 'Active', plan: 'Premium', bmi: 24.1, attendanceRate: 92, fitnessGoals: 'Mobility', riskLevel: 'Low', paymentDue: false },
  { id: '3', fullName: 'Bruce Wayne', email: 'bruce@wayne.corp', joinDate: '2023-05-10', status: 'Inactive', plan: 'VIP', bmi: 26.5, attendanceRate: 12, fitnessGoals: 'Strength', riskLevel: 'High', paymentDue: true },
  { id: '4', fullName: 'Peter Parker', email: 'spidey@web.net', joinDate: '2023-06-01', status: 'Active', plan: 'Basic', bmi: 19.8, attendanceRate: 35, fitnessGoals: 'Agility', riskLevel: 'Medium', paymentDue: false },
  { id: '5', fullName: 'Diana Prince', email: 'diana@amazon.com', joinDate: '2023-02-14', status: 'Active', plan: 'VIP', bmi: 21.5, attendanceRate: 98, fitnessGoals: 'Powerlifting', riskLevel: 'Low', paymentDue: false },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [notification, setNotification] = useState<{msg: string, type: NotificationType} | null>(null);

  const notify = (msg: string, type: NotificationType = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateMembers = (newMembers: Member[]) => {
    setMembers(newMembers);
  };

  // Automated Alert Logic
  const highRiskMembers = members.filter(m => m.riskLevel === 'High').length;
  const paymentOverdueMembers = members.filter(m => m.paymentDue).length;
  const totalAlerts = highRiskMembers + paymentOverdueMembers;

  const navItems = [
    { id: 'analytics', label: 'Analytics Dashboard', icon: LayoutDashboard },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'trainers', label: 'Trainers', icon: UserCheck },
    { id: 'diets', label: 'Diet & Workout', icon: Utensils },
    { id: 'finance', label: 'Payments', icon: CreditCard },
    { id: 'ai-assistant', label: 'AI Assistant', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in text-white font-medium transform transition-all hover:scale-105 ${
          notification.type === 'success' ? 'bg-green-600' : notification.type === 'error' ? 'bg-red-500' : 'bg-blue-600'
        }`}>
          {notification.type === 'success' && <CheckCircle size={20} />}
          {notification.type === 'error' && <AlertCircle size={20} />}
          {notification.type === 'info' && <Info size={20} />}
          {notification.msg}
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Dumbbell size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Fitness Pro</span>
          </div>

          <div className="px-6 py-4">
             <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Admin Tools</p>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center shadow-md">
                <span className="font-bold text-sm">AD</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">Administrator</p>
                <p className="text-xs text-slate-400 truncate">System Access</p>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors text-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 shadow-sm">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg mr-2"
            >
              <Menu size={24} />
            </button>
            
            <h1 className="text-xl font-bold text-gray-800 capitalize flex items-center gap-2">
              {activeTab === 'analytics' && <BarChart3 size={20} className="text-blue-600"/>}
              {activeTab === 'members' && <Users size={20} className="text-blue-600"/>}
              {activeTab === 'trainers' && <UserCheck size={20} className="text-blue-600"/>}
              {activeTab === 'diets' && <Utensils size={20} className="text-blue-600"/>}
              {activeTab === 'finance' && <CreditCard size={20} className="text-blue-600"/>}
              {activeTab === 'ai-assistant' && <MessageSquare size={20} className="text-blue-600"/>}
              {activeTab === 'analytics' ? 'Analytics Dashboard' : activeTab.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-4">
             {/* Automation Alerts Dropdown */}
             <div className="relative">
                <button 
                  onClick={() => setShowAlerts(!showAlerts)}
                  className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Bell size={20} />
                  {totalAlerts > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </button>
                
                {showAlerts && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-800">System Notifications</h3>
                    </div>
                    <div className="p-2 max-h-64 overflow-y-auto">
                      {totalAlerts === 0 ? (
                        <p className="text-center text-gray-400 py-4 text-sm">No new alerts</p>
                      ) : (
                        <>
                          {paymentOverdueMembers > 0 && (
                            <div className="p-3 mb-2 bg-red-50 rounded-lg border border-red-100">
                              <p className="text-sm font-semibold text-red-800">⚠️ Payment Overdue</p>
                              <p className="text-xs text-red-600 mt-1">{paymentOverdueMembers} members have missed payments.</p>
                            </div>
                          )}
                          {highRiskMembers > 0 && (
                            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                              <p className="text-sm font-semibold text-yellow-800">📉 Churn Risk Alert</p>
                              <p className="text-xs text-yellow-600 mt-1">{highRiskMembers} members identified as high risk.</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
             </div>

             <div className="text-right hidden sm:block">
               <p className="text-sm font-medium text-gray-900">Today</p>
               <p className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === 'analytics' && <Analytics notify={notify} />}
            {activeTab === 'members' && (
              <Members 
                members={members} 
                setMembers={handleUpdateMembers} 
                notify={notify}
              />
            )}
            {activeTab === 'trainers' && <AdminPanel section="trainers" notify={notify} />}
            {activeTab === 'diets' && <AdminPanel section="diets" notify={notify} />}
            {activeTab === 'finance' && <AdminPanel section="finance" notify={notify} />}
            {activeTab === 'ai-assistant' && <AiAssistant />}
          </div>
        </div>
      </main>
    </div>
  );
};
