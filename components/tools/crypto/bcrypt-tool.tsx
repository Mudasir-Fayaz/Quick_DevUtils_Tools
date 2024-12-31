"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Check, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import bcrypt from 'bcryptjs';

const BcryptTool: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [saltRounds, setSaltRounds] = useState(10);
  const [hashedText, setHashedText] = useState('');
  const [compareText, setCompareText] = useState('');
  const [compareHash, setCompareHash] = useState('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [isHashing, setIsHashing] = useState(false);

  const handleHash = async () => {
    if (!inputText) {
      toast({
        title: "Error",
        description: "Please enter text to hash",
        variant: "destructive",
      });
      return;
    }

    setIsHashing(true);
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(inputText, salt);
      setHashedText(hash);
    } catch  {
      toast({
        title: "Error",
        description: "Failed to generate hash",
        variant: "destructive",
      });
    }
    setIsHashing(false);
  };

  const handleCompare = async () => {
    if (!compareText || !compareHash) {
      toast({
        title: "Error",
        description: "Please enter both text and hash to compare",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await bcrypt.compare(compareText, compareHash);
      setIsMatch(result);
    } catch  {
      toast({
        title: "Error",
        description: "Invalid hash format",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hashedText).then(() => {
      toast({
        title: "Copied!",
        description: "Hash copied to clipboard",
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
        
        
        {/* Hash Section */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-semibold">Hash</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Your string:</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Your string to bcrypt..."
              className="mb-4"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Salt rounds: {saltRounds}
            </label>
            <Slider
              value={[saltRounds]}
              onValueChange={([value]) => setSaltRounds(value)}
              max={20}
              min={4}
              step={1}
              className="w-full"
            />
          </div>

          <div className="relative">
            <Input
              value={hashedText}
              readOnly
              placeholder="Hashed result will appear here..."
              className="pr-24"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleCopy}
                disabled={!hashedText}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleHash}
            disabled={isHashing}
            className="w-full"
          >
            {isHashing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Generate Hash'
            )}
          </Button>
        </div>

        {/* Compare Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Compare</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Your string:</label>
            <Textarea
              value={compareText}
              onChange={(e) => setCompareText(e.target.value)}
              placeholder="Your string to compare..."
              className="mb-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your hash:</label>
            <Textarea
              value={compareHash}
              onChange={(e) => setCompareHash(e.target.value)}
              placeholder="Your hash to compare..."
              className="mb-4"
            />
          </div>

          <Button
            onClick={handleCompare}
            className="w-full"
          >
            Compare
          </Button>

          <AnimatePresence>
            {isMatch !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 rounded-lg flex items-center justify-between ${
                  isMatch ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                }`}
              >
                <span className="font-medium">Do they match?</span>
                <span className="flex items-center">
                  {isMatch ? (
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default BcryptTool; 