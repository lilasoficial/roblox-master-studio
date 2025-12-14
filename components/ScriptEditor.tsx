import React, { useState } from 'react';
import { generateLuaScript, analyzeScript } from '../services/gemini';
import { Play, Bug, Download, Copy, Check } from 'lucide-react';
import { Language } from '../types';
import { TEXTS } from '../constants';

interface ScriptEditorProps {
  lang: Language;
}

export const ScriptEditor: React.FC<ScriptEditorProps> = ({ lang }) => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('-- Generated code will appear here\nprint("Hello Roblox")');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateLuaScript(prompt);
    setCode(result);
    setLoading(false);
  };

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    setLoading(true);
    const result = await analyzeScript(code);
    setCode(prev => `${prev}\n\n--[[\nANALYSIS REPORT:\n${result}\n]]`);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            {TEXTS['script.title'][lang]}
          </h2>
          <p className="text-gray-400 mt-1">
            {lang === 'pt' ? 'Gere scripts complexos em segundos ou otimize seu código existente.' : 'Generate complex scripts in seconds or optimize existing code.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Control */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {TEXTS['script.input'][lang]}
            </label>
            <textarea
              className="w-full h-40 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none resize-none"
              placeholder={lang === 'pt' ? 'Ex: Crie um sistema de loja onde o jogador pisa num botão e compra uma espada por 100 moedas.' : 'Ex: Create a shop system where player steps on a button to buy a sword for 100 coins.'}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="mt-3 w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> : <Play size={18} />}
              {TEXTS['script.gen'][lang]}
            </button>
          </div>

           <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
             <h4 className="text-white font-medium mb-2">{lang === 'pt' ? 'Ações Rápidas' : 'Quick Actions'}</h4>
             <div className="flex gap-2 flex-wrap">
                <button 
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 border border-blue-500/30 py-2 px-3 rounded-lg text-sm transition-colors"
                >
                  <Bug size={16} />
                  {TEXTS['script.fix'][lang]}
                </button>
                <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-3 rounded-lg text-sm transition-colors">
                  <Download size={16} />
                  .lua
                </button>
             </div>
           </div>
        </div>

        {/* Code Editor Display */}
        <div className="lg:col-span-2 relative">
          <div className="absolute top-0 right-0 p-2 flex gap-2">
            <button 
              onClick={copyToClipboard}
              className="p-2 bg-gray-700/80 hover:bg-gray-600 rounded-md text-gray-300 backdrop-blur-sm"
              title="Copy Code"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
          <div className="w-full h-[500px] bg-[#1e1e1e] rounded-xl border border-gray-700 overflow-hidden font-mono text-sm shadow-inner">
            <div className="flex border-b border-gray-700 bg-[#252526] px-4 py-2">
               <div className="flex gap-1.5 items-center">
                 <div className="w-3 h-3 rounded-full bg-red-500" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
                 <div className="w-3 h-3 rounded-full bg-green-500" />
               </div>
               <span className="ml-4 text-gray-400 text-xs">script.server.lua</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full bg-transparent p-4 text-gray-300 focus:outline-none resize-none"
              style={{ lineHeight: '1.5' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};