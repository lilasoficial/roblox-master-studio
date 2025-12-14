import React from 'react';
import { MOCK_PROJECTS, TEXTS } from '../constants';
import { Language, User } from '../types';
import { Plus, Clock, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface DashboardProps {
  user: User;
  lang: Language;
  onNavigate: (view: any) => void;
}

const data = [
  { name: 'Mon', visits: 400 },
  { name: 'Tue', visits: 300 },
  { name: 'Wed', visits: 550 },
  { name: 'Thu', visits: 450 },
  { name: 'Fri', visits: 800 },
  { name: 'Sat', visits: 1200 },
  { name: 'Sun', visits: 1000 },
];

export const Dashboard: React.FC<DashboardProps> = ({ user, lang, onNavigate }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {TEXTS['dash.welcome'][lang]} <span className="text-purple-400">{user.username}</span>
          </h2>
          <p className="text-gray-400 mt-1">Ready to create the next big hit?</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-purple-500/25 transition-all">
          <Plus size={20} />
          {TEXTS['dash.new'][lang]}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-semibold text-gray-200 border-l-4 border-purple-500 pl-3">
             {TEXTS['dash.recent'][lang]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_PROJECTS.map((proj) => (
              <div key={proj.id} className="bg-gray-800 p-5 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-purple-600 text-xs px-2 py-1 rounded text-white">Open</div>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-lg text-white">{proj.name}</h4>
                    <span className="text-xs text-blue-300 bg-blue-900/30 px-2 py-1 rounded-full mt-1 inline-block">{proj.type}</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                    {proj.progress}%
                  </div>
                </div>
                <div className="w-full bg-gray-700 h-1.5 rounded-full mb-3">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                </div>
                <div className="flex items-center text-gray-500 text-xs gap-1">
                  <Clock size={12} />
                  Edited {proj.lastEdited}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics Mini */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col h-[320px]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-green-400" />
              Game Analytics
            </h3>
            <span className="text-xs text-gray-400">Last 7 Days</span>
          </div>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};