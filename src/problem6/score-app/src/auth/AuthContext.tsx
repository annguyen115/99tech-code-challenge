import { createContext, useContext, useEffect, useState } from 'react';
import { clearTokens, getTokens, setTokens } from '@utils/localStorage';
import { safeDecode } from '@utils/jwt';
import { login as callApiLogin, logout as callApiLogout } from '@api/auth';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '@constants/route';

interface UserPayload {
  id: string;
  username: string;
  fullName: string;
}

interface AuthContextProps {
  user: UserPayload | null;
  login: (payload: { username: string, password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  logout: () => { },
  login: function (_: { username: string; password: string; }): Promise<void> {
    return new Promise(() => {});
  }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = getTokens()?.accessToken;
  const userInfo = accessToken ? safeDecode(accessToken) as UserPayload : null;
  
  const [user, setUser] = useState<UserPayload | null>(userInfo);
  const navigate = useNavigate();
  
  useEffect(() => {
    const tokens = getTokens();
    if (tokens?.accessToken) {
      setUser(safeDecode(tokens.accessToken));
    }
  }, []);
  
  const login = async (payload: { username: string, password: string }) => {
    const { data } = await callApiLogin(payload);
    
    navigate(ROUTE.DASHBOARD);

    setTokens(data.accessToken, data.refreshToken);
    setUser(safeDecode(data.accessToken));
  };
  
  const logout = async () => {
    await callApiLogout();
    
    clearTokens();
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)