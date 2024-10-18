import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <Bot size={64} className="mb-8" />
      <h1 className="text-5xl font-bold mb-4">AI-Powered Google Sheets Assistant</h1>
      <p className="text-xl mb-8">Revolutionize your spreadsheet management with AI</p>
      <Link
        to="/signup"
        className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
      >
        Get Started
      </Link>
    </div>
  );
};

export default LandingPage;