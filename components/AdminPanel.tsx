import React, { useState } from 'react';
import { Trainer, Transaction } from '../types';
import { UserCheck, Utensils, CreditCard, Search, Edit2, Trash2, Plus, BellRing, Save } from 'lucide-react';

interface AdminPanelProps {
  section: 'trainers' | 'diets' | 'finance';
  notify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

// Initial Mock Data moved outside for reset consistency if needed, but managing in state now
const initialTrainers: Trainer[] = [
  { id: '1', name: 'Mike Tyson', specialization: 'Boxing & Strength', activeClients: 12, rating: 4.9 },
  { id: '2', name: 'Ronda Rousey', specialization: 'MMA & Cardio', activeClients: 18, rating: 4.8 },
  { id: '3', name: 'Arnold S.', specialization: 'Bodybuilding', activeClients: 25, rating: 5.0 },
];

const initialTransactions: Transaction[] = [
  { id: 't1', memberId: 'm1', memberName: 'Sarah Connor', amount: 99.00, date: '2023-10-01', status: 'Completed', plan: 'Premium' },
  { id: 't2', memberId: 'm2', memberName: 'John Wick', amount: 199.00, date: '2023-10-02', status: 'Completed', plan: 'VIP' },
  { id: 't3', memberId: 'm3', memberName: 'Peter Parker', amount: 49.00, date: '2023-10-05', status: 'Failed', plan: 'Basic' },
  { id: 't4', memberId: 'm4', memberName: 'Diana Prince', amount: 199.00, date: '2023-10-06', status: 'Completed', plan: 'VIP' },
  { id: 't5', memberId: 'm3', memberName: 'Peter Parker', amount: 49.00, date: '2023-11-05', status: 'Pending', plan: 'Basic' },
];

export const AdminPanel: React.FC<AdminPanelProps> = ({ section, notify }) => {
  const [trainers, setTrainers] = useState<Trainer[]>(initialTrainers);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [transactionFilter, setTransactionFilter] = useState('');

  const handleAddTrainer = () => {
    // Simulating adding a trainer for the button action
    const names = ['Dwayne Johnson', 'Chris Hemsworth', 'Serena Williams', 'Usain Bolt'];
    const specs = ['Powerlifting', 'HIIT', 'Tennis & Agility', 'Sprinting'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    
    const newTrainer: Trainer = {
      id: Date.now().toString(),
      name: randomName,
      specialization: specs[Math.floor(Math.random() * specs.length)],
      activeClients: 0,
      rating: 5.0
    };
    
    setTrainers([...trainers, newTrainer]);
    notify(`${randomName} added to trainer roster!`, 'success');
  };

  const handleAssignTrainer = (name: string) => {
    notify(`Assigned 3 new clients to ${name}`, 'success');
  };

  const handleViewProfile = (name: string) => {
    notify(`Viewing profile for ${name}`, 'info');
  };

  const handleCreateDietPlan = () => {
    notify('New "Paleo Performance" plan created!', 'success');
  };

  const handleEditPlan = (planName: string) => {
    notify(`Editing ${planName} template`, 'info');
  };

  const handleSendReminder = (id: string, name: string) => {
    notify(`Payment reminder sent to ${name}`, 'success');
    // Optimistic update
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, status: 'Pending' } : t));
  };

  const handleGenerateInvoice = () => {
    notify('Monthly invoices generated and emailed!', 'success');
  };

  const handleFilterFinance = () => {
    setTransactionFilter(prev => prev === '' ? 'Pending' : '');
    notify(transactionFilter === '' ? 'Showing Pending/Failed only' : 'Showing all transactions', 'info');
  };

  if (section === 'trainers') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Trainer Management</h2>
          <button 
            onClick={handleAddTrainer}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-900/10 active:scale-95 transition-transform"
          >
            <Plus size={18} /> Add Trainer
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map(trainer => (
            <div key={trainer.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <UserCheck size={32} />
              </div>
              <h3 className="font-bold text-lg text-gray-900">{trainer.name}</h3>
              <p className="text-sm text-blue-600 font-medium mb-4">{trainer.specialization}</p>
              
              <div className="flex justify-center gap-6 w-full border-t border-gray-50 pt-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400">Clients</p>
                  <p className="font-bold text-gray-800">{trainer.activeClients}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Rating</p>
                  <p className="font-bold text-gray-800">⭐ {trainer.rating}</p>
                </div>
              </div>
              
              <div className="flex gap-2 w-full">
                <button 
                  onClick={() => handleViewProfile(trainer.name)}
                  className="flex-1 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Profile
                </button>
                <button 
                  onClick={() => handleAssignTrainer(trainer.name)}
                  className="flex-1 py-2 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'diets') {
    return (
      <div className="space-y-6 animate-fade-in">
         <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Diet & Workout Plans</h2>
          <button 
            onClick={handleCreateDietPlan}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 shadow-lg shadow-green-900/10 active:scale-95 transition-transform"
          >
            <Plus size={18} /> Create Plan
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-8 text-center">
           <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils size={32} className="text-green-600" />
           </div>
           <h3 className="text-xl font-bold text-gray-900">Nutrition Database</h3>
           <p className="text-gray-500 mb-6 max-w-md mx-auto">Manage standardized meal plans (Keto, Vegan, Bulking) and assign them to member cohorts.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {['Weight Loss - Keto', 'Muscle Gain - High Protein', 'Endurance - Carbs'].map((plan, i) => (
                <button 
                  key={i} 
                  onClick={() => handleEditPlan(plan)}
                  className="border border-gray-200 p-4 rounded-lg text-left hover:border-green-500 cursor-pointer transition-all hover:shadow-md group w-full"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700 group-hover:text-green-700">{plan}</span>
                    <Edit2 size={16} className="text-gray-300 group-hover:text-green-500" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{(i + 1) * 45} active members</p>
                </button>
              ))}
           </div>
        </div>
      </div>
    );
  }

  // Finance Section with Automation
  const filteredTransactions = transactions.filter(t => {
     if (transactionFilter === 'Pending') return t.status === 'Pending' || t.status === 'Failed';
     return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Financial Records</h2>
          <div className="flex gap-2">
             <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm border border-red-100 mr-2">
                <BellRing size={16} />
                <span className="font-semibold">2 Payments Overdue</span>
             </div>
            <button 
              onClick={handleFilterFinance}
              className={`px-4 py-2 border rounded-lg transition-colors ${transactionFilter ? 'bg-blue-50 border-blue-200 text-blue-700' : 'text-gray-600 border-gray-200 hover:bg-gray-50'}`}
            >
              {transactionFilter ? 'Clear Filter' : 'Filter Issues'}
            </button>
            <button 
              onClick={handleGenerateInvoice}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 shadow-lg shadow-slate-900/10 active:scale-95 transition-transform"
            >
               Generate Invoice
            </button>
          </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex gap-4">
           <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search transaction ID or member..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider font-semibold">
              <th className="p-4">Date</th>
              <th className="p-4">Member</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {filteredTransactions.map(t => (
              <tr key={t.id} className={`hover:bg-gray-50 ${t.status === 'Failed' || t.status === 'Pending' ? 'bg-red-50/30' : ''}`}>
                <td className="p-4 text-gray-500">{t.date}</td>
                <td className="p-4 font-medium text-gray-900">{t.memberName}</td>
                <td className="p-4 text-gray-600">{t.plan}</td>
                <td className="p-4 font-bold text-gray-900">${t.amount.toFixed(2)}</td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    t.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    t.status === 'Failed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                   {t.status !== 'Completed' ? (
                      <button 
                        onClick={() => handleSendReminder(t.id, t.memberName)}
                        className="text-red-600 hover:text-red-800 text-xs font-bold mr-3 uppercase tracking-wide hover:underline"
                      >
                        Send Reminder
                      </button>
                   ) : null}
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
