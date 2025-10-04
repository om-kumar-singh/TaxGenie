import React, { useState } from 'react';
import Header from './components/Header';
import FinancialInput from './components/FinancialInput';
import TaxComparison from './components/TaxComparison';
import Recommendations from './components/Recommendations';
import WhatIfSimulator from './components/WhatIfSimulator';
import GenieAssistant from './components/GenieAssistant';
import ExportPDF from './components/ExportPDF';
import Form16Upload from './components/Form16Upload';
import { FinancialData, TaxComparison as TaxComparisonType } from './types/tax';
import { compareTaxRegimes } from './utils/taxCalculator';
import { ArrowRight, CheckCircle2, Upload, CreditCard as Edit3, Wand2 } from 'lucide-react';

function App() {
  const [financialData, setFinancialData] = useState<FinancialData>({
    income: 1200000,
    hra: 200000,
    rentPaid: 180000,
    homeLoanInterest: 0,
    section80C: 100000,
    section80D: 15000,
    nps: 0,
    otherDeductions: 0,
    cityType: 'metro'
  });

  const [comparison, setComparison] = useState<TaxComparisonType | null>(null);
  const [currentStep, setCurrentStep] = useState<'home' | 'upload' | 'manual' | 'results'>('home');
  const [inputMethod, setInputMethod] = useState<'upload' | 'manual' | null>(null);

  const handleCalculate = () => {
    const result = compareTaxRegimes(financialData);
    setComparison(result);
    setCurrentStep('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setCurrentStep('home');
    setInputMethod(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDataExtracted = (data: FinancialData) => {
    setFinancialData(data);
    setCurrentStep('results');
    const result = compareTaxRegimes(data);
    setComparison(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {currentStep === 'home' ? (
            <>
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Wand2 size={48} className="text-purple-600" />
                  <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Welcome to TaxGenie
                  </h2>
                </div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
                  Your Magical AI Tax Assistant - Making Tax Planning Effortless
                </p>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                  Upload your Form 16 or enter details manually. Genie will analyze your taxes,
                  compare regimes, and show you how to save more!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                <button
                  onClick={() => setCurrentStep('upload')}
                  className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-500"
                >
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Upload Form 16</h3>
                  <p className="text-gray-600 mb-4">
                    Let Genie extract your financial details automatically using AI
                  </p>
                  <div className="flex items-center justify-center gap-2 text-purple-600 font-semibold">
                    Quick & Magical
                    <Wand2 size={20} />
                  </div>
                </button>

                <button
                  onClick={() => setCurrentStep('manual')}
                  className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-500"
                >
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Edit3 className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Enter Manually</h3>
                  <p className="text-gray-600 mb-4">
                    Fill in your financial details step-by-step with guidance
                  </p>
                  <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold">
                    Full Control
                    <CheckCircle2 size={20} />
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-md p-6 border-2 border-purple-100">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Enter Details</h3>
                  <p className="text-gray-600">Provide your income, investments, and deductions</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-2 border-blue-100">
                  <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">AI Analysis</h3>
                  <p className="text-gray-600">Get instant comparison and smart recommendations</p>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-2 border-green-100">
                  <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-green-600">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Save Tax</h3>
                  <p className="text-gray-600">Implement suggestions and maximize your savings</p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Why TaxGenie?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Smart Form 16 Upload</h4>
                      <p className="text-gray-600 text-sm">Upload your Form 16 and let AI extract all financial details automatically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Genie Chat Assistant</h4>
                      <p className="text-gray-600 text-sm">Ask Genie anything about taxes with natural language queries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">AI-Powered Analysis</h4>
                      <p className="text-gray-600 text-sm">Get personalized tax-saving recommendations and regime comparison</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">What-If Scenarios</h4>
                      <p className="text-gray-600 text-sm">Simulate salary changes and investment impacts on your tax</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Missed Deductions Finder</h4>
                      <p className="text-gray-600 text-sm">Automatically identify tax-saving opportunities you might have missed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Visual Insights</h4>
                      <p className="text-gray-600 text-sm">Beautiful charts and graphs for easy understanding</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : currentStep === 'upload' ? (
            <>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6"
              >
                <ArrowRight className="rotate-180" size={20} />
                Back to Home
              </button>
              <Form16Upload onDataExtracted={handleDataExtracted} />
            </>
          ) : currentStep === 'manual' ? (
            <>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6"
              >
                <ArrowRight className="rotate-180" size={20} />
                Back to Home
              </button>
              <FinancialInput
                data={financialData}
                onChange={setFinancialData}
                onCalculate={handleCalculate}
              />
            </>
          ) : comparison && (
            <>
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
                >
                  <ArrowRight className="rotate-180" size={20} />
                  Back to Home
                </button>
                <ExportPDF comparison={comparison} financialData={financialData} />
              </div>

              <div className="space-y-8">
                <TaxComparison comparison={comparison} />
                <Recommendations recommendations={comparison.recommendations} />
                <WhatIfSimulator baseData={financialData} />
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Next Steps</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Review and implement the AI recommendations to maximize your tax savings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Use the What-If Simulator to plan for future income changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Export your tax summary as PDF for your records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold">•</span>
                    <span>Chat with Genie for personalized tax advice</span>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-2">TaxGenie - AI Tax Assistant</h3>
          <p className="text-gray-400 text-sm mb-4">Your magical companion for effortless tax planning</p>
          <p className="text-xs text-gray-500">
            Disclaimer: This tool provides estimates based on Indian Income Tax rules. Please consult a qualified tax professional for accurate advice.
          </p>
        </div>
      </footer>

      <GenieAssistant financialData={financialData} comparison={comparison} />
    </div>
  );
}

export default App;
