import { useState } from 'react';
import { useHttpClient } from './useHttpClient';

export const useAuth = () => {
  const { post } = useHttpClient('/api/auth');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  type tokenResponse = {
    accessToken: string;
    refreshToken: string;
  };

  const login = async (email: string, password: string): Promise<tokenResponse> => {
    setLoading(true);
    const res = await post<{ email: string; password: string }, tokenResponse>('/login', { email, password })
      .catch((err) => {
        setError(err.response.data.message);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });

    return res.data;
  };

  const register = async (email: string, username: string, password: string) => {
    setLoading(true);
    const res = await post<{ email: string; username: string; password: string }, tokenResponse>('/register', {
      email,
      username,
      password,
    })
      .catch((err) => {
        setError(err.response.data.message);
        throw error;
      })
      .finally(() => setLoading(false));

    return res.data;
  };

  return {
    login,
    register,
    error,
    loading,
  };
};
