"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Download, Info } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import forge from 'node-forge';

const RsaGenerator: React.FC = () => {
  const [keySize, setKeySize] = useState<number>(2048);
  const [publicKey, setPublicKey] = useState<string>('');
  const [privateKey, setPrivateKey] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateKeyPair = async () => {
    setIsGenerating(true);
    try {
      // Generate key pair
      const keypair = await new Promise<forge.pki.KeyPair>((resolve, reject) => {
        forge.pki.rsa.generateKeyPair({ bits: keySize }, (err, keypair) => {
          if (err) reject(err);
          else resolve(keypair);
        });
      });

      // Convert to PEM format
      const publicKeyPem = forge.pki.publicKeyToPem(keypair.publicKey);
      const privateKeyPem = forge.pki.privateKeyToPem(keypair.privateKey);

      setPublicKey(publicKeyPem);
      setPrivateKey(privateKeyPem);
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate key pair",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  const handleCopy = (text: string, type: 'public' | 'private') => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${type === 'public' ? 'Public' : 'Private'} key copied to clipboard`,
      });
    });
  };

  const handleDownload = (text: string, type: 'public' | 'private') => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_key.pem`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Key Size (bits): {keySize}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="ml-2">
                    <Info className="h-4 w-4 inline" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Larger key sizes are more secure but slower to generate</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Slider
              value={[keySize]}
              onValueChange={([value]) => setKeySize(value)}
              min={1024}
              max={4096}
              step={8}
              className="w-full"
            />
          </div>

          <Button
            onClick={generateKeyPair}
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Generate Key Pair'
            )}
          </Button>

          <AnimatePresence>
            {publicKey && privateKey && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium">Public Key:</label>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(publicKey, 'public')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownload(publicKey, 'public')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={publicKey}
                        readOnly
                        className="font-mono text-sm"
                        rows={8}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium">Private Key:</label>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopy(privateKey, 'private')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownload(privateKey, 'private')}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={privateKey}
                        readOnly
                        className="font-mono text-sm"
                        rows={8}
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

export default RsaGenerator; 