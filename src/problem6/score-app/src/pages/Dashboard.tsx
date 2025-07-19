import { FC, JSX, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@auth/AuthContext';
import api from '@api/axios';
import { API_PATH } from '@constants/api';
import { leaderboard as getLeaderBoard, personalRank as getPersonalRank } from '@api/score';
import { LeaderboardDto, RankDto } from '@api/dtos/score.dto';
import { debounce, isEmpty, toFinite } from 'lodash';

export const Dashboard: FC = (): JSX.Element => {
  const { user, logout } = useAuth();
  const [personalRank, setPersonalRank] = useState<RankDto | null>(null);
  const [topScores, setTopScores] = useState<LeaderboardDto>([]);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  
  const fetchLeaderboard = async () => {
    console.log({1111: limit});
    const { data } = await getLeaderBoard(limit);
    setTopScores(data);
  };
  
  const fetchPersonalRank = async () => {
    const { data } = await getPersonalRank();
    setPersonalRank(data);
  };
  
  const updateScore = async () => {
    api.post(API_PATH.SCORES.UPDATE_SCORE);
    void fetchLeaderboard();
  };
  
  const rankWithSuffix = (_rank: number): string => {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = _rank % 100;
    const suffix =
      suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    return `${_rank}${suffix}`;
  };
  const getRankMessage = (_rank: number, limit: number): string => {
    if (!_rank) {
      return `You are not ranked on the top ${limit} leaderboard`;
    }
    
    return `You are ranked #${rankWithSuffix(_rank)} on the top ${limit} leaderboard`;
  };
  
  const getRankOverallMessage = (_rank: number): string => {
    return `You are ranked #${rankWithSuffix(_rank)} overall`;
    
  };
  
  const initData = async () => {
    setLoading(true);
    
    void Promise.all([
      fetchLeaderboard(),
      fetchPersonalRank(),
    ]);
    
    setLoading(false);
  };
  
  const debouncedInitData = useMemo(() => debounce(initData, 500), [initData]);
  
  const rank = useMemo(() => topScores.findIndex(u => u.username === user?.username) + 1, [topScores]);
  
  useEffect(() => {
    if (isEmpty(personalRank)) {
      void initData();
    } else {
      void debouncedInitData();
    }
  }, [limit]);
  
  useEffect(() => {
    return () => {
      debouncedInitData.cancel();
    };
  }, [debouncedInitData]);
  
  
  if (loading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-white/80 z-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent'></div>
      </div>
    );
  }
  
  return (
    <div className='p-8 max-w-2xl'>
      <div className="flex justify-between mb-4">
        <div>
          <h1 className='text-xl font-bold'>Hello {user?.username} 👋</h1>
          <p>{getRankMessage(rank, limit)}</p>
          
          {personalRank?.rank && personalRank?.rank > limit && (
            <p>{getRankOverallMessage(personalRank?.rank)}</p>
          )}
        </div>
        
        <button onClick={logout} className='text-red-600'>Logout</button>
      </div>
      
      <div className='flex justify-between items-end'>
        <div>
          <label htmlFor='limit'>Limit</label>
          <input type='number'
                 placeholder='limit'
                 value={limit}
                 min={1}
                 onChange={(e) => {
                   setLimit(toFinite(e.target.value));
                 }}
                 className='w-full mb-4 p-2 border rounded'
          />
        </div>
        
        <div>
          <button onClick={updateScore} className='bg-green-600 text-white px-4 py-2 rounded mb-4'>Cập nhật điểm</button>
        </div>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h2 className='text-lg font-bold mb-2'>Leaderboard top {limit}</h2>
        <ul>
          {topScores.map((item, index) => {
            const isYourRank = item.userId === user?.id;
            
            return (
              <li key={index} className='py-1 border-b'>
                #{index + 1} - {item.username} ({item.score}) {isYourRank && '👈 You are here'}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};