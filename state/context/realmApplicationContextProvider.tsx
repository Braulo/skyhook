import { createContext, FC, PropsWithChildren } from 'react';
import { useRealmApplication } from '../../hooks/useRealmApplication';

export const RealmApplicationContextProvider: FC<PropsWithChildren> = (props) => {
  return (
    <>
      <RealmApplicationContext.Provider value={useRealmApplication()}>
        {props.children}
      </RealmApplicationContext.Provider>
    </>
  );
};

export const RealmApplicationContext = createContext({} as ReturnType<typeof useRealmApplication>);
