export type Language = 'en' | 'pt';

export enum AppView {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  IDEAS = 'IDEAS',
  SCRIPTS = 'SCRIPTS',
  MAPS = 'MAPS',
  MODELING = 'MODELING',
  GUI = 'GUI',
  GAMEPLAY = 'GAMEPLAY',
  LEARNING = 'LEARNING',
  EXTRAS = 'EXTRAS'
}

export interface User {
  username: string;
  avatarUrl: string;
}

export interface Project {
  id: string;
  name: string;
  type: string;
  lastEdited: string;
  progress: number;
}

export interface Translation {
  [key: string]: {
    en: string;
    pt: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}