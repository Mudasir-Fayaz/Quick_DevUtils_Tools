'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';


export default function DockerComposeConverter() {
  const [dockerRun, setDockerRun] = useState('');
  const [dockerCompose, setDockerCompose] = useState('');

  const convertToDockerCompose = () => {
    // This is a very basic converter. A real implementation would be more complex.
    const parts = dockerRun.split(' ');
    let name = '';
    let image = '';
    let ports: string[] = [];
    let volumes: string[] = [];
    let environment: string[] = [];

    for (let i = 0; i < parts.length; i++) {
      switch (parts[i]) {
        case '--name':
          name = parts[++i];
          break;
        case '-p':
          ports.push(parts[++i]);
          break;
        case '-v':
          volumes.push(parts[++i]);
          break;
        case '-e':
          environment.push(parts[++i]);
          break;
        default:
          if (!image && !parts[i].startsWith('-')) {
            image = parts[i];
          }
      }
    }

    const yaml = `
version: '3'
services:
  ${name}:
    image: ${image}
    ${ports.length ? `ports:
      ${ports.map(p => `- "${p}"`).join('\n      ')}` : ''}
    ${volumes.length ? `volumes:
      ${volumes.map(v => `- ${v}`).join('\n      ')}` : ''}
    ${environment.length ? `environment:
      ${environment.map(e => `- ${e}`).join('\n      ')}` : ''}
`;

    setDockerCompose(yaml.trim());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dockerCompose);
  };

  const exportToFile = () => {
    const blob = new Blob([dockerCompose], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'docker-compose.yml';
    a.click();
  };

  return (
   
      <div className="space-y-4">
        <textarea
          value={dockerRun}
          onChange={(e) => setDockerRun(e.target.value)}
          className="w-full h-40 p-2 border rounded"
          placeholder="Enter your docker run command here..."
        />
        <button
          onClick={convertToDockerCompose}
          className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Convert to Docker Compose
        </button>
        {dockerCompose && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4  rounded"
          >
            <h2 className="text-lg font-semibold mb-2">Generated Docker Compose</h2>
            <pre className="whitespace-pre-wrap p-2 rounded">{dockerCompose}</pre>
            <div className="mt-2 space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-1 bg-blue-500  rounded hover:bg-blue-600"
              >
                Copy
              </button>
              <button
                onClick={exportToFile}
                className="p-1 bg-blue-500  rounded hover:bg-blue-600"
              >
                Export
              </button>
            </div>
          </motion.div>
        )}
      </div>
   
  );
}

