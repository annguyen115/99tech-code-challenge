import { FC, FormEvent, JSX, useState } from 'react';
import { useAuth } from '@auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login: FC = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    void login({ username, password });
  };
  
  // user already login
  if (user) {
    navigate(-1);
  }
  
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded shadow-md w-96'>
        <h2 className='text-2xl mb-4 font-bold'>Login</h2>
        <input type='text' placeholder='Username' autoComplete='username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full mb-2 p-2 border rounded' />
        <input type='password' placeholder='Password' autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)}
               className='w-full mb-4 p-2 border rounded' />
        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>Login</button>
      </form>
    </div>
  );
};