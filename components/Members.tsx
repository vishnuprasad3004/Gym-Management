import React, { useState } from 'react';
import { Member } from '../types';
import { Search, Plus, Sparkles, X, AlertCircle, AlertTriangle, Trash2, Edit, Save } from 'lucide-react';
import { generateWorkoutPlan } from '../services/geminiService';

interface MembersProps {
  members: Member[];
  setMembers: (members: Member[]) => void;
  notify: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export const Members: React.FC<MembersProps> = ({ members, setMembers, notify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  
  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Member>>({
    fullName: '',
    email: '',
    plan: 'Basic',
    status: 'Active'
  });

  const filteredMembers = members.filter(m => 
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGeneratePlan = async (member: Member) => {
    setSelectedMember(member);
    setIsGenerating(true);
    setGeneratedPlan(null);
    
    const profile = `Name: ${member.fullName}, Plan: ${member.plan}, Goals: ${member.fitnessGoals || 'General Fitness, Weight Loss'}, BMI: ${member.bmi || 'Not tracked'}`;
    const plan = await generateWorkoutPlan(profile);
    setGeneratedPlan(plan);
    setIsGenerating(false);
  };

  const handleSavePlan = () => {
    if (selectedMember && generatedPlan) {
      const updatedMembers = members.map(m => 
        m.id === selectedMember.id ? { ...m, aiWorkoutPlan: generatedPlan } : m
      );
      setMembers(updatedMembers);
      notify(`Workout plan saved for ${selectedMember.fullName}`, 'success');
      setSelectedMember(null);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ fullName: '', email: '', plan: 'Basic', status: 'Active' });
    setShowModal(true);
  };

  const openEditModal = (member: Member) => {
    setIsEditing(true);
    setFormData(member);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && formData.id) {
      const updatedMembers = members.map(m => 
        m.id === formData.id ? { ...m, ...formData } as Member : m
      );
      setMembers(updatedMembers);
      notify('Member updated successfully', 'success');
    } else {
      const newMember: Member = {
        id: Math.random().toString(36).substr(2, 9),
        fullName: formData.fullName!,
        email: formData.email!,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Active',
        plan: formData.plan as any,
        fitnessGoals: 'Get fit', 
        attendanceRate: 100,
        riskLevel: 'Low',
        paymentDue: false,
        bmi: 24,
        ...formData
      };
      setMembers([newMember, ...members]);
      notify('New member added successfully', 'success');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      const updatedMembers = members.filter(m => m.id !== id);
      setMembers(updatedMembers);
      notify('Member removed from directory', 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Member Directory</h2>
           <p className="text-gray-500 text-sm mt-1">Manage profiles, track risk, and assign AI plans.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/10"
        >
          <Plus size={20} />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Member Info</th>
                <th className="p-4">Plan & Status</th>
                <th className="p-4">Attendance</th>
                <th className="p-4">Risk Level</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map(member => (
                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                          {member.fullName.charAt(0)}
                       </div>
                       <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {member.fullName}
                          {member.paymentDue && (
                            <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded border border-red-200 font-bold">
                              PAYMENT DUE
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className={`w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        member.plan === 'VIP' ? 'bg-purple-100 text-purple-700' :
                        member.plan === 'Premium' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {member.plan}
                      </span>
                      <span className="text-xs text-gray-500">Joined: {member.joinDate}</span>
                    </div>
                  </td>
                  <td className="p-4">
                     <div className="flex items-center gap-2">
                       <div className="w-16 bg-gray-200 rounded-full h-1.5">
                         <div 
                            className={`h-1.5 rounded-full ${member.attendanceRate > 70 ? 'bg-green-500' : member.attendanceRate > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{width: `${member.attendanceRate}%`}}
                         ></div>
                       </div>
                       <span className="text-xs font-medium text-gray-600">{member.attendanceRate}%</span>
                     </div>
                  </td>
                  <td className="p-4">
                     {member.riskLevel === 'High' ? (
                        <div className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-lg border border-red-100 w-fit">
                           <AlertCircle size={14} /> At Risk
                        </div>
                     ) : member.riskLevel === 'Medium' ? (
                        <div className="flex items-center gap-1 text-yellow-600 text-xs font-bold bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100 w-fit">
                           <AlertTriangle size={14} /> Monitor
                        </div>
                     ) : (
                        <span className="text-xs text-green-600 font-medium px-2 py-1">Stable</span>
                     )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleGeneratePlan(member)}
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                        title="Generate AI Workout"
                      >
                        <Sparkles size={18} />
                      </button>
                      <button 
                        onClick={() => openEditModal(member)}
                        className="text-gray-400 hover:bg-gray-100 hover:text-gray-600 p-2 rounded-lg transition-colors"
                        title="Edit Profile"
                      >
                         <Edit size={18} />
                      </button>
                       <button 
                        onClick={() => handleDelete(member.id)}
                        className="text-gray-400 hover:bg-red-50 hover:text-red-600 p-2 rounded-lg transition-colors"
                        title="Delete Member"
                      >
                         <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="text-purple-600" />
                AI Workout Plan for {selectedMember.fullName}
              </h3>
              <button onClick={() => setSelectedMember(null)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500 animate-pulse">Analyzing BMI & Goals...</p>
                </div>
              ) : (
                <div className="prose prose-blue max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {generatedPlan}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-2">
               <button 
                onClick={handleSavePlan} 
                disabled={!generatedPlan}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={18} />
                Save Plan to Profile
              </button>
              <button 
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Member Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{isEditing ? 'Edit Member' : 'Add New Member'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membership Plan</label>
                <select 
                  value={formData.plan}
                  onChange={e => setFormData({...formData, plan: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg mt-4 shadow-lg shadow-blue-900/10"
              >
                {isEditing ? 'Update Member' : 'Create Member'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
