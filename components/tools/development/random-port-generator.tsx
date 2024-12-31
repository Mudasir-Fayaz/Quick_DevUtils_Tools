'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';


export default function RandomPortGenerator() {
  const [minPort, setMinPort] = useState(1024);
  const [maxPort, setMaxPort] = useState(65535);
  const [generatedPort, setGeneratedPort] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const generatePort = () => {
    const port = Math.floor(Math.random() * (maxPort - minPort + 1)) + minPort;
    setGeneratedPort(port);
  };

  const copyToClipboard = () => {
    if (generatedPort) {
      navigator.clipboard.writeText(generatedPort.toString());
    }
  };

  const toggleFavorite = () => {
    if (generatedPort) {
      setFavorites(prev => 
        prev.includes(generatedPort) ? prev.filter(p => p !== generatedPort) : [...prev, generatedPort]
      );
    }
  };

  return (
   
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Min Port</label>
            <input
              type="number"
              min="1024"
              max="65535"
              value={minPort}
              onChange={(e) => setMinPort(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Max Port</label>
            <input
              type="number"
              min="1024"
              max="65535"
              value={maxPort}
              onChange={(e) => setMaxPort(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <button
          onClick={generatePort}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Generate Port
        </button>
        {generatedPort && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border rounded text-center"
          >
            <p className="text-2xl font-bold">{generatedPort}</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                Copy
              </button>
              <button
                onClick={toggleFavorite}
                className={`p-1 rounded ${favorites.includes(generatedPort) ? 'bg-yellow-200 hover:bg-yellow-300' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {favorites.includes(generatedPort) ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>
          </motion.div>
        )}
        {favorites.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">Favorite Ports</h2>
            <ul className="space-y-1">
              {favorites.map(port => (
                <li key={port} className="p-2 bg-gray-100 rounded">{port}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
   
  );
}

