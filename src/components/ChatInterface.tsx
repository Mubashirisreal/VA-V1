import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { getAIResponse } from '../services/groq';
import { readSheet, writeToSheet } from '../services/googleSheets';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' as const };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const aiResponse = await getAIResponse([
          ...messages.map((msg) => ({
            role: msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.text,
          })),
          { role: 'user', content: input },
        ]);

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiResponse, sender: 'ai' },
        ]);

        // Here you can add logic to interact with Google Sheets based on the AI response
        // For example:
        // if (aiResponse.includes('read sheet')) {
        //   const data = await readSheet('spreadsheetId', 'Sheet1!A1:B10');
        //   // Process the data...
        // } else if (aiResponse.includes('write to sheet')) {
        //   await writeToSheet('spreadsheetId', 'Sheet1!A1', [['Hello', 'World']]);
        // }

      } catch (error) {
        console.error('Error getting AI response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Sorry, I encountered an error. Please try again.', sender: 'ai' },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center">
            <div className="inline-block p-3 rounded-lg bg-gray-200">
              AI is thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="bg-blue-600 text-white py-2 px-4 rounded-r-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;