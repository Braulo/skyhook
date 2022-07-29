import Link from 'next/link';
import { useContext } from 'react';
import { RealmApplicationContext } from 'state/context/realmApplicationContextProvider';

const Navbar = () => {
  const {
    state: {
      realmApplication: { displayName },
    },
  } = useContext(RealmApplicationContext);

  return (
    <>
      <nav className={`w-100 flex justify-center items-center p-4`}>
        <div className="text-2xl font-bold">
          <h1>{displayName}</h1>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
