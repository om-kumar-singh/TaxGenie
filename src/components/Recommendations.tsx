import React from 'react';
import { Recommendation } from '../types/tax';
import { Lightbulb, TrendingUp, Shield, CheckCircle } from 'lucide-react';

interface Props {
  recommendations: Recommendation[];
}

export default function Recommendations({ recommendations }: Props) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'investment':
        return <TrendingUp className="text-green-600" size={24} />;
      case 'insurance':
        return <Shield className="text-blue-600" size={24} />;
      default:
        return <CheckCircle className="text-purple-600" size={24} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default:
        return 'bg-green-100 text-green-700 border-green-300';
    }
  };

  const totalSavings = recommendations.reduce((sum, r) => sum + r.potentialSavings, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-3 rounded-xl">
          <Lightbulb className="text-white" size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">AI-Powered Recommendations</h2>
          <p className="text-gray-600">Personalized suggestions to maximize your tax savings</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 mb-1">Total Potential Additional Savings</p>
            <p className="text-3xl font-bold text-green-700">₹{totalSavings.toLocaleString('en-IN')}</p>
          </div>
          <TrendingUp className="text-green-600" size={48} />
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-3 rounded-lg">
                {getIcon(rec.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{rec.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{rec.description}</p>
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 px-4 py-2 rounded-lg">
                    <span className="text-sm text-green-700 font-medium">Potential Savings: </span>
                    <span className="text-lg font-bold text-green-800">₹{rec.potentialSavings.toLocaleString('en-IN')}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {rec.category.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Excellent Tax Planning!</h3>
          <p className="text-gray-600">You are already maximizing your tax deductions. Keep up the great work!</p>
        </div>
      )}
    </div>
  );
}
