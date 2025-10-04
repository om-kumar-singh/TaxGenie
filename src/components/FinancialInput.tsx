import React from 'react';
import { FinancialData } from '../types/tax';
import { IndianRupee, Home, Shield, TrendingUp, Building2 } from 'lucide-react';

interface Props {
  data: FinancialData;
  onChange: (data: FinancialData) => void;
  onCalculate: () => void;
}

export default function FinancialInput({ data, onChange, onCalculate }: Props) {
  const handleChange = (field: keyof FinancialData, value: string | number) => {
    onChange({ ...data, [field]: value });
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Financial Details</h2>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <IndianRupee className="text-purple-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Income Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Annual Gross Income</label>
              <input
                type="number"
                value={data.income || ''}
                onChange={(e) => handleChange('income', Number(e.target.value))}
                className={inputClass}
                placeholder="₹ 1,000,000"
              />
            </div>

            <div>
              <label className={labelClass}>HRA Received</label>
              <input
                type="number"
                value={data.hra || ''}
                onChange={(e) => handleChange('hra', Number(e.target.value))}
                className={inputClass}
                placeholder="₹ 200,000"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <Home className="text-blue-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Housing Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Annual Rent Paid</label>
              <input
                type="number"
                value={data.rentPaid || ''}
                onChange={(e) => handleChange('rentPaid', Number(e.target.value))}
                className={inputClass}
                placeholder="₹ 150,000"
              />
            </div>

            <div>
              <label className={labelClass}>City Type</label>
              <select
                value={data.cityType}
                onChange={(e) => handleChange('cityType', e.target.value as 'metro' | 'non-metro')}
                className={inputClass}
              >
                <option value="metro">Metro</option>
                <option value="non-metro">Non-Metro</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Home Loan Interest</label>
              <input
                type="number"
                value={data.homeLoanInterest || ''}
                onChange={(e) => handleChange('homeLoanInterest', Number(e.target.value))}
                className={inputClass}
                placeholder="₹ 100,000"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-green-600" size={24} />
            <h3 className="text-lg font-semibold text-gray-800">Investments & Deductions</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Section 80C (Max ₹1.5L)</label>
              <input
                type="number"
                value={data.section80C || ''}
                onChange={(e) => handleChange('section80C', Number(e.target.value))}
                className={inputClass}
                placeholder="₹ 150,000"
              />
              <p className="text-xs text-gray-500 mt-1">EPF, PPF, ELSS, Life Insurance</p>
            </div>

            <div>
              <label className={labelClass}>Section 80D (Max ₹25K)</label>
              <input
                type="number"
                value={data.section80D || ''}
                onChange={(e) => handleChange('section80D', Number(e.target.value))}
                className={inputClass}
                placeholder="₹ 25,000"
              />
              <p className="text-xs text-gray-500 mt-1">Health Insurance Premium</p>
            </div>

            <div>
              <label className={labelClass}>NPS 80CCD(1B) (Max ₹50K)</label>
              <input
                type="number"
                value={data.nps || ''}
                onChange={(e) => handleChange('nps', Number(e.target.value))}
                className={inputClass}
                placeholder="₹ 50,000"
              />
              <p className="text-xs text-gray-500 mt-1">Additional NPS contribution</p>
            </div>

            <div>
              <label className={labelClass}>Other Deductions</label>
              <input
                type="number"
                value={data.otherDeductions || ''}
                onChange={(e) => handleChange('otherDeductions', Number(e.target.value))}
                className={inputClass}
                placeholder="₹ 0"
              />
            </div>
          </div>
        </div>

        <button
          onClick={onCalculate}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Calculate Tax & Get Recommendations
        </button>
      </div>
    </div>
  );
}
