'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';


interface GitCommand {
  command: string;
  description: string;
  category: string;
}

const gitCommands: GitCommand[] = [
  { command: 'git init', description: 'Initialize a new Git repository', category: 'Basic' },
  { command: 'git clone <url>', description: 'Clone a repository', category: 'Basic' },
  { command: 'git add <file>', description: 'Add file to staging area', category: 'Basic' },
  { command: 'git commit -m "<message>"', description: 'Commit changes', category: 'Basic' },
  { command: 'git push', description: 'Push changes to remote repository', category: 'Remote' },
  { command: 'git pull', description: 'Pull changes from remote repository', category: 'Remote' },
  { command: 'git branch', description: 'List branches', category: 'Branching' },
  { command: 'git checkout -b <branch-name>', description: 'Create and switch to a new branch', category: 'Branching' },
  { command: 'git merge <branch>', description: 'Merge a branch into the current branch', category: 'Merging' },
  { command: 'git stash', description: 'Stash changes', category: 'Stashing' },
];

export default function GitCheatsheet() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredCommands = gitCommands.filter(cmd => 
    (category === 'All' || cmd.category === category) &&
    (cmd.command.toLowerCase().includes(search.toLowerCase()) || 
     cmd.description.toLowerCase().includes(search.toLowerCase()))
  );

  const categories = ['All', ...new Set(gitCommands.map(cmd => cmd.category))];

  const toggleFavorite = (command: string) => {
    setFavorites(prev => 
      prev.includes(command) ? prev.filter(c => c !== command) : [...prev, command]
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportToMarkdown = () => {
    const markdown = filteredCommands.map(cmd => `- \`${cmd.command}\`: ${cmd.description}`).join('\n');
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'git-cheatsheet.md';
    a.click();
  };

  return (<>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search commands..."
          className="w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <motion.ul layout className="space-y-2">
        {filteredCommands.map((cmd) => (
          <motion.li
            key={cmd.command}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-2 border rounded hover:bg-gray-100 hover:text-black"
          >
            <div className="flex justify-between items-center">
              <code className="font-mono">{cmd.command}</code>
              <div>
                <button
                  onClick={() => toggleFavorite(cmd.command)}
                  className={`mr-2 ${favorites.includes(cmd.command) ? 'text-yellow-500' : 'text-gray-500'}`}
                >
                  ★
                </button>
                <button
                  onClick={() => copyToClipboard(cmd.command)}
                  className="text-blue-500"
                >
                  Copy
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{cmd.description}</p>
          </motion.li>
        ))}
      </motion.ul>
      <button
        onClick={exportToMarkdown}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export to Markdown
      </button>
   </>
  );
}

