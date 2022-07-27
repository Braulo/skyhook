import axios from 'axios';

export const useHttpClient = (route: string) => {
  const clientIdQuery = '?clientId=MasterRealmApp';

  const get = async <T>(endpoint: string, data: T) => {
    const response = await axios.get(route + endpoint, { data });
    return response.data;
  };

  const post = async <T, V>(endpoint: string, data: T) => {
    const response = await axios.post<V>(`${route}${endpoint}${clientIdQuery}`, { ...data }).catch((err) => {
      console.log('catch', err);
      throw err;
    });
    return response;
  };

  const put = async <T>(endpoint: string, data: T) => {
    const response = await axios.put(endpoint, { data });
    return response.data;
  };

  const deleterq = async <T, V>(endpoint: string, data: T) => {
    const response = await axios.delete(endpoint, { data });
    return response.data;
  };

  return {
    get,
    post,
    put,
    deleterq,
  };
};
