"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, Download, Volume2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const natoAlphabet: { [key: string]: string } = {
  'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta',
  'E': 'Echo', 'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel',
  'I': 'India', 'J': 'Juliet', 'K': 'Kilo', 'L': 'Lima',
  'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa',
  'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
  'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray',
  'Y': 'Yankee', 'Z': 'Zulu',
  '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three',
  '4': 'Four', '5': 'Five', '6': 'Six', '7': 'Seven',
  '8': 'Eight', '9': 'Nine',
  '.': 'Decimal Point', ',': 'Comma', '!': 'Exclamation',
  '?': 'Question', ' ': '(Space)', '-': 'Dash'
};

const NatoAlphabetConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const convertToNato = (text: string): string => {
    return text.toUpperCase().split('').map(char => {
      return natoAlphabet[char] || char;
    }).join(' ');
  };

  useEffect(() => {
    setResult(convertToNato(input));
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      toast({
        title: "Copied!",
        description: "NATO phonetic text copied to clipboard",
      });
    });
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nato-phonetic.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const speak = async () => {
    if ('speechSynthesis' in window) {
      setSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(result);
      utterance.rate = 0.8;
      utterance.onend = () => setSpeaking(false);
      speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Error",
        description: "Speech synthesis not supported in your browser",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto space-y-6"
    >
      <div>
        

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Text to Convert:</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert to NATO phonetic alphabet..."
              className="min-h-[100px]"
            />
          </div>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium">
                          NATO Phonetic:
                        </label>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={speak}
                            disabled={speaking}
                          >
                            <Volume2 className={`h-4 w-4 mr-2 ${speaking ? 'animate-pulse' : ''}`} />
                            {speaking ? 'Speaking...' : 'Speak'}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCopy}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleDownload}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={result}
                        readOnly
                        className="min-h-[100px] font-mono"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default NatoAlphabetConverter; 