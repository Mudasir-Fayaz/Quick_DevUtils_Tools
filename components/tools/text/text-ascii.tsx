"use client"
import React, { useState, useEffect } from 'react';
import figlet from 'figlet';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import standard from "figlet/importable-fonts/Standard.js"


const fonts = ['Standard', '3-D', 'Doom', 'Slant', 'Banner', 'Ghost', 'Block'];

function TextAscii() {
  const [input, setInput] = useState('Ascii ART');
  const [font, setFont] = useState('Standard');
  const [width, setWidth] = useState(80);
  const [output, setOutput] = useState('');
  const [errored, setErrored] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    figlet.parseFont("Standard", standard);

    setProcessing(true);
    figlet.text(input, { font, width, whitespaceBreak: true } as figlet.Options, (err, text) => {
      if (err) {
        setErrored(true);
        setProcessing(false);
        return;
      }
      setOutput(text || '');
      setErrored(false);
      setProcessing(false);
    });
  }, [input, font, width]);

  return (
    <Card className="max-w-xl p-4">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Your text to draw"
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Select value={font} onValueChange={(value: string) => setFont(value)}>
        <SelectTrigger id="sort">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>

          <SelectContent>
          {fonts.map((f) => (
            <SelectItem key={f} value={f}>{f}</SelectItem>
          ))}
                    </SelectContent>

        </Select>
        <Input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          placeholder="Width of the text"
        />
      </div>
      {processing && (
        <div className="flex items-center justify-center mt-4">
          <span className="ml-2">Loading font...</span>
        </div>
      )}
      {/* {errored && <Alert type="error" className="mt-2">Current settings resulted in an error.</Alert>} */}
      {!processing && !errored && (
        <Textarea value={output} readOnly className="mt-4" />
      )}
    </Card>
  );
};

export default TextAscii;