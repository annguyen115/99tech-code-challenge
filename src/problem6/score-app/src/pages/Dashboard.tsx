import { FC, JSX, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@auth/AuthContext';
import { leaderboard as getLeaderBoard, personalRank as getPersonalRank, updateScore as updatePersonalScore } from '@api/score';
import { LeaderboardDto, RankDto } from '@api/dtos/score.dto';
import { debounce, isEmpty, toFinite } from 'lodash';
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';
import { appConfig } from '@config/config';

const socket: Socket = io(appConfig.REACT_APP_SOCKET_SERVER_SCORE_URL);
export const Dashboard: FC = (): JSX.Element => {
  const { user, logout } = useAuth();
  
  const [personalRank, setPersonalRank] = useState<RankDto | null>(null);
  const [topScores, setTopScores] = useState<LeaderboardDto>([]);
  const [limit, setLimit] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  
  
  const fetchLeaderboard = async () => {
    const { data } = await getLeaderBoard(limit);
    setTopScores(data);
  };
  
  const fetchPersonalRank = async () => {
    const { data } = await getPersonalRank();
    setPersonalRank(data);
  };
  
  const updateScore = async (newScore: number) => {
    const { data } = await updatePersonalScore(newScore);
    toast.success(data.message);
    // void initData();
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
  
  const getRankOverallMessage = (_rank: number, score: number): string => {
    return `You are ranked #${rankWithSuffix(_rank)} overall with a score of ${score}`;
    
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
  
  useEffect(() => {
    socket.on('connect', () => {
      setIsSocketConnected(true);
      console.log('[✅ Socket connected]', socket.id);
    });
    
    socket.on('connect_error', (err) => {
      setIsSocketConnected(false);
      console.error('[❌ Socket connect error]', err.message);
    });
    
    socket.on('score-updated', () => {
      console.log('score-updated received!');
      void initData();
    });
    
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('score-updated');
    };
  }, [limit]);
  
  if (loading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-white/80 z-50'>
        <div className='animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent'></div>
      </div>
    );
  }
  
  return (
    <div className='p-8 max-w-3xl'>
      <div className='px-1'>
        <div className='flex justify-between mb-4'>
          <div>
            <h1 className='text-xl font-bold'>Hello {user?.username} 👋</h1>
            <p>{getRankMessage(rank, limit)}</p>
            
            {personalRank?.rank && personalRank?.rank > limit && (
              <p>{getRankOverallMessage(personalRank?.rank, personalRank?.score)} points</p>
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
            <button
              className='bg-green-600 text-white px-4 py-2 rounded mb-4 h-10'
              onClick={() => setIsModalOpen(true)}
            >
              Update score
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow p-4 rounded">
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-lg font-bold'>Leaderboard top {limit}</h2>
          <p className="text-xs text-gray-500">
            Socket: {isSocketConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </p>
        </div>

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
      
      <UpdateScoreModal
        isOpen={isModalOpen}
        setOpen={state => setIsModalOpen(state)}
        score={personalRank?.score ?? 0}
        setScore={newScore => updateScore(newScore)}
      />
    </div>
  );
};

interface UpdateScoreModalProps {
  score: number;
  setScore: (newScore: number) => void;
  isOpen: boolean;
  setOpen: (state: boolean) => void;
}

const UpdateScoreModal: FC<UpdateScoreModalProps> = (
  {
    score,
    setScore,
    isOpen,
    setOpen,
  }
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<number>(score);
  
  useEffect(() => {
    setInputValue(score);
  }, [isOpen]);
  
  if (!isOpen) {
    return <></>;
  }
  
  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded shadow-lg w-80'>
        <h2 className='text-lg font-bold mb-4'>Update Score</h2>
        <input
          type='number'
          min={1}
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(toFinite(e.target.value))}
          className='w-full p-2 border rounded mb-4'
          placeholder='Enter new score'
        />
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => setOpen(false)}
            className='px-4 py-2 border rounded'
          >
            Cancel
          </button>
          <button
            className='px-4 py-2 bg-blue-600 text-white rounded'
            onClick={() => {
              setOpen(false);
              setScore(inputValue);
            }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};