import React, { useState } from 'react';
import { FinancialData } from '../types/tax';
import { calculateOldRegimeTax, calculateNewRegimeTax } from '../utils/taxCalculator';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp } from 'lucide-react';

interface Props {
  baseData: FinancialData;
}

export default function WhatIfSimulator({ baseData }: Props) {
  const [incomeIncrease, setIncomeIncrease] = useState(0);
  const [additional80C, setAdditional80C] = useState(0);

  const generateSimulation = () => {
    const data = [];

    for (let i = 0; i <= 500000; i += 100000) {
      const simulatedData: FinancialData = {
        ...baseData,
        income: baseData.income + i,
        section80C: Math.min(baseData.section80C + additional80C, 150000)
      };

      const oldTax = calculateOldRegimeTax(simulatedData);
      const newTax = calculateNewRegimeTax(simulatedData);

      data.push({
        income: (baseData.income + i) / 100000,
        'Old Regime': Math.round(oldTax.totalTax),
        'New Regime': Math.round(newTax.totalTax)
      });
    }

    return data;
  };

  const simulatedData: FinancialData = {
    ...baseData,
    income: baseData.income + incomeIncrease,
    section80C: Math.min(baseData.section80C + additional80C, 150000)
  };

  const oldTax = calculateOldRegimeTax(simulatedData);
  const newTax = calculateNewRegimeTax(simulatedData);
  const currentOldTax = calculateOldRegimeTax(baseData);
  const currentNewTax = calculateNewRegimeTax(baseData);

  const chartData = generateSimulation();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl">
          <Calculator className="text-white" size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">What-If Scenario Simulator</h2>
          <p className="text-gray-600">See how changes in income and investments affect your taxes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Salary Increase
          </label>
          <input
            type="range"
            min="0"
            max="500000"
            step="50000"
            value={incomeIncrease}
            onChange={(e) => setIncomeIncrease(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>₹0</span>
            <span className="font-bold text-purple-600">+₹{incomeIncrease.toLocaleString('en-IN')}</span>
            <span>₹5L</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional 80C Investment
          </label>
          <input
            type="range"
            min="0"
            max="150000"
            step="10000"
            value={additional80C}
            onChange={(e) => setAdditional80C(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>₹0</span>
            <span className="font-bold text-green-600">+₹{additional80C.toLocaleString('en-IN')}</span>
            <span>₹1.5L</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Projected Tax Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Old Regime</p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500">Current Tax</p>
              <p className="text-lg font-bold text-gray-700">₹{currentOldTax.totalTax.toLocaleString('en-IN')}</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp size={16} className={oldTax.totalTax > currentOldTax.totalTax ? 'text-red-500' : 'text-green-500'} />
                <p className="text-xs text-gray-500">Projected Tax</p>
              </div>
              <p className="text-2xl font-bold text-purple-600">₹{oldTax.totalTax.toLocaleString('en-IN')}</p>
              <p className={`text-sm mt-1 ${oldTax.totalTax > currentOldTax.totalTax ? 'text-red-600' : 'text-green-600'}`}>
                {oldTax.totalTax > currentOldTax.totalTax ? '+' : ''}₹{(oldTax.totalTax - currentOldTax.totalTax).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">New Regime</p>
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-500">Current Tax</p>
              <p className="text-lg font-bold text-gray-700">₹{currentNewTax.totalTax.toLocaleString('en-IN')}</p>
              <div className="flex items-center gap-2 mt-2">
                <TrendingUp size={16} className={newTax.totalTax > currentNewTax.totalTax ? 'text-red-500' : 'text-green-500'} />
                <p className="text-xs text-gray-500">Projected Tax</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">₹{newTax.totalTax.toLocaleString('en-IN')}</p>
              <p className={`text-sm mt-1 ${newTax.totalTax > currentNewTax.totalTax ? 'text-red-600' : 'text-green-600'}`}>
                {newTax.totalTax > currentNewTax.totalTax ? '+' : ''}₹{(newTax.totalTax - currentNewTax.totalTax).toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Tax Projection Chart</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="income"
              label={{ value: 'Income (in Lakhs)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis label={{ value: 'Tax Amount (₹)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
              labelFormatter={(label) => `Income: ₹${Number(label) * 100000}`}
            />
            <Legend />
            <Line type="monotone" dataKey="Old Regime" stroke="#9333ea" strokeWidth={2} />
            <Line type="monotone" dataKey="New Regime" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Insight:</strong> With an income of ₹{simulatedData.income.toLocaleString('en-IN')} and 80C investment of ₹{simulatedData.section80C.toLocaleString('en-IN')},
          the {oldTax.totalTax < newTax.totalTax ? 'Old' : 'New'} Regime would save you ₹{Math.abs(oldTax.totalTax - newTax.totalTax).toLocaleString('en-IN')} in taxes.
        </p>
      </div>
    </div>
  );
}
