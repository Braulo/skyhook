import { useContext } from 'react';
import { RealmApplicationContext } from 'state/context/realmApplicationContextProvider';
import GoogleButton from '../UI/GoogleButton';

const ExternalLogin = () => {
  const {
    state: {
      realmApplication: { clientId },
    },
  } = useContext(RealmApplicationContext);

  return (
    <>
      <a href={`/api/auth/external/google?clientId=${clientId}`}>
        <GoogleButton />
      </a>
    </>
  );
};

export default ExternalLogin;
