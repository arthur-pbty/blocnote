export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
  pinned: boolean;
}

export type SortMode = 'date' | 'alpha';
export type Theme = 'light' | 'dark';
