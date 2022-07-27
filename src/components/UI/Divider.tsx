import { FC } from 'react';

const Divider: FC<{ name?: string }> = ({ name }) => {
  return (
    <>
      {name ? (
        <div className="flex justify-center items-center">
          <div className="h-px bg-primary w-full" />
          <h1 className="font-bold pl-4 pr-4 w-full text-center">{name}</h1>
          <div className="h-px bg-primary w-full" />
        </div>
      ) : (
        <div className="h-px bg-primary w-full" />
      )}
    </>
  );
};

export default Divider;
