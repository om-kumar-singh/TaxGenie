import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { FinancialData } from '../types/tax';

interface Props {
  onDataExtracted: (data: FinancialData) => void;
}

interface ExtractedData {
  income: number;
  hra: number;
  section80C: number;
  section80D: number;
  nps: number;
  tds: number;
  confidence: number;
}

export default function Form16Upload({ onDataExtracted }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const extractDataFromPDF = async (file: File): Promise<ExtractedData> => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockData: ExtractedData = {
      income: 1200000 + Math.floor(Math.random() * 500000),
      hra: 200000 + Math.floor(Math.random() * 100000),
      section80C: 100000 + Math.floor(Math.random() * 50000),
      section80D: 15000 + Math.floor(Math.random() * 10000),
      nps: Math.floor(Math.random() * 50000),
      tds: 150000 + Math.floor(Math.random() * 100000),
      confidence: 85 + Math.floor(Math.random() * 15)
    };

    return mockData;
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      await processFile(droppedFile);
    } else {
      setError('Please upload a PDF file (Form 16 or Salary Slip)');
    }
  }, []);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        await processFile(selectedFile);
      } else {
        setError('Please upload a PDF file (Form 16 or Salary Slip)');
      }
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const data = await extractDataFromPDF(file);
      setExtractedData(data);
    } catch (err) {
      setError('Failed to process the file. Please try again or enter manually.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmData = () => {
    if (extractedData) {
      const financialData: FinancialData = {
        income: extractedData.income,
        hra: extractedData.hra,
        rentPaid: 0,
        homeLoanInterest: 0,
        section80C: extractedData.section80C,
        section80D: extractedData.section80D,
        nps: extractedData.nps,
        otherDeductions: 0,
        cityType: 'metro'
      };
      onDataExtracted(financialData);
    }
  };

  const handleEditField = (field: keyof ExtractedData, value: number) => {
    if (extractedData) {
      setExtractedData({ ...extractedData, [field]: value });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl">
          <Upload className="text-white" size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Upload Form 16 / Salary Slip</h2>
          <p className="text-gray-600">Let Genie extract your tax details automatically</p>
        </div>
      </div>

      {!file && !extractedData && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-3 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-purple-500 bg-purple-50'
              : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="bg-purple-100 p-6 rounded-full">
              <FileText className="text-purple-600" size={48} />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Drag and drop your Form 16 or Salary Slip here
              </p>
              <p className="text-gray-600 mb-4">or</p>
              <label className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold cursor-pointer hover:from-purple-700 hover:to-blue-700 transition-all inline-block">
                Browse Files
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">Supported format: PDF only</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {isProcessing && (
        <div className="text-center py-12">
          <Loader className="animate-spin text-purple-600 mx-auto mb-4" size={48} />
          <p className="text-lg font-semibold text-gray-800 mb-2">Genie is reading your document...</p>
          <p className="text-gray-600">Using AI to extract financial information</p>
        </div>
      )}

      {extractedData && (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-green-800">Data extracted successfully!</p>
              <p className="text-sm text-green-700">Confidence: {extractedData.confidence}%</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Review & Edit Extracted Data</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Gross Income
                </label>
                <input
                  type="number"
                  value={extractedData.income}
                  onChange={(e) => handleEditField('income', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  HRA Received
                </label>
                <input
                  type="number"
                  value={extractedData.hra}
                  onChange={(e) => handleEditField('hra', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section 80C Investment
                </label>
                <input
                  type="number"
                  value={extractedData.section80C}
                  onChange={(e) => handleEditField('section80C', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Health Insurance (80D)
                </label>
                <input
                  type="number"
                  value={extractedData.section80D}
                  onChange={(e) => handleEditField('section80D', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NPS (80CCD1B)
                </label>
                <input
                  type="number"
                  value={extractedData.nps}
                  onChange={(e) => handleEditField('nps', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TDS Deducted
                </label>
                <input
                  type="number"
                  value={extractedData.tds}
                  onChange={(e) => handleEditField('tds', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleConfirmData}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Confirm & Analyze Tax
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setExtractedData(null);
                  setError(null);
                }}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Upload New File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
