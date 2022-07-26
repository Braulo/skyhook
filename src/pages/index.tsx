import type { NextPage } from 'next';
import Login from 'src/components/Login';
import Register from 'src/components/Register';

const Auth: NextPage = () => {
  return (
    <>
      <h1>Auth</h1>
      <Login />
      <Register />
    </>
  );
};

export default Auth;
