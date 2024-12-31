"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as bip39 from 'bip39';

type Language = 'english' | 'japanese' | 'spanish' | 'italian' | 'french' | 'korean' | 'czech' | 'portuguese' | 'chinese_simplified' | 'chinese_traditional';

const languages: { value: Language; label: string }[] = [
  { value: 'english', label: 'English' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'italian', label: 'Italian' },
  { value: 'french', label: 'French' },
  { value: 'korean', label: 'Korean' },
  { value: 'czech', label: 'Czech' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'chinese_simplified', label: 'Chinese (Simplified)' },
  { value: 'chinese_traditional', label: 'Chinese (Traditional)' },
];

const Bip39Generator: React.FC = () => {
  const [language, setLanguage] = useState<Language>('english');
  const [entropy, setEntropy] = useState<string>('');
  const [mnemonic, setMnemonic] = useState<string>('');
  const [wordCount, setWordCount] = useState<number>(12);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMnemonic = () => {
    setIsGenerating(true);
    try {
      const strength = (wordCount / 3) * 32;
      const newMnemonic = bip39.generateMnemonic(strength);
      setMnemonic(newMnemonic);
      setEntropy(bip39.mnemonicToEntropy(newMnemonic));
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate mnemonic",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  const handleEntropyChange = (value: string) => {
    setEntropy(value);
    try {
      if (value && value.match(/^[0-9a-fA-F]+$/)) {
        const newMnemonic = bip39.entropyToMnemonic(value);
        setMnemonic(newMnemonic);
      }
    } catch  {
      // Invalid entropy - don't update mnemonic
    }
  };

  const handleMnemonicChange = (value: string) => {
    setMnemonic(value);
    try {
      if (bip39.validateMnemonic(value)) {
        setEntropy(bip39.mnemonicToEntropy(value));
      }
    } catch {
      // Invalid mnemonic - don't update entropy
    }
  };

  const handleCopy = (text: string, type: 'entropy' | 'mnemonic') => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${type === 'entropy' ? 'Entropy' : 'Mnemonic'} copied to clipboard`,
      });
    });
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Language:</label>
              <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Word Count: {wordCount}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="ml-2">
                      <Info className="h-4 w-4 inline" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Number of words in the generated mnemonic</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Slider
                value={[wordCount]}
                onValueChange={([value]) => setWordCount(value)}
                max={24}
                min={12}
                step={3}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Entropy (seed):</label>
              <div className="relative">
                <Input
                  value={entropy}
                  onChange={(e) => handleEntropyChange(e.target.value)}
                  placeholder="Enter entropy or generate new mnemonic..."
                  className="pr-24"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleCopy(entropy, 'entropy')}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  disabled={!entropy}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Passphrase (mnemonic):</label>
              <div className="relative">
                <Input
                  value={mnemonic}
                  onChange={(e) => handleMnemonicChange(e.target.value)}
                  placeholder="Enter mnemonic or generate new one..."
                  className="pr-24"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleCopy(mnemonic, 'mnemonic')}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  disabled={!mnemonic}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={generateMnemonic}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Generate New Mnemonic'
            )}
          </Button>

          {mnemonic && bip39.validateMnemonic(mnemonic) && (
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {mnemonic.split(' ').map((word, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                    >
                      <span className="text-gray-500 dark:text-gray-400 mr-2">{index + 1}.</span>
                      {word}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Bip39Generator; 