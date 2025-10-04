import React from 'react';
import { TaxComparison as TaxComparisonType } from '../types/tax';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, Award, AlertCircle } from 'lucide-react';

interface Props {
  comparison: TaxComparisonType;
}

const COLORS = ['#9333ea', '#3b82f6', '#10b981', '#f59e0b'];

export default function TaxComparison({ comparison }: Props) {
  const chartData = [
    {
      name: 'Old Regime',
      'Tax Payable': Math.round(comparison.oldRegime.totalTax),
      'After Deductions': Math.round(comparison.oldRegime.taxableIncome)
    },
    {
      name: 'New Regime',
      'Tax Payable': Math.round(comparison.newRegime.totalTax),
      'After Deductions': Math.round(comparison.newRegime.taxableIncome)
    }
  ];

  const pieData = [
    { name: 'Tax Payable', value: comparison.oldRegime.totalTax },
    { name: 'Deductions', value: comparison.oldRegime.deductions },
    { name: 'Take Home', value: comparison.oldRegime.grossIncome - comparison.oldRegime.totalTax - comparison.oldRegime.deductions }
  ];

  const formatCurrency = (value: number) => `₹${value.toLocaleString('en-IN')}`;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recommended Regime</h2>
            <p className="text-purple-100 text-lg">
              {comparison.recommendedRegime === 'old' ? 'Old Tax Regime' : 'New Tax Regime'}
            </p>
          </div>
          <Award size={64} className="opacity-80" />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-purple-100 text-sm mb-1">Old Regime Tax</p>
            <p className="text-2xl font-bold">{formatCurrency(comparison.oldRegime.totalTax)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-purple-100 text-sm mb-1">New Regime Tax</p>
            <p className="text-2xl font-bold">{formatCurrency(comparison.newRegime.totalTax)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown size={20} />
              <p className="text-purple-100 text-sm">Potential Savings</p>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(comparison.savings)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Tax Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="Tax Payable" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Income Breakdown (Old Regime)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Old Regime Breakdown</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${comparison.recommendedRegime === 'old' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {comparison.recommendedRegime === 'old' ? 'Recommended' : 'Alternative'}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Gross Income</span>
              <span className="font-semibold">{formatCurrency(comparison.oldRegime.grossIncome)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Total Deductions</span>
              <span className="font-semibold text-green-600">- {formatCurrency(comparison.oldRegime.deductions)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Taxable Income</span>
              <span className="font-semibold">{formatCurrency(comparison.oldRegime.taxableIncome)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Tax Payable</span>
              <span className="font-semibold">{formatCurrency(comparison.oldRegime.taxPayable)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Health & Education Cess (4%)</span>
              <span className="font-semibold">{formatCurrency(comparison.oldRegime.cess)}</span>
            </div>
            <div className="flex justify-between py-3 bg-purple-50 rounded-lg px-3">
              <span className="font-bold text-gray-800">Total Tax</span>
              <span className="font-bold text-purple-600 text-lg">{formatCurrency(comparison.oldRegime.totalTax)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Effective Tax Rate</span>
              <span className="font-semibold">{comparison.oldRegime.effectiveRate.toFixed(2)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">New Regime Breakdown</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${comparison.recommendedRegime === 'new' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {comparison.recommendedRegime === 'new' ? 'Recommended' : 'Alternative'}
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Gross Income</span>
              <span className="font-semibold">{formatCurrency(comparison.newRegime.grossIncome)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Standard Deduction</span>
              <span className="font-semibold text-green-600">- {formatCurrency(comparison.newRegime.deductions)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Taxable Income</span>
              <span className="font-semibold">{formatCurrency(comparison.newRegime.taxableIncome)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Tax Payable</span>
              <span className="font-semibold">{formatCurrency(comparison.newRegime.taxPayable)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">Health & Education Cess (4%)</span>
              <span className="font-semibold">{formatCurrency(comparison.newRegime.cess)}</span>
            </div>
            <div className="flex justify-between py-3 bg-blue-50 rounded-lg px-3">
              <span className="font-bold text-gray-800">Total Tax</span>
              <span className="font-bold text-blue-600 text-lg">{formatCurrency(comparison.newRegime.totalTax)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Effective Tax Rate</span>
              <span className="font-semibold">{comparison.newRegime.effectiveRate.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Key Insight</h4>
            <p className="text-blue-800">
              {comparison.recommendedRegime === 'old'
                ? `The Old Tax Regime is better for you because your deductions (₹${comparison.oldRegime.deductions.toLocaleString('en-IN')}) significantly reduce your tax liability. You save ₹${comparison.savings.toLocaleString('en-IN')} compared to the New Regime.`
                : `The New Tax Regime is better for you with lower rates and standard deduction. You save ₹${comparison.savings.toLocaleString('en-IN')} compared to the Old Regime, even without claiming additional deductions.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
