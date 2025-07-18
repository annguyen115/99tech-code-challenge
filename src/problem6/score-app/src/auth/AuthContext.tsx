import { createContext, useContext, useState, useEffect } from 'react';
import { getTokens, setTokens, clearTokens } from '@utils/localStorage';
import { safeDecode } from '@utils/jwt';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const tokens = getTokens();
    if (tokens?.accessToken) {
      setUser(safeDecode(tokens.accessToken));
    }
  }, []);
  
  const login = (data: { accessToken: string; refreshToken: string }) => {
    setTokens(data.accessToken, data.refreshToken);
    setUser(safeDecode(data.accessToken));
  };
  
  const logout = () => {
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