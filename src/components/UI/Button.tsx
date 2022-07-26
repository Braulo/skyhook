import { FC, PropsWithChildren } from 'react';

interface IButton {
  onClick: () => void;
}

const Button: FC<PropsWithChildren & IButton> = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
