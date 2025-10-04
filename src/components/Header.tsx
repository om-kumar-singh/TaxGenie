import React from 'react';
import { Wand2, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 backdrop-blur p-3 rounded-xl">
              <Wand2 size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                TaxGenie
                <Sparkles size={24} className="text-yellow-300" />
              </h1>
              <p className="text-purple-100 text-sm">Your Magical Tax Assistant</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-purple-100">Based on</p>
              <p className="font-semibold">Indian Tax Rules 2025</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
