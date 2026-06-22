export type LeaderboardEntry = {
  id: string;
  pseudo: string;
  globalScore: number;
  rank: number;
};

export type LeaderboardUserResult = {
  exists: boolean;
  hasPlayed: boolean;
  rank: number | null;
  user: {
    id: string;
    pseudo: string;
    globalScore: number;
  } | null;
};
