import { FC, PropsWithChildren } from 'react';

const Card: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col justify-center items-center bg-secondary p-10 rounded-xl">{children}</div>;
};

export default Card;
