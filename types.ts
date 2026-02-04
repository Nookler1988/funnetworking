export interface ContentStep {
  title: string;
  description: string;
  platform: string;
}

export interface ContentStrategy {
  niche: string;
  steps: ContentStep[];
}

export enum StepType {
  ATTENTION = 'ATTENTION',
  CONNECTION = 'CONNECTION',
  CONVERSION = 'CONVERSION',
}
