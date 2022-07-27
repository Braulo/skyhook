import Link from 'next/link';

const Navbar = () => {
  return (
    <>
      <nav
        className={`w-100 dark:bg-dark-secondary bg-light-secondary flex flex-wrap justify-center md:justify-between items-center p-4`}
      >
        <div className="">
          <div className="text-2xl font-bold">
            <Link href="/">Skyhook</Link>
          </div>
        </div>
        <div className="flex">
          <h1>Clinet Id</h1>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
