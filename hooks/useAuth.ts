import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { RealmApplicationContext } from 'state/context/realmApplicationContextProvider';
import { useHttpClient } from './useHttpClient';
import axios from 'axios';

export const useAuth = () => {
  const { post } = useHttpClient('/api/auth');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {
    state: { redirectUri },
  } = useContext(RealmApplicationContext);

  const router = useRouter();

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

    const { accessToken, refreshToken } = res.data;
    if (accessToken && refreshToken) {
      window.location.href = `${redirectUri}?accessToken=${accessToken}&refreshToken=${refreshToken}`;
    }

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

  const forgotPassword = async (email: string) => {
    setLoading(true);
    const res = await post('/forgot-password', { email })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });

    return res;
  };

  const resetPassword = async (password: string) => {
    const { userId, resetPasswordToken } = router.query;
    setLoading(true);
    const res = await axios
      .post(`/api/auth/reset-password/${userId}?resetPasswordToken=${resetPasswordToken}`, { password })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });

    return res;
  };

  return {
    login,
    register,
    error,
    loading,
    forgotPassword,
    resetPassword,
  };
};
