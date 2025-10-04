import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Wand2, User, Sparkles, X } from 'lucide-react';
import { FinancialData, TaxComparison } from '../types/tax';
import { calculateOldRegimeTax, calculateNewRegimeTax } from '../utils/taxCalculator';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'genie';
  timestamp: Date;
  suggestions?: string[];
}

interface Props {
  financialData: FinancialData;
  comparison?: TaxComparison | null;
}

export default function GenieAssistant({ financialData, comparison }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am Genie, your magical tax assistant. I can help you understand your taxes, find savings, and answer any questions about Indian tax laws. What would you like to know?',
      sender: 'genie',
      timestamp: new Date(),
      suggestions: [
        'How can I save more tax?',
        'Compare old vs new regime for me',
        'Show my deductions',
        'What if my salary increases?'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateEnhancedResponse = (question: string): { text: string; suggestions?: string[] } => {
    const q = question.toLowerCase();

    if (q.includes('save') && q.includes('tax')) {
      const oldTax = calculateOldRegimeTax(financialData);
      const newTax = calculateNewRegimeTax(financialData);
      const betterRegime = oldTax.totalTax < newTax.totalTax ? 'Old' : 'New';
      const savings = Math.abs(oldTax.totalTax - newTax.totalTax);

      return {
        text: `Great question! Based on your current financial profile, here's how you can save more tax:\n\n1. Choose the ${betterRegime} Tax Regime - You'll save ₹${savings.toLocaleString('en-IN')} compared to the other regime.\n\n2. Maximize Section 80C: You've invested ₹${financialData.section80C.toLocaleString('en-IN')} out of ₹1.5L limit. Invest ₹${(150000 - financialData.section80C).toLocaleString('en-IN')} more to save ₹${((150000 - financialData.section80C) * 0.3).toLocaleString('en-IN')}.\n\n3. Health Insurance (80D): Claim up to ₹25,000 for health insurance to save ₹7,500.\n\n4. Additional NPS (80CCD1B): Invest ₹50,000 to save ₹15,000.\n\nTotal potential savings: ₹${(savings + ((150000 - financialData.section80C) * 0.3) + 7500 + 15000).toLocaleString('en-IN')}!`,
        suggestions: ['Tell me more about 80C', 'How does NPS work?', 'Compare regimes in detail']
      };
    }

    if (q.includes('compare') || q.includes('regime')) {
      const oldTax = calculateOldRegimeTax(financialData);
      const newTax = calculateNewRegimeTax(financialData);
      const recommended = oldTax.totalTax < newTax.totalTax ? 'Old' : 'New';

      return {
        text: `Let me break down the comparison for you:\n\n📊 Old Tax Regime:\n• Tax Payable: ₹${oldTax.totalTax.toLocaleString('en-IN')}\n• Deductions Used: ₹${oldTax.deductions.toLocaleString('en-IN')}\n• Effective Rate: ${oldTax.effectiveRate.toFixed(2)}%\n\n📊 New Tax Regime:\n• Tax Payable: ₹${newTax.totalTax.toLocaleString('en-IN')}\n• Standard Deduction: ₹${newTax.deductions.toLocaleString('en-IN')}\n• Effective Rate: ${newTax.effectiveRate.toFixed(2)}%\n\n✨ Recommendation: ${recommended} Regime saves you ₹${Math.abs(oldTax.totalTax - newTax.totalTax).toLocaleString('en-IN')}!\n\nThe ${recommended} Regime works better because ${recommended === 'Old' ? 'your deductions significantly reduce your tax liability' : 'the lower tax rates outweigh the loss of deductions'}.`,
        suggestions: ['Why is this better?', 'What if I invest more?', 'Show detailed breakdown']
      };
    }

    if (q.includes('deduction') || q.includes('show') && q.includes('deduction')) {
      return {
        text: `Here's a summary of your current deductions:\n\n💰 Section 80C: ₹${financialData.section80C.toLocaleString('en-IN')} / ₹1,50,000\n${financialData.section80C < 150000 ? `   → You can add ₹${(150000 - financialData.section80C).toLocaleString('en-IN')} more!\n` : '   → Fully utilized! 🎉\n'}\n🏥 Section 80D: ₹${financialData.section80D.toLocaleString('en-IN')} / ₹25,000\n${financialData.section80D < 25000 ? `   → Add ₹${(25000 - financialData.section80D).toLocaleString('en-IN')} for health insurance\n` : '   → Fully utilized! 🎉\n'}\n💼 NPS 80CCD(1B): ₹${financialData.nps.toLocaleString('en-IN')} / ₹50,000\n${financialData.nps < 50000 ? `   → Invest ₹${(50000 - financialData.nps).toLocaleString('en-IN')} more in NPS\n` : '   → Fully utilized! 🎉\n'}\n🏠 HRA: ₹${financialData.hra.toLocaleString('en-IN')}\n🏠 Home Loan Interest: ₹${financialData.homeLoanInterest.toLocaleString('en-IN')}`,
        suggestions: ['How to maximize 80C?', 'Tell me about NPS', 'HRA calculation']
      };
    }

    if (q.includes('80c')) {
      return {
        text: `Section 80C is one of the most popular tax-saving options! Here's what you need to know:\n\n✨ Maximum Deduction: ₹1,50,000\n✨ Your Current Investment: ₹${financialData.section80C.toLocaleString('en-IN')}\n\n💡 Investment Options:\n• ELSS Mutual Funds (3-year lock-in)\n• PPF (Public Provident Fund)\n• EPF/VPF (Employee Provident Fund)\n• Life Insurance Premium\n• NSC (National Savings Certificate)\n• Home Loan Principal Repayment\n• Children's Tuition Fees\n\n💰 Tax Benefit: Up to ₹46,800 savings (at 30% + 4% cess)\n\nI recommend ELSS for higher returns or PPF for safety!`,
        suggestions: ['Compare ELSS vs PPF', 'Tell me about NPS', 'What about 80D?']
      };
    }

    if (q.includes('nps')) {
      return {
        text: `NPS (National Pension System) is a fantastic retirement savings option with additional tax benefits!\n\n🎯 Section 80CCD(1B):\n• Additional deduction of ₹50,000 (over and above 80C limit)\n• Your current NPS: ₹${financialData.nps.toLocaleString('en-IN')}\n• Potential saving: ₹${((50000 - financialData.nps) * 0.312).toLocaleString('en-IN')}\n\n💼 Benefits:\n✅ Extra ₹50K deduction\n✅ Market-linked returns (8-12% historically)\n✅ Low-cost fund management\n✅ Flexible contribution\n\n⚠️ Note: Locked until retirement (60 years)\n\nIt's perfect for long-term wealth creation with tax benefits!`,
        suggestions: ['How to invest in NPS?', 'Compare NPS vs ELSS', 'Other tax savings?']
      };
    }

    if (q.includes('hra')) {
      return {
        text: `HRA (House Rent Allowance) exemption can save you significant tax! Here's how it works:\n\n📐 Calculation: Minimum of:\n1. Actual HRA received: ₹${financialData.hra.toLocaleString('en-IN')}\n2. ${financialData.cityType === 'metro' ? '50%' : '40%'} of salary (${financialData.cityType})\n3. Rent paid - 10% of salary\n\n📋 Requirements:\n• Submit rent receipts to employer\n• Landlord's PAN if rent > ₹1L/year\n• Rent agreement (recommended)\n\n💡 Your Situation:\nYou're receiving ₹${financialData.hra.toLocaleString('en-IN')} as HRA${financialData.rentPaid > 0 ? ` and paying ₹${financialData.rentPaid.toLocaleString('en-IN')} rent` : ''}.\n\n${financialData.rentPaid === 0 ? '⚠️ You should update your rent details to claim the full exemption!' : '✅ Make sure to submit rent receipts!'}`,
        suggestions: ['What if I don\'t pay rent?', 'Can I claim HRA with home loan?', 'Calculate my HRA exemption']
      };
    }

    if (q.includes('what if') || q.includes('salary increase')) {
      return {
        text: `Great question! Let me help you plan for the future.\n\nIf your salary increases, your tax will also increase. But here's the good news - you can manage it smartly!\n\n📈 Strategy:\n1. Increase 80C investments proportionally\n2. Max out NPS ₹50K contribution\n3. Ensure health insurance coverage (80D)\n4. Consider home loan if planning to buy property\n\n💡 Pro Tip: For every ₹1L increase in salary:\n• Tax increases by ~₹30K (30% bracket)\n• Invest ₹1L in 80C → Save ₹30K\n• Net effect: Zero additional tax!\n\nUse the What-If Simulator on your dashboard to see exact numbers!`,
        suggestions: ['Show me What-If scenarios', 'Investment recommendations', 'Tax planning tips']
      };
    }

    if (q.includes('deadline') || q.includes('when') || q.includes('file')) {
      return {
        text: `Important Tax Deadlines for FY 2024-25:\n\n📅 March 31, 2025:\n• Last date for tax-saving investments (80C, 80D, NPS)\n• End of financial year\n\n📅 April 1 - June 15, 2025:\n• Advance tax Q1 (if applicable)\n\n📅 July 31, 2025:\n• ITR filing deadline for most individuals\n• File early to avoid last-minute rush!\n\n📅 December 31, 2025:\n• Belated/revised return deadline\n\n⏰ My Advice: Start planning in January to maximize savings and file by June for faster refunds!`,
        suggestions: ['How to file ITR?', 'What is advance tax?', 'Tax saving checklist']
      };
    }

    if (q.includes('form 16') || q.includes('missed')) {
      return {
        text: `Based on your Form 16 analysis, here are potential missed opportunities:\n\n${financialData.section80C < 150000 ? `❌ Section 80C not maxed out\n   → Missing savings: ₹${((150000 - financialData.section80C) * 0.3).toLocaleString('en-IN')}\n` : '✅ Section 80C fully utilized\n'}\n${financialData.section80D < 25000 ? `❌ Health insurance (80D) underutilized\n   → Missing savings: ₹${((25000 - financialData.section80D) * 0.3).toLocaleString('en-IN')}\n` : '✅ Section 80D well utilized\n'}\n${financialData.nps === 0 ? `❌ Not using NPS 80CCD(1B)\n   → Missing savings: ₹15,600\n` : financialData.nps < 50000 ? `⚠️ NPS partially used\n   → Add ₹${(50000 - financialData.nps).toLocaleString('en-IN')} more\n` : '✅ NPS fully utilized\n'}\n${financialData.rentPaid > 0 && financialData.hra === 0 ? `❌ Paying rent but not claiming HRA\n   → Update salary structure!\n` : ''}\n\n💡 Quick Action: Focus on the ❌ items above to maximize your savings!`,
        suggestions: ['How to fix these?', 'Investment recommendations', 'Calculate total savings']
      };
    }

    if (q.includes('home loan')) {
      return {
        text: `Home Loan offers excellent tax benefits under multiple sections:\n\n🏠 Section 24(b) - Interest:\n• Deduction: Up to ₹2,00,000\n• Your claim: ₹${financialData.homeLoanInterest.toLocaleString('en-IN')}\n• Available in Old Regime only\n\n🏠 Section 80C - Principal:\n• Part of ₹1.5L limit\n• Included in your 80C investments\n\n🏠 First-time Homebuyer:\n• Additional ₹50K under 80EEA (if applicable)\n• Loan sanctioned between 2019-2022\n\n💰 Total Benefit: Up to ₹2.5L deduction\n→ Save up to ₹78,000 in taxes!\n\n${financialData.homeLoanInterest === 0 ? '💡 If you\'re planning to buy a home, consider the tax benefits!' : '✅ Keep collecting interest certificates from your bank annually.'}`,
        suggestions: ['Should I buy a house?', 'Old vs New regime impact', 'Other deductions']
      };
    }

    return {
      text: `I'd be happy to help with that! I'm Genie, your tax expert specializing in Indian tax laws.\n\n✨ Here's what I can help you with:\n\n💰 Tax Calculations:\n• Compare Old vs New Regime\n• Calculate your tax liability\n• Find your effective tax rate\n\n📊 Deduction Guidance:\n• Section 80C investments\n• Health insurance (80D)\n• NPS additional benefits\n• HRA calculations\n• Home loan benefits\n\n🎯 Planning & Strategy:\n• Investment recommendations\n• What-if scenarios\n• Tax-saving tips\n• Filing deadlines\n\nWhat would you like to explore?`,
      suggestions: ['How can I save tax?', 'Compare regimes', 'Show my deductions', 'Investment ideas']
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const { text, suggestions } = generateEnhancedResponse(input);
      const genieMessage: Message = {
        id: (Date.now() + 1).toString(),
        text,
        sender: 'genie',
        timestamp: new Date(),
        suggestions
      };
      setMessages((prev) => [...prev, genieMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col">
          <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="bg-white/30 p-2 rounded-full backdrop-blur">
                    <Wand2 size={24} />
                  </div>
                  <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-bold">Genie</h3>
                  <p className="text-xs text-purple-100">Your Magical Tax Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50/30 to-white">
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'genie' && (
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-full flex-shrink-0 h-8 w-8 flex items-center justify-center">
                      <Wand2 size={16} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-white text-gray-800 shadow-md border border-purple-100'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                  {msg.sender === 'user' && (
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 h-8 w-8 flex items-center justify-center">
                      <User size={16} className="text-blue-600" />
                    </div>
                  )}
                </div>
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="ml-10 mt-2 space-y-2">
                    {msg.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="block w-full text-left text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg transition-colors border border-purple-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-full flex-shrink-0 h-8 w-8 flex items-center justify-center">
                  <Wand2 size={16} className="text-white" />
                </div>
                <div className="bg-white text-gray-800 shadow-md border border-purple-100 p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Genie anything..."
                className="flex-1 px-4 py-2 border border-purple-300 rounded-full focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all animate-pulse"
        >
          <Wand2 size={28} />
          <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300" />
          <div className="absolute -top-12 right-0 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Genie!
          </div>
        </button>
      )}
    </div>
  );
}
