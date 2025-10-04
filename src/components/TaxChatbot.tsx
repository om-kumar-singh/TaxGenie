import React, { useState } from 'react';
import { MessageCircle, Send, Bot, User } from 'lucide-react';
import { FinancialData } from '../types/tax';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface Props {
  financialData: FinancialData;
}

export default function TaxChatbot({ financialData }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I am your AI Tax Assistant. Ask me anything about tax planning, deductions, or your current financial situation.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const generateResponse = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes('80c') || q.includes('elss') || q.includes('ppf')) {
      const remaining = 150000 - financialData.section80C;
      return `Section 80C allows you to claim deductions up to ₹1.5 lakh. You have currently invested ₹${financialData.section80C.toLocaleString('en-IN')}. You can still invest ₹${remaining.toLocaleString('en-IN')} more in ELSS, PPF, Life Insurance, or EPF to maximize your deductions and save approximately ₹${(remaining * 0.3).toLocaleString('en-IN')} in taxes.`;
    }

    if (q.includes('nps')) {
      const remaining = 50000 - financialData.nps;
      return `NPS (National Pension System) offers an additional deduction of up to ₹50,000 under Section 80CCD(1B), over and above the ₹1.5 lakh limit of Section 80C. You have currently invested ₹${financialData.nps.toLocaleString('en-IN')}. You can invest ₹${remaining.toLocaleString('en-IN')} more to save approximately ₹${(remaining * 0.3).toLocaleString('en-IN')} in taxes.`;
    }

    if (q.includes('health insurance') || q.includes('80d')) {
      const remaining = 25000 - financialData.section80D;
      return `Section 80D allows deductions up to ₹25,000 for health insurance premiums (₹50,000 for senior citizens). You have currently claimed ₹${financialData.section80D.toLocaleString('en-IN')}. You can claim ₹${remaining.toLocaleString('en-IN')} more to save approximately ₹${(remaining * 0.3).toLocaleString('en-IN')} in taxes while securing health coverage.`;
    }

    if (q.includes('hra') || q.includes('rent')) {
      return `HRA (House Rent Allowance) exemption is calculated as the minimum of: (1) Actual HRA received, (2) 50% of salary for metro cities or 40% for non-metro, (3) Rent paid minus 10% of salary. You are currently receiving ₹${financialData.hra.toLocaleString('en-IN')} as HRA and paying ₹${financialData.rentPaid.toLocaleString('en-IN')} as rent. Make sure to submit rent receipts to your employer.`;
    }

    if (q.includes('old regime') || q.includes('new regime') || q.includes('which regime')) {
      return `The choice between Old and New Tax Regime depends on your deductions. The Old Regime has higher rates but allows deductions like 80C, 80D, HRA, etc. The New Regime has lower rates but minimal deductions (only ₹50,000 standard deduction). Based on your current investments of ₹${financialData.section80C.toLocaleString('en-IN')} (80C) + ₹${financialData.section80D.toLocaleString('en-IN')} (80D) + ₹${financialData.nps.toLocaleString('en-IN')} (NPS), I recommend calculating both to see which works better for you.`;
    }

    if (q.includes('home loan')) {
      return `Home loan interest up to ₹2 lakh can be claimed under Section 24(b) in the Old Tax Regime. You are currently claiming ₹${financialData.homeLoanInterest.toLocaleString('en-IN')}. Additionally, principal repayment up to ₹1.5 lakh can be claimed under Section 80C. Make sure to get a certificate from your bank for both interest and principal components.`;
    }

    if (q.includes('how much') || q.includes('save')) {
      return `Based on your current income of ₹${financialData.income.toLocaleString('en-IN')}, you can save more tax by maximizing deductions. Consider: (1) Complete ₹1.5L investment in 80C, (2) ₹50K additional in NPS, (3) ₹25K in health insurance. These could potentially save you up to ₹67,500 in taxes (30% bracket). Would you like specific recommendations?`;
    }

    if (q.includes('deadline') || q.includes('when')) {
      return `Key tax deadlines for FY 2024-25: (1) July 31, 2025 - ITR filing deadline for individuals, (2) March 31, 2025 - End of financial year for tax-saving investments, (3) Quarterly advance tax dates if applicable. Start planning early to avoid last-minute rush!`;
    }

    return `That is an interesting question! Based on your financial data, I can help you with: (1) Section 80C, 80D, 80CCD(1B) deductions, (2) HRA calculations, (3) Home loan benefits, (4) Old vs New regime comparison, (5) Investment recommendations. Could you please rephrase your question or ask about any of these topics?`;
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

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const quickQuestions = [
    'How much can I save with NPS?',
    'Which regime is better for me?',
    'How to claim HRA exemption?',
    'What is Section 80C limit?'
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[600px] flex flex-col">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold">Tax Assistant</h3>
                <p className="text-xs text-purple-100">Ask me anything about taxes</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="bg-purple-100 p-2 rounded-full flex-shrink-0 h-8 w-8 flex items-center justify-center">
                    <Bot size={16} className="text-purple-600" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 h-8 w-8 flex items-center justify-center">
                    <User size={16} className="text-blue-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-4">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="space-y-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="w-full text-left text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 p-2 rounded-lg transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about tax savings..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
}
