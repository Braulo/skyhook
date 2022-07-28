import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ResetPasswordForm from 'src/components/auth/ResetPasswordForm';
import Card from 'src/components/UI/Card';

const parseJwt = (token: string) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

const ResetPassword: NextPage = () => {
  const { query } = useRouter();

  const { resetPasswordToken } = query;

  const [user, setUser] = useState('');
  const [clientId, setClientId] = useState('');
  const [redirectUri, setRedirectUri] = useState('');

  useEffect(() => {
    if (resetPasswordToken) {
      const decodedToken = parseJwt(resetPasswordToken.toString());
      setUser(decodedToken.email);
      setClientId(decodedToken.realmApplicationClientId);
      setRedirectUri(decodedToken.callbackUrl);
    }
  }, [resetPasswordToken]);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-full">
        <Card>
          <div className="flex justify-center items-center mb-5 gap-4">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-bold">Change password</h1>
              <h1>E-Mail: {user}</h1>
              <h1>Client: {clientId}</h1>
            </div>
          </div>
          <ResetPasswordForm clientId={clientId} redirectUri={redirectUri} />
        </Card>
      </div>
    </>
  );
};

export default ResetPassword;
