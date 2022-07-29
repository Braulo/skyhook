import { PropsWithChildren, FC } from 'react';
import Footer from './UI/Footer';
import Navbar from './UI/Navbar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col text-black dark:text-white bg-white dark:bg-black h-screen break-all">
      <Navbar />
      <main className="grow bg-white dark:bg-black">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
