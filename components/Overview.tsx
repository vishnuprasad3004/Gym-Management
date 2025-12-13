import React from 'react';
import { DashboardStats } from '../types';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface OverviewProps {
  stats: DashboardStats;
}

const data = [
  { name: 'Jan', revenue: 4000, newMembers: 24 },
  { name: 'Feb', revenue: 3000, newMembers: 13 },
  { name: 'Mar', revenue: 2000, newMembers: 98 },
  { name: 'Apr', revenue: 2780, newMembers: 39 },
  { name: 'May', revenue: 1890, newMembers: 48 },
  { name: 'Jun', revenue: 2390, newMembers: 38 },
  { name: 'Jul', revenue: 3490, newMembers: 43 },
];

export const Overview: React.FC<OverviewProps> = ({ stats }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Members</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalMembers}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Users size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">${stats.monthlyRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>+8% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Members</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeMembers}</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Activity size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>86% retention rate</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Check-ins</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.todaysCheckIns}</h3>
            </div>
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <Activity size={24} />
            </div>
          </div>
           <div className="mt-4 flex items-center text-sm text-gray-500">
            <span>Peak time: 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Membership Growth</h3>
           <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="newMembers" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
