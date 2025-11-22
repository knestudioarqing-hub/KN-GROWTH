export interface Project {
  id: number;
  title: string;
  category: 'Landing Page' | 'Web Site' | 'E-Commerce';
  image: string;
  description: string;
  tags: string[];
  link: string;
}

export interface AiStrategyResponse {
  headline: string;
  keyPoints: string[];
  callToAction: string;
}

export enum LoadState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}