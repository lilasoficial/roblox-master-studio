import React, { useState } from 'react';
import { generateGameIdeas } from '../services/gemini';
import { Sparkles, RefreshCw, Zap } from 'lucide-react';
import { Language } from '../types';
import { TEXTS } from '../constants';

interface IdeaGeneratorProps {
  lang: Language;
}

export const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ lang }) => {
  const [selectedGenre, setSelectedGenre] = useState('RPG');
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const genres = ['RPG', 'Survival', 'Tycoon', 'Obby', 'FPS', 'Horror', 'Simulator'];

  const handleGenerate = async () => {
    setLoading(true);
    setIdeas([]); // Clear previous
    try {
      const jsonStr = await generateGameIdeas(selectedGenre, lang);
      // Remove markdown code blocks if present
      const cleanJson = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      if (Array.isArray(parsed)) {
        setIdeas(parsed);
      }
    } catch (e) {
      console.error("Failed to parse ideas", e);
      // Fallback manual error or raw text display logic could go here
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold text-white mb-2">{TEXTS['idea.title'][lang]}</h2>
        <p className="text-gray-400">{TEXTS['idea.desc'][lang]}</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-2">
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedGenre === g 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-white transition-all duration-200 bg-purple-600 font-lg rounded-full hover:bg-purple-700 focus:outline-none ring-offset-2 focus:ring-2 ring-purple-400"
        >
          {loading ? (
             <RefreshCw className="animate-spin mr-2" />
          ) : (
             <Sparkles className="mr-2 group-hover:rotate-12 transition-transform" />
          )}
          {TEXTS['idea.btn.generate'][lang]}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {ideas.map((idea, idx) => (
          <div key={idx} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-colors flex flex-col h-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-purple-900/50 rounded-lg text-purple-400">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-bold text-white">{idea.title}</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4 flex-grow">{idea.description}</p>
            <div className="bg-gray-900/50 p-3 rounded-lg">
              <p className="text-xs text-blue-300 font-semibold mb-1 uppercase tracking-wider">Mechanics</p>
              <p className="text-xs text-gray-400">{idea.mechanics}</p>
            </div>
            <button className="mt-4 w-full py-2 text-sm text-center text-purple-300 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-colors">
              {TEXTS['idea.btn.refine'][lang]}
            </button>
          </div>
        ))}
        {loading && Array.from({ length: 3 }).map((_, i) => (
           <div key={i} className="bg-gray-800 rounded-xl p-6 border border-gray-700 animate-pulse h-64">
             <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
             <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
             <div className="h-4 bg-gray-700 rounded w-5/6 mb-2"></div>
             <div className="h-4 bg-gray-700 rounded w-4/6"></div>
           </div>
        ))}
      </div>
    </div>
  );
};