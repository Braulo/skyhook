import { NextPage } from 'next';
import Card from 'src/components/UI/Card';
import ServerLogin from 'src/components/auth/ServerLogin';
import Divider from 'src/components/UI/Divider';
import ExternalLogin from 'src/components/auth/ExternalLogin';
import Link from 'next/link';
import { useContext } from 'react';
import { RealmApplicationContext } from 'state/context/realmApplicationContextProvider';
import Spinner from 'src/components/UI/Spinner';

const Login: NextPage = () => {
  const {
    state: {
      error,
      redirectUri,
      realmApplication: { clientId },
      loading,
    },
  } = useContext(RealmApplicationContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        {loading && <Spinner />}
        {error && <h1 className="text-3xl font-bold text-red-700">{error}</h1>}
        {!error && !loading && (
          <Card>
            <h1 className="text-2xl font-bold mb-5">Login</h1>
            <ServerLogin />
            <div className="w-full mt-5">
              <Divider name="or" />
            </div>
            <div className="w-full mt-5">
              <ExternalLogin />
            </div>
            <div className="w-full mt-5">
              <Divider />
            </div>
            <div className="self-start mt-5 ">
              <Link href={`/auth/register?client_id=${clientId}&redirect_uri=${redirectUri}`}>
                Click here to register
              </Link>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};

export default Login;
