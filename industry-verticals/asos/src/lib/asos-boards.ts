import { STORY } from '@/lib/asos-journey';

export type SharedBoard = {
  id: string;
  title: string;
  productIds: string[];
};

export const SHARED_BOARDS: SharedBoard[] = [
  {
    id: 'e5ebfcdb-7e61-473f-afc8-b0c973561d04',
    title: 'Berlin, October',
    productIds: [...STORY.berlinIds],
  },
  {
    id: '2cef0973-eb40-4f9e-a4fe-76e8b69764ba',
    title: 'Wide-leg jeans',
    productIds: ['8805001', '8805002', '8805003', '8805004', '8805005'],
  },
];

export function boardFromPath(path: string): SharedBoard | undefined {
  const match = path.match(/\/shared-board\/([0-9a-f-]{36})/i);
  if (!match) return undefined;
  return SHARED_BOARDS.find((board) => board.id === match[1].toLowerCase());
}
