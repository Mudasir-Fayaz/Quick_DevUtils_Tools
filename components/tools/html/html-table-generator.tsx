'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Copy, Download } from 'lucide-react'

type CellContent = string[][];

// Component props (if any, based on usage)

 const HtmlTableGen = () => {
  // Define types for state variables
  const [rows, setRows] = useState<number | string>(3); // Rows can be either number or string
  const [cols, setCols] = useState<number | string>(3); // Columns can be either number or string
  const [hasHeader, setHasHeader] = useState<boolean>(true); // Whether the table has a header
  const [cellContent, setCellContent] = useState<CellContent>(() => Array(3).fill(0).map(() => Array(3).fill(''))); // 2D array of strings
  const [alignment, setAlignment] = useState<string>('left'); // Text alignment (e.g., 'left', 'right', 'center')
  const [padding, setPadding] = useState<number>(8); // Padding for cells in px
  const [spacing, setSpacing] = useState<number>(2); // Spacing between cells in px
  const [borderStyle, setBorderStyle] = useState<string>('solid'); // Border style (e.g., 'solid', 'dashed')
  const [borderWidth, setBorderWidth] = useState<number>(1); // Border width in px
  const [headerBgColor, setHeaderBgColor] = useState<string>('#f3f4f6'); // Header background color
  const [cellBgColor, setCellBgColor] = useState<string>('#ffffff'); // Cell background color
  const [headerTextColor, setHeaderTextColor] = useState<string>('#000000'); // Header text color
  const [cellTextColor, setCellTextColor] = useState<string>('#000000'); // Cell text color
  const [tableWidth, setTableWidth] = useState<string>('100%'); // Table width (e.g., '100%', 'auto')
  const [isResponsive, setIsResponsive] = useState<boolean>(true); // Whether the table is responsive
  const [hasZebraStripes, setHasZebraStripes] = useState<boolean>(false); // Whether zebra stripes are enabled
  const [hasHoverEffect, setHasHoverEffect] = useState<boolean>(true); // Whether hover effect is enabled
  const [caption, setCaption] = useState<string>(''); // Table caption
  const [cssFramework, setCssFramework] = useState<string>('tailwind'); // CSS framework used
  const [generatedHtml, setGeneratedHtml] = useState<string>(''); // Generated HTML code
  const [generatedCss, setGeneratedCss] = useState<string>(''); // Generated CSS code

  useEffect(() => {
    setCellContent(prevContent => {
      let newContent: CellContent = [];
      if (rows && cols) {
        newContent = Array(rows).fill(0).map((_, i) =>
          Array(cols).fill(0).map((_, j) =>
            prevContent[i]?.[j] || ''
          )
        );
      }
      return newContent;
    });
  }, [rows, cols]);

  

  const generateTable = () => {
    let html = `<table class="table-auto ${isResponsive ? 'responsive' : ''} ${hasZebraStripes ? 'zebra-stripe' : ''} ${hasHoverEffect ? 'hover-effect' : ''}">\n`;
    if (caption) {
      html += `  <caption>${caption}</caption>\n`;
    }
    if (hasHeader) {
      html += '  <thead>\n    <tr>\n';
      const numericCols = typeof cols === 'number' ? cols : Number(cols); // Coerce `cols` to number if it's a string

      for (let i = 0; i < numericCols; i++) {
        html += `      <th>${cellContent[0]?.[i] || `Header ${i + 1}`}</th>\n`;
      }
      html += '    </tr>\n  </thead>\n';
    }
    html += '  <tbody>\n';
    const numericRows = typeof rows === 'number' ? rows : Number(rows); // Coerce `cols` to number if it's a string

    for (let i = hasHeader ? 1 : 0; i < numericRows; i++) {
      html += '    <tr>\n';
      const numericCols = typeof cols === 'number' ? cols : Number(cols); // Coerce `cols` to number if it's a string

      for (let j = 0; j < numericCols; j++) {
        html += `      <td>${cellContent[i]?.[j] || `Cell ${i},${j}`}</td>\n`;
      }
      html += '    </tr>\n';
    }
    html += '  </tbody>\n</table>';

    setGeneratedHtml(html);

    const css = `
.table-auto {
  width: ${tableWidth};
  border-collapse: separate;
  border-spacing: ${spacing}px;
}
.table-auto th, .table-auto td {
  border: ${borderWidth}px ${borderStyle} #000;
  padding: ${padding}px;
  text-align: ${alignment};
}
.table-auto th {
  background-color: ${headerBgColor};
  color: ${headerTextColor};
}
.table-auto td {
  background-color: ${cellBgColor};
  color: ${cellTextColor};
}
.responsive {
  overflow-x: auto;
}
.zebra-stripe tr:nth-child(even) {
  background-color: #f2f2f2;
}
.hover-effect tr:hover {
  background-color: #e6e6e6;
}
`;

    setGeneratedCss(css);
  };

  useEffect(() => {
    generateTable();
  }, [
    rows, cols, hasHeader, cellContent, alignment, padding, spacing,
    borderStyle, borderWidth, headerBgColor, cellBgColor, headerTextColor,
    cellTextColor, tableWidth, isResponsive, hasZebraStripes, hasHoverEffect,
    caption, cssFramework, generateTable
  ]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  };


  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rows">Rows</Label>
              <Input
                id="rows"
                type="number"
                value={rows}
                onChange={(e) => setRows(e.target.value === "" ? "" : parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div>
              <Label htmlFor="cols">Columns</Label>
              <Input
                id="cols"
                type="number"
                value={cols}
                onChange={(e) => setCols(e.target.value === "" ? "" : parseInt(e.target.value))}
                min="1"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="hasHeader"
              checked={hasHeader}
              onCheckedChange={setHasHeader}
            />
            <Label htmlFor="hasHeader">Header Row</Label>
          </div>
          <div>
            <Label htmlFor="alignment">Text Alignment</Label>
            <Select value={alignment} onValueChange={setAlignment}>
              <SelectTrigger>
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="padding">Cell Padding</Label>
            <Slider
              id="padding"
              min={0}
              max={20}
              step={1}
              value={[padding]}
              onValueChange={(value) => setPadding(value[0])}
            />
          </div>
          <div>
            <Label htmlFor="spacing">Cell Spacing</Label>
            <Slider
              id="spacing"
              min={0}
              max={10}
              step={1}
              value={[spacing]}
              onValueChange={(value) => setSpacing(value[0])}
            />
          </div>
          <div>
            <Label htmlFor="borderStyle">Border Style</Label>
            <Select value={borderStyle} onValueChange={setBorderStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select border style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="borderWidth">Border Width</Label>
            <Slider
              id="borderWidth"
              min={0}
              max={5}
              step={1}
              value={[borderWidth]}
              onValueChange={(value) => setBorderWidth(value[0])}
            />
          </div>
          <div>
            <Label>Header Background Color</Label>
            <ColorPicker color={headerBgColor} onChange={setHeaderBgColor} />
          </div>
          <div>
            <Label>Cell Background Color</Label>
            <ColorPicker color={cellBgColor} onChange={setCellBgColor} />
          </div>
          <div>
            <Label>Header Text Color</Label>
            <ColorPicker color={headerTextColor} onChange={setHeaderTextColor} />
          </div>
          <div>
            <Label>Cell Text Color</Label>
            <ColorPicker color={cellTextColor} onChange={setCellTextColor} />
          </div>
          <div>
            <Label htmlFor="tableWidth">Table Width</Label>
            <Select value={tableWidth} onValueChange={setTableWidth}>
              <SelectTrigger>
                <SelectValue placeholder="Select table width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="100%">Full Width</SelectItem>
                <SelectItem value="75%">75%</SelectItem>
                <SelectItem value="50%">50%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="isResponsive"
              checked={isResponsive}
              onCheckedChange={setIsResponsive}
            />
            <Label htmlFor="isResponsive">Responsive Table</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="hasZebraStripes"
              checked={hasZebraStripes}
              onCheckedChange={setHasZebraStripes}
            />
            <Label htmlFor="hasZebraStripes">Zebra Striping</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="hasHoverEffect"
              checked={hasHoverEffect}
              onCheckedChange={setHasHoverEffect}
            />
            <Label htmlFor="hasHoverEffect">Hover Effect</Label>
          </div>
          <div>
            <Label htmlFor="caption">Table Caption</Label>
            <Input
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter table caption"
            />
          </div>
          <div>
            <Label htmlFor="cssFramework">CSS Framework</Label>
            <Select value={cssFramework} onValueChange={setCssFramework}>
              <SelectTrigger>
                <SelectValue placeholder="Select CSS framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vanilla">Vanilla CSS</SelectItem>
                <SelectItem value="tailwind">Tailwind CSS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Tabs defaultValue="preview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
            </TabsList>
            <TabsContent value="preview" className="border p-4 rounded-md">
              <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: generatedHtml }} />
              <style>{generatedCss}</style>
            </TabsContent>
            <TabsContent value="html" className="border p-4 rounded-md">
              <pre className="whitespace-pre-wrap">{generatedHtml}</pre>
              <Button onClick={() => copyToClipboard(generatedHtml)} className="mt-2">
                <Copy className="mr-2 h-4 w-4" /> Copy HTML
              </Button>
            </TabsContent>
            <TabsContent value="css" className="border p-4 rounded-md">
              <pre className="whitespace-pre-wrap">{generatedCss}</pre>
              <Button onClick={() => copyToClipboard(generatedCss)} className="mt-2">
                <Copy className="mr-2 h-4 w-4" /> Copy CSS
              </Button>
            </TabsContent>
          </Tabs>
          <div className="mt-4 space-x-2">
            <Button onClick={() => downloadFile(generatedHtml, 'table.html', 'text/html')}>
              <Download className="mr-2 h-4 w-4" /> Download HTML
            </Button>
            <Button onClick={() => downloadFile(generatedCss, 'table.css', 'text/css')}>
              <Download className="mr-2 h-4 w-4" /> Download CSS
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ColorPickerProps {
  color: string;  // The current color as a string (e.g., hex or rgb)
  onChange: (newColor: string) => void;  // The callback function to handle color changes
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  
  return (
    <div className="flex items-center space-x-2">
      <div
        className="w-8 h-8 border border-gray-300 rounded"
        style={{ backgroundColor: color }}
      />
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-16 h-8"
      />
    </div>
  )
}

export default HtmlTableGen;