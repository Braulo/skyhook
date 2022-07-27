import { FC } from 'react';
import GoogleIcon from '../Icons/GoogleIcon';
import { IButton } from './Button';

const GoogleButton: FC<IButton> = ({ onClick }) => {
  return (
    <button className="bg-white text-black flex items-center p-2 rounded-md w-full" onClick={onClick}>
      <GoogleIcon />
      <div className="grow">
        <h1 className="justify-self-center justify-center">Login with Google</h1>
      </div>
    </button>
  );
};

export default GoogleButton;
