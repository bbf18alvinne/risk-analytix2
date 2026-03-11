import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

const RISK_DISTRIBUTION = [
  { name: 'Good Risk', value: 700 },
  { name: 'Bad Risk', value: 300 },
];

const AGE_DISTRIBUTION = [
  { range: '18-25', count: 120, good: 80, bad: 40 },
  { range: '26-35', count: 350, good: 260, bad: 90 },
  { range: '36-45', count: 280, good: 210, bad: 70 },
  { range: '46-60', count: 180, good: 120, bad: 60 },
  { range: '60+', count: 70, good: 30, bad: 40 },
];

const CREDIT_AMOUNT_VS_RISK = [
  { amount: '0-2k', good: 450, bad: 100 },
  { amount: '2k-5k', good: 200, bad: 120 },
  { amount: '5k-10k', good: 40, bad: 60 },
  { amount: '10k+', good: 10, bad: 20 },
];

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

export default function RiskDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Total Dataset Size</h3>
          <p className="text-4xl font-bold text-gray-900">1,000</p>
          <p className="text-xs text-emerald-600 mt-2 font-medium">German Credit Dataset</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Good Credit Ratio</h3>
          <p className="text-4xl font-bold text-emerald-600">70%</p>
          <p className="text-xs text-gray-500 mt-2">Historical Baseline</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Avg. Credit Amount</h3>
          <p className="text-4xl font-bold text-gray-900">3,271 Ksh</p>
          <p className="text-xs text-gray-500 mt-2">Across all applicants</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
          <h3 className="text-lg font-semibold mb-6">Overall Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
          <h3 className="text-lg font-semibold mb-6">Risk by Age Group</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AGE_DISTRIBUTION}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="good" name="Good Risk" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="bad" name="Bad Risk" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6">Credit Amount Impact on Risk</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CREDIT_AMOUNT_VS_RISK} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" axisLine={false} tickLine={false} />
                <YAxis dataKey="amount" type="category" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar dataKey="good" name="Good Risk" fill="#10b981" radius={[0, 4, 4, 0]} />
                <Bar dataKey="bad" name="Bad Risk" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
