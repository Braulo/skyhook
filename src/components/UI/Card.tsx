import { FC, PropsWithChildren } from 'react';

const Card: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default Card;
