import React, { useState } from 'react';
import { X, FileJson, FileText, Download, CheckCircle } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'csv' | 'json') => void;
  expenseCount: number;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  expenseCount,
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'json'>('csv');

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(selectedFormat);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-slideUp">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Export Data</h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {expenseCount} expense{expenseCount !== 1 ? 's' : ''} ready to export
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Export Format
            </label>
            <div className="space-y-3">
              {/* CSV Option */}
              <button
                type="button"
                onClick={() => setSelectedFormat('csv')}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  selectedFormat === 'csv'
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedFormat === 'csv'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">CSV (Comma-Separated)</h3>
                      {selectedFormat === 'csv' && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Best for Excel, Google Sheets, and data analysis
                    </p>
                  </div>
                </div>
              </button>

              {/* JSON Option */}
              <button
                type="button"
                onClick={() => setSelectedFormat('json')}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  selectedFormat === 'json'
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      selectedFormat === 'json'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <FileJson className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">JSON (JavaScript Object)</h3>
                      {selectedFormat === 'json' && (
                        <CheckCircle className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Best for backup, import, and developer use
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">Export Information</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• File will be saved to your Downloads folder</li>
                  <li>• Includes all expense details and notes</li>
                  <li>• Named with current date for easy tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export {selectedFormat.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
};

