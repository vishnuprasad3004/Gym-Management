import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area,
  ComposedChart
} from 'recharts';
import { Download, TrendingUp, Users, Activity, CreditCard, Filter, BarChart as BarChartIcon, Zap, Calendar } from 'lucide-react';
import { AnalyticsFilter } from '../types';

interface AnalyticsProps {
    notify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

// --- Mock Data ---

const revenueForecastData = [
  { month: 'Jan', revenue: 12000, forecast: 12000 },
  { month: 'Feb', revenue: 19000, forecast: 19000 },
  { month: 'Mar', revenue: 15000, forecast: 15000 },
  { month: 'Apr', revenue: 22000, forecast: 22000 },
  { month: 'May', revenue: 28000, forecast: 28000 },
  { month: 'Jun', revenue: 32000, forecast: 32000 },
  { month: 'Jul', revenue: null, forecast: 35000 }, // Forecast only
  { month: 'Aug', revenue: null, forecast: 38500 },
  { month: 'Sep', revenue: null, forecast: 42000 },
];

const peakHoursData = [
  { hour: '6am', visitors: 45 },
  { hour: '8am', visitors: 85 },
  { hour: '10am', visitors: 60 },
  { hour: '12pm', visitors: 75 },
  { hour: '2pm', visitors: 50 },
  { hour: '4pm', visitors: 90 },
  { hour: '6pm', visitors: 120 },
  { hour: '8pm', visitors: 80 },
  { hour: '10pm', visitors: 30 },
];

const retentionData = [
  { month: 'Jan', joined: 45, churned: 5 },
  { month: 'Feb', joined: 50, churned: 8 },
  { month: 'Mar', joined: 65, churned: 6 },
  { month: 'Apr', joined: 55, churned: 12 }, // Slight increase in churn
  { month: 'May', joined: 70, churned: 7 },
  { month: 'Jun', joined: 80, churned: 5 },
];

const planDistribution = [
  { name: 'Basic', value: 400 },
  { name: 'Premium', value: 300 },
  { name: 'VIP', value: 150 },
];

const COLORS = ['#94a3b8', '#3b82f6', '#4f46e5'];

export const Analytics: React.FC<AnalyticsProps> = ({ notify }) => {
  const [mode, setMode] = useState<'native' | 'powerbi'>('native');
  const [filter, setFilter] = useState<AnalyticsFilter>({ dateRange: '1y', plan: 'All' });

  const handleExport = () => {
    // Simulate CSV export
    const headers = "Month,Revenue,Forecast\n";
    const rows = revenueForecastData.map(d => `${d.month},${d.revenue || 0},${d.forecast}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fitness_pro_analytics_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    notify('Report exported successfully', 'success');
  };

  if (mode === 'powerbi') {
    return (
      <div className="space-y-6 animate-fade-in h-[calc(100vh-140px)]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BarChartIcon className="text-yellow-600" />
            Power BI Integration
          </h2>
          <button 
            onClick={() => setMode('native')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 underline"
          >
            Switch to Native View
          </button>
        </div>
        
        {/* Power BI Embed Simulation Container */}
        <div className="w-full h-full bg-gray-100 rounded-xl border border-gray-200 relative overflow-hidden flex flex-col items-center justify-center group">
          <div className="absolute inset-0 bg-white opacity-90 z-0"></div>
          {/* Decorative Grid */}
          <div className="absolute inset-0 z-0 opacity-10" style={{backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
          
          <div className="z-10 text-center p-8 max-w-md bg-white shadow-2xl rounded-2xl border border-gray-100">
             <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChartIcon size={32} />
             </div>
             <h3 className="text-xl font-bold text-gray-900 mb-2">Connect Your Data</h3>
             <p className="text-gray-500 mb-6">
               Embed your live Power BI dashboards here for deep-dive analysis, interactive filtering, and organization-wide sharing.
             </p>
             <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
               Connect Power BI Service
             </button>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded text-xs font-mono text-gray-400 border border-gray-200">
            {'<iframe src="https://app.powerbi.com/reportEmbed..." />'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900">Performance Overview</h2>
          <div className="hidden md:flex bg-gray-100 rounded-lg p-1">
             <button 
                onClick={() => {
                    setFilter({...filter, dateRange: '30d'});
                    notify('Filtered to 30 days', 'info');
                }}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${filter.dateRange === '30d' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
             >30 Days</button>
             <button 
                onClick={() => {
                    setFilter({...filter, dateRange: '90d'});
                    notify('Filtered to 90 days', 'info');
                }}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${filter.dateRange === '90d' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
             >90 Days</button>
             <button 
                onClick={() => {
                    setFilter({...filter, dateRange: '1y'});
                    notify('Filtered to 1 Year', 'info');
                }}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${filter.dateRange === '1y' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
             >1 Year</button>
          </div>
        </div>
        
        <div className="flex gap-2">
           <button 
            onClick={() => setMode('powerbi')}
            className="text-gray-600 hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
          >
            <BarChartIcon size={16} className="text-yellow-600"/>
            Power BI View
          </button>
          <button 
            onClick={handleExport}
            className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium shadow-lg shadow-slate-900/10 active:scale-95 transition-transform"
          >
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 opacity-50"></div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider relative z-10">Revenue Forecast</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2 relative z-10">$128k <span className="text-sm font-normal text-gray-400">/ $145k</span></h3>
          <div className="mt-4 flex items-center text-sm text-green-600 font-medium relative z-10">
            <Zap size={14} className="mr-1 fill-green-600" />
            <span>On track to exceed target</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Churn Rate</p>
           <h3 className="text-2xl font-bold text-gray-900 mt-2">2.4%</h3>
           <div className="mt-4 flex items-center text-sm text-green-600 font-medium">
            <span>-0.5%</span>
            <span className="text-gray-400 ml-2 font-normal">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Member Life</p>
           <h3 className="text-2xl font-bold text-gray-900 mt-2">14 Months</h3>
           <div className="mt-4 flex items-center text-sm text-blue-600 font-medium">
            <span>Steady</span>
            <span className="text-gray-400 ml-2 font-normal">metric</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trainer Utilization</p>
           <h3 className="text-2xl font-bold text-gray-900 mt-2">85%</h3>
           <div className="mt-4 flex items-center text-sm text-orange-600 font-medium">
            <span>High Capacity</span>
          </div>
        </div>
      </div>

      {/* Forecasting Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Revenue Forecast (AI Powered)</h3>
          <p className="text-sm text-gray-500 mb-6">Historical data vs predicted growth based on current sign-up trends.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueForecastData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Actual Revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
                <Line type="monotone" dataKey="forecast" name="Projected" stroke="#94a3b8" strokeDasharray="5 5" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Hours Analysis */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Peak Gym Hours</h3>
          <p className="text-sm text-gray-500 mb-6">Average visitor count by hour.</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHoursData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="hour" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={40} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                <Bar dataKey="visitors" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Retention Analysis */}
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Member Retention & Churn</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                <Legend />
                <Bar dataKey="joined" name="New Members" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="churned" name="Churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Plan Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Plan Distribution</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
