export interface ScoreDto {
  userId: string;
  username: string;
  fullName: string;
  score: number;
}

export type RankDto = {
  userId: string;
  username: string;
  rank: number;
  score: number;
};

export type LeaderboardDto = ScoreDto[];