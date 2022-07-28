import axios from 'axios';
import { useContext, useEffect } from 'react';
import { RealmApplicationContext } from 'state/context/realmApplicationContextProvider';

export const useHttpClient = (route: string) => {
  const {
    state: {
      realmApplication: { clientId },
    },
  } = useContext(RealmApplicationContext);

  const get = async <T, V>(endpoint: string, data?: T) => {
    const response = await axios.get<V>(`${route}${endpoint}?clientId=${clientId}`, { ...data }).catch((err) => {
      throw err;
    });
    return response.data;
  };

  const post = async <T, V>(endpoint: string, data?: T) => {
    const response = await axios.post<V>(`${route}${endpoint}?clientId=${clientId}`, { ...data }).catch((err) => {
      throw err;
    });
    return response;
  };

  return {
    get,
    post,
  };
};
