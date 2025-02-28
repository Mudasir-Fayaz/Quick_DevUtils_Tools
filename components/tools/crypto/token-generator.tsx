"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateToken } from '@/utils/characterUtils';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Eye, EyeOff,  } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TokenGenerator: React.FC = () => {
  const [options, setOptions] = useState({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [token, setToken] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<number>(0);

  const handleOptionChange = (option: keyof typeof options, value: boolean | number) => {
    setOptions(prev => ({ ...prev, [option]: value }));
  };

  const handleGenerate = useCallback(() => {
    const newToken = generateToken(options);
    setToken(newToken);
  }, [options]);

  const handleCopy = () => {
    navigator.clipboard.writeText(token).then(() => {
      toast({
        title: "Copied!",
        description: "Token copied to clipboard",
      });
    });
  };

  const calculateStrength = useCallback((token: string) => {
    let strength = 0;
    if (token.length >= 8) strength += 1;
    if (token.length >= 12) strength += 1;
    if (/[A-Z]/.test(token)) strength += 1;
    if (/[a-z]/.test(token)) strength += 1;
    if (/[0-9]/.test(token)) strength += 1;
    if (/[^A-Za-z0-9]/.test(token)) strength += 1;
    return strength;
  }, []);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  useEffect(() => {
    setStrength(calculateStrength(token));
  }, [token, calculateStrength]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Length: {options.length}</label>
            <Slider
              value={[options.length]}
              onValueChange={([value]) => handleOptionChange('length', value)}
              max={100}
              min={4}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Uppercase</label>
            <Switch
              checked={options.uppercase}
              onCheckedChange={(checked) => handleOptionChange('uppercase', checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Lowercase</label>
            <Switch
              checked={options.lowercase}
              onCheckedChange={(checked) => handleOptionChange('lowercase', checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Numbers</label>
            <Switch
              checked={options.numbers}
              onCheckedChange={(checked) => handleOptionChange('numbers', checked)}
            />
          </div>
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Symbols</label>
            <Switch
              checked={options.symbols}
              onCheckedChange={(checked) => handleOptionChange('symbols', checked)}
            />
          </div>
        </div>
        <div className="space-y-4">
          <motion.div
            layout
            className="relative"
          >
            <Input
              value={token}
              readOnly
              type={showPassword ? 'text' : 'password'}
              className="w-full pr-24 font-mono"
            />
            <motion.div
              className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2"
             
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-8 w-8"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showPassword ? 'Hide' : 'Show'} token</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleCopy}
                      className="h-8 w-8"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={handleGenerate}
                      className="h-8 w-8"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate new token</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          </motion.div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Token Strength</label>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                style={{ width: `${(strength / 6) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {strength <= 2 ? 'Weak' : strength <= 4 ? 'Medium' : 'Strong'}
            </p>
          </div>
          <Button
            onClick={handleGenerate}
            className="w-full"
          >
            Generate New Token
          </Button>
          <AnimatePresence>
            {token && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
              >
                <h3 className="text-lg font-semibold mb-2">Token Properties</h3>
                <ul className="space-y-1 text-sm">
                  <li>Length: {token.length}</li>
                  <li>Uppercase: {/[A-Z]/.test(token) ? 'Yes' : 'No'}</li>
                  <li>Lowercase: {/[a-z]/.test(token) ? 'Yes' : 'No'}</li>
                  <li>Numbers: {/[0-9]/.test(token) ? 'Yes' : 'No'}</li>
                  <li>Symbols: {/[^A-Za-z0-9]/.test(token) ? 'Yes' : 'No'}</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default TokenGenerator;

