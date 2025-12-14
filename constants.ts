import { Translation } from './types';
import { LayoutDashboard, Lightbulb, ScrollText, Map, Box, Monitor, Gamepad2, GraduationCap, BarChart2 } from 'lucide-react';

export const TEXTS: Translation = {
  // General
  'app.name': { en: 'Roblox Master Studio', pt: 'Roblox Master Studio' },
  'btn.start': { en: 'Start for Free', pt: 'Comece Grátis' },
  'btn.tutorial': { en: 'Quick Tutorial', pt: 'Tutorial Rápido' },
  'btn.login': { en: 'Enter Studio', pt: 'Entrar no Studio' },
  'login.placeholder': { en: 'Enter Roblox Username', pt: 'Digite seu usuário Roblox' },
  
  // Nav
  'nav.dashboard': { en: 'Dashboard', pt: 'Painel' },
  'nav.ideas': { en: 'Ideas', pt: 'Ideias' },
  'nav.scripts': { en: 'Scripts', pt: 'Scripts' },
  'nav.maps': { en: 'Maps', pt: 'Cenários' },
  'nav.models': { en: 'Models', pt: 'Modelagem' },
  'nav.gui': { en: 'GUI', pt: 'Interface' },
  'nav.gameplay': { en: 'Gameplay', pt: 'Jogabilidade' },
  'nav.learning': { en: 'Learning', pt: 'Aprendizado' },
  'nav.extras': { en: 'Extras', pt: 'Extras' },

  // Dashboard
  'dash.welcome': { en: 'Welcome back,', pt: 'Bem-vindo de volta,' },
  'dash.recent': { en: 'Recent Projects', pt: 'Projetos Recentes' },
  'dash.new': { en: 'New Project', pt: 'Novo Projeto' },
  
  // Ideas
  'idea.title': { en: 'AI Idea Generator', pt: 'Gerador de Ideias IA' },
  'idea.desc': { en: 'Generate unique game concepts or refine your own.', pt: 'Gere conceitos únicos ou refine os seus.' },
  'idea.btn.generate': { en: 'Generate Ideas', pt: 'Gerar Ideias' },
  'idea.btn.refine': { en: 'Refine My Idea', pt: 'Refinar Minha Ideia' },
  
  // Scripts
  'script.title': { en: 'Lua Scripting Assistant', pt: 'Assistente de Script Lua' },
  'script.gen': { en: 'Generate Script', pt: 'Gerar Script' },
  'script.fix': { en: 'Analyze & Fix', pt: 'Analisar e Corrigir' },
  'script.input': { en: 'Describe what you want the script to do...', pt: 'Descreva o que o script deve fazer...' },
  
  // Chat
  'chat.placeholder': { en: 'Ask me anything about Roblox dev...', pt: 'Pergunte sobre desenvolvimento Roblox...' },
  'chat.title': { en: 'AI Assistant', pt: 'Assistente IA' },
};

export const MOCK_PROJECTS = [
  { id: '1', name: 'Neon City Tycoon', type: 'Tycoon', lastEdited: '2h ago', progress: 65 },
  { id: '2', name: 'Zombie Survival Z', type: 'Survival', lastEdited: '1d ago', progress: 30 },
  { id: '3', name: 'Mystery Obby', type: 'Obby', lastEdited: '5d ago', progress: 90 },
];

export const NAV_ITEMS = [
  { view: 'DASHBOARD', icon: LayoutDashboard, labelKey: 'nav.dashboard' },
  { view: 'IDEAS', icon: Lightbulb, labelKey: 'nav.ideas' },
  { view: 'SCRIPTS', icon: ScrollText, labelKey: 'nav.scripts' },
  { view: 'MAPS', icon: Map, labelKey: 'nav.maps' },
  { view: 'MODELING', icon: Box, labelKey: 'nav.models' },
  { view: 'GUI', icon: Monitor, labelKey: 'nav.gui' },
  { view: 'GAMEPLAY', icon: Gamepad2, labelKey: 'nav.gameplay' },
  { view: 'LEARNING', icon: GraduationCap, labelKey: 'nav.learning' },
  { view: 'EXTRAS', icon: BarChart2, labelKey: 'nav.extras' },
];