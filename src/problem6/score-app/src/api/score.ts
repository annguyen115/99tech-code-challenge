import api from '@api/axios';
import { API_PATH } from '@constants/api';
import { LeaderboardDto, RankDto } from '@api/dtos/score.dto';
import { AxiosResponse } from 'axios';

export const leaderboard = (limit?: number): Promise<AxiosResponse<LeaderboardDto>> => {
  return api.get<LeaderboardDto>(API_PATH.SCORES.LEADERBOARD, { params: { top: limit }, showToastOnError: true });
};

export const personalRank = (): Promise<AxiosResponse<RankDto>> => {
  return api.get<RankDto>(API_PATH.SCORES.RANK, { showToastOnError: true });
};

export const updateScore = (newScore: number): Promise<AxiosResponse<{ message: string }>> => {
  return api.put(API_PATH.SCORES.UPDATE_SCORE, { score: newScore }, { showToastOnError: true });
};