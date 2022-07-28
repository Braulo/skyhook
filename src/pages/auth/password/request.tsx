import { NextPage } from 'next';
import RequestPasswordForm from 'src/components/auth/RequestPasswordForm';
import Card from 'src/components/UI/Card';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { RealmApplicationContext } from 'state/context/realmApplicationContextProvider';

const RequestPassword: NextPage = () => {
  const router = useRouter();

  const {
    state: {
      realmApplication: { clientId },
      redirectUri,
    },
  } = useContext(RealmApplicationContext);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <Card>
          <div className="flex justify-center items-center mb-5 gap-4">
            <IoMdArrowRoundBack
              className="h-7 w-7 cursor-pointer"
              onClick={() => router.push(`/auth/login?client_id=${clientId}&redirect_uri=${redirectUri}`)}
            />
            <h1 className="text-2xl font-bold">Request password reset</h1>
          </div>
          <RequestPasswordForm />
        </Card>
      </div>
    </>
  );
};

export default RequestPassword;
