import { FC } from 'react';

const Footer: FC = () => {
  return (
    <>
      <footer className="flex justify-center items-center bg-black pt-4">
        <div className="flex justify-center items-center text-lg font-bold">
          <h1>Auth powered by</h1>
          <a className="text-primary ml-2" href="https://github.com/Braulo/skyhook">
            Skyhook
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
