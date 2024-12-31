'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';


export default function EmailNormalizer() {
  const [emails, setEmails] = useState('');
  const [normalizedEmails, setNormalizedEmails] = useState<string[]>([]);

  const normalizeEmails = () => {
    const emailList = emails.split(/[\s,]+/);
    const normalized = emailList.map(email => {
      // Convert to lowercase
      let normalized = email.toLowerCase();
      
      // Remove dots from Gmail addresses
      if (normalized.endsWith('@gmail.com')) {
        const [local, domain] = normalized.split('@');
        normalized = `${local.replace(/\./g, '')}@${domain}`;
      }
      
      // Correct common typos
      normalized = normalized
        .replace(/@gmial\.com$/, '@gmail.com')
        .replace(/@yaho\.com$/, '@yahoo.com')
        .replace(/@outloo\.com$/, '@outlook.com');
      
      return normalized;
    });
    
    // Remove duplicates
    setNormalizedEmails([...new Set(normalized)]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(normalizedEmails.join('\n'));
  };

  const exportToFile = () => {
    const blob = new Blob([normalizedEmails.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'normalized_emails.txt';
    a.click();
  };

  return (
   
      <div className="space-y-4">
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="w-full h-40 p-2 border rounded"
          placeholder="Enter email addresses, separated by commas or newlines..."
        />
        <button
          onClick={normalizeEmails}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Normalize Emails
        </button>
        {normalizedEmails.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-gray-100 rounded"
          >
            <h2 className="text-lg font-semibold mb-2">Normalized Emails</h2>
            <ul className="list-disc pl-5">
              {normalizedEmails.map((email, index) => (
                <li key={index}>{email}</li>
              ))}
            </ul>
            <div className="mt-2 space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy
              </button>
              <button
                onClick={exportToFile}
                className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Export
              </button>
            </div>
          </motion.div>
        )}
      </div>
   
  );
}

