"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Copy,  } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  cmyk: string;
}

const ColorConverter: React.FC = () => {
  const [color, setColor] = useState('#000000');
  const [formats, setFormats] = useState<ColorFormats>({
    hex: '#000000',
    rgb: 'rgb(0, 0, 0)',
    hsl: 'hsl(0, 0%, 0%)',
    cmyk: 'cmyk(0%, 0%, 0%, 100%)'
  });

  const hexToRgb = (hex: string): number[] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [0, 0, 0];
  };

  const rgbToHsl = (r: number, g: number, b: number): number[] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s;
    const l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const rgbToCmyk = (r: number, g: number, b: number): number[] => {
    if (r === 0 && g === 0 && b === 0) {
      return [0, 0, 0, 100];
    }

    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    let k = Math.min(c, Math.min(m, y));

    c = Math.round(((c - k) / (1 - k)) * 100);
    m = Math.round(((m - k) / (1 - k)) * 100);
    y = Math.round(((y - k) / (1 - k)) * 100);
    k = Math.round(k * 100);

    return [c, m, y, k];
  };

  const updateFormats = (hex: string) => {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    const cmyk = rgbToCmyk(rgb[0], rgb[1], rgb[2]);

    setFormats({
      hex: hex,
      rgb: `rgb(${rgb.join(', ')})`,
      hsl: `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`,
      cmyk: `cmyk(${cmyk[0]}%, ${cmyk[1]}%, ${cmyk[2]}%, ${cmyk[3]}%)`
    });
  };

  useEffect(() => {
    updateFormats(color);
  }, [color]);

  const handleCopy = (text: string, format: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${format} color code copied to clipboard`,
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
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium mb-2">Color Picker:</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-12 w-24"
                />
                <Input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#000000"
                  className="flex-1 font-mono"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center">
              <div 
                className="w-32 h-32 rounded-lg shadow-lg border"
                style={{ backgroundColor: color }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(formats).map(([format, value]) => (
              <Card key={format}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium capitalize">
                      {format.toUpperCase()}:
                    </label>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(value, format)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <code className="block text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded break-all font-mono">
                    {value}
                  </code>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ColorConverter; 