import { NextPage } from 'next';
import RequestPasswordForm from 'src/components/auth/RequestPasswordForm';
import Card from 'src/components/UI/Card';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useRouter } from 'next/router';

const RequestPassword: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <Card>
          <div className="flex justify-center items-center mb-5 gap-4">
            <IoMdArrowRoundBack className="h-7 w-7 cursor-pointer" onClick={() => router.push('/auth/login')} />
            <h1 className="text-2xl font-bold">Request new password</h1>
          </div>
          <RequestPasswordForm />
        </Card>
      </div>
    </>
  );
};

export default RequestPassword;
