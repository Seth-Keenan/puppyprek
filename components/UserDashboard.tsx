
import React from 'react';
import { User } from '../types';

interface DashboardProps {
  user: User;
}

const UserDashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Sidebar */}
        <aside className="lg:w-1/3">
          <div className="glass-card rounded-3xl p-8 shadow-lg sticky top-24">
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md"
                />
                <button className="absolute bottom-0 right-0 bg-brand-600 text-white p-2 rounded-full shadow-lg hover:bg-brand-700 transition-transform hover:scale-110">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mt-4 capitalize">{user.name}</h2>
              <p className="text-gray-500 font-medium">{user.email}</p>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-gray-100">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Next Billing</span>
                  <span className="font-bold text-gray-900">{user.lastBillingDate ? 'June 1, 2024' : 'Not Set'}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Service Plan</span>
                  <span className="font-bold text-brand-600">{user.subscriptionPlan || 'No Active Plan'}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Training Credits</span>
                  <span className="font-bold text-gray-900">4 Remaining</span>
               </div>
            </div>

            <button className="w-full mt-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-100">
              Manage Billing
            </button>
            <button className="w-full mt-3 py-3 bg-gray-50 text-gray-600 rounded-xl font-bold hover:bg-gray-100 transition-all">
              Download Invoices
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:w-2/3 space-y-8">
          {/* Pack Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-display font-bold text-gray-900">Your Pack</h3>
              <button className="text-sm bg-brand-50 text-brand-700 px-6 py-2.5 rounded-xl font-bold hover:bg-brand-100 transition-colors border border-brand-100">
                + Add Dog
              </button>
            </div>
            
            {user.dogs.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6">
                {user.dogs.map(dog => (
                  <div key={dog.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
                     <div className="relative overflow-hidden h-48">
                       <img src={dog.image} alt={dog.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                       <div className="absolute top-4 right-4">
                         <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-sm ${
                            dog.status === 'Enrolled' ? 'bg-green-500 text-white' : 
                            dog.status === 'Graduated' ? 'bg-brand-500 text-white' : 'bg-yellow-500 text-white'
                          }`}>
                            {dog.status}
                          </span>
                       </div>
                     </div>
                     <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-1">{dog.name}</h4>
                        <p className="text-gray-500 text-sm mb-6 font-medium">{dog.breed} • {dog.age}</p>
                        
                        <div className="flex gap-2">
                          <button className="flex-1 py-2.5 rounded-xl bg-brand-50 text-brand-700 text-xs font-bold hover:bg-brand-100 transition-colors">
                            Daily Report
                          </button>
                          <button className="flex-1 py-2.5 rounded-xl bg-gray-50 text-gray-700 text-xs font-bold hover:bg-gray-100 transition-colors">
                            Photos
                          </button>
                        </div>
                     </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                <div className="text-6xl mb-4">🦴</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">No dogs enrolled yet</h4>
                <p className="text-gray-500 mb-8 max-w-xs mx-auto">Get started by adding your first puppy and scheduling a consultation.</p>
                <button className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 shadow-lg shadow-brand-100">
                  Register Your Dog
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats/Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
               <div className="relative z-10">
                  <h4 className="text-2xl font-display font-bold mb-4">Active Course</h4>
                  <p className="text-brand-100 mb-6 font-medium">Puppy Pre-K: Week 3 of 6</p>
                  <div className="w-full bg-brand-900/40 h-2.5 rounded-full mb-8">
                    <div className="bg-white h-full rounded-full w-1/2 shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                  </div>
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2.5 rounded-xl font-bold text-sm transition-colors border border-white/20">
                    Continue Module
                  </button>
               </div>
               <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                  <span className="text-[140px]">🐾</span>
               </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
               <h4 className="text-xl font-bold text-gray-900 mb-4">Training Philosophy</h4>
               <p className="text-gray-500 text-sm leading-relaxed mb-6">
                 At Jet's, we believe in <strong>Positive Reinforcement</strong> and science-based methods. 
                 Your puppy learns faster in a low-stress environment filled with praise.
               </p>
               <button className="text-brand-600 font-bold text-sm hover:underline">
                 Read Our Methodology →
               </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
