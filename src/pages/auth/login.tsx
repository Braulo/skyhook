import { NextPage } from 'next';
import Card from 'src/components/UI/Card';
import ServerLogin from 'src/components/auth/ServerLogin';
import Divider from 'src/components/UI/Divider';
import ExternalLogin from 'src/components/auth/ExternalLogin';
import Link from 'next/link';

const Login: NextPage = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
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
            <Link href={'/auth/register'}>Click here to register</Link>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Login;
