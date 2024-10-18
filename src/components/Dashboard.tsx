import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, MessageSquare } from 'lucide-react';
import { listSheets } from '../services/googleSheets';

const Dashboard: React.FC = () => {
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [sheets, setSheets] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleConnectSheets = async () => {
    try {
      const sheetsList = await listSheets(spreadsheetId);
      setSheets(sheetsList);
      setError('');
    } catch (err) {
      setError('Failed to connect to Google Sheets. Please check the Spreadsheet ID and try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <FileSpreadsheet size={32} className="text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Connect Google Sheets</h2>
          <p className="text-gray-600 mb-4">
            Enter your Google Sheets ID to connect and view available sheets.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            value={spreadsheetId}
            onChange={(e) => setSpreadsheetId(e.target.value)}
            placeholder="Enter Spreadsheet ID"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <button
            onClick={handleConnectSheets}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Connect Sheets
          </button>
          {sheets.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Available Sheets:</h3>
              <ul className="list-disc list-inside">
                {sheets.map((sheet, index) => (
                  <li key={index}>{sheet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <MessageSquare size={32} className="text-green-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Start Chatting</h2>
          <p className="text-gray-600 mb-4">
            Interact with your AI assistant to manage your sheets.
          </p>
          <Link
            to="/chat"
            className="inline-block bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            Open Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;