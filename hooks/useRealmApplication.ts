import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import axios from 'axios';

interface IInitialReducerRealmApp {
  realmApplication: { displayName: string; clientId: string };
  redirectUri: string;
  error: string;
  loading: boolean;
}
const initialState: IInitialReducerRealmApp = {
  realmApplication: { clientId: '', displayName: '' },
  redirectUri: '',
  error: '',
  loading: false,
};

const realmApplicationReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  },
): IInitialReducerRealmApp => {
  switch (action.type) {
    case 'SET_CLIENTID':
      return {
        ...state,
        realmApplication: { clientId: action.payload, displayName: state.realmApplication.displayName },
      };
    case 'SET_DISPLAYNAME':
      return {
        ...state,
        realmApplication: {
          clientId: state.realmApplication.clientId,
          displayName: action.payload,
        },
      };
    case 'SET_REDIRECTURI':
      return {
        ...state,
        redirectUri: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
export const useRealmApplication = () => {
  const [state, dispatch] = useReducer(realmApplicationReducer, initialState);
  const { query } = useRouter();
  const { client_id, redirect_uri } = query as any;

  useEffect(() => {
    setLoading(true);
    if (client_id && redirect_uri) {
      setRealmApplicationClientId(client_id);
      setRedirectURI(redirect_uri);
      setRealmApplication(client_id);
    }
  }, [client_id, redirect_uri]);

  const setRedirectURI = (redirectUri: string) => {
    dispatch({ type: 'SET_REDIRECTURI', payload: redirectUri });
  };

  const setRealmApplicationClientId = async (clientId: string) => {
    dispatch({
      type: 'SET_CLIENTID',
      payload: clientId,
    });
  };

  const setRealmApplication = async (clientId: string) => {
    const response = await axios
      .get<string>(`/api/realmapplication/client/${clientId}?clientId=${clientId}`)
      .catch(() => {
        setError('Application not found');
      })
      .finally(() => setLoading(false));
    dispatch({
      type: 'SET_DISPLAYNAME',
      payload: (response as any)?.data || '',
    });
  };

  const setError = (error: string) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  return {
    state,
    setRedirectURI,
    setRealmApplicationClientId,
    setRealmApplication,
    setError,
  };
};
