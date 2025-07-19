import { FC, JSX, useEffect, useState } from 'react';
import { Score } from '@appTypes/score';
import { useAuth } from '@auth/AuthContext';
import api from '@api/axios';
import { API_PATH } from '@constants/api';

export const Dashboard: FC = (): JSX.Element => {
  const { user, logout } = useAuth();
  const [topScores, setTopScores] = useState<Score[]>([]);
  
  const fetchScores = async () => {
    const { data } = await api.get(API_PATH.SCORES.LEADERBOARD);
    setTopScores(data);
  };
  
  const updateScore = async () => {
    await api.post(API_PATH.SCORES.UPDATE_SCORE);
    void fetchScores();
  };
  
  useEffect(() => {
    void fetchScores();
  }, []);
  
  const rank = topScores.findIndex(u => u.username === user?.username) + 1;
  
  return (
    <div className="p-8">
      <div className="flex justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">Xin chào {user?.username}</h1>
          <p>Bạn đang ở hạng #{rank || 'chưa có điểm'} trên bảng xếp hạng</p>
        </div>
        <button onClick={logout} className="text-red-600">Logout</button>
      </div>
      <button onClick={updateScore} className="bg-green-600 text-white px-4 py-2 rounded mb-4">Cập nhật điểm</button>
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-bold mb-2">Top 10</h2>
        <ul>
          {topScores.map((u, i) => (
            <li key={i} className="py-1 border-b">#{i + 1} - {u.username} ({u.score})</li>
          ))}
        </ul>
      </div>
    </div>
  );
};