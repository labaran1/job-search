import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { GrWorkshop } from 'react-icons/gr';
import { Context } from '../../../context';
import { LOGOUT } from '../../../context/types';

const Navbar = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const router = useRouter();
  console.log(user);

  const logout = () => {
    window.localStorage.clear();
    dispatch({
      type: LOGOUT,
    });
    router.push('/auth/signin');
  };

  return (
    <nav className="h-[8vh] w-full  bg-white border-b">
      <div className="  px-[3rem] py-3 flex items-center justify-between">
        <div className=" flex items-center w-[8rem] justify-between">
          <GrWorkshop size={30} />{' '}
          <Link href="/">
            <span className=" text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 text-transparent cursor-pointer bg-clip-text">
              JobLog
            </span>
          </Link>
        </div>
        <div className="flex items-center  space-x-4 h-10">
          {!user ? (
            <>
              <Link href="/auth/signin">
                <div className="hover:border border-blue-400 px-4 py-2 font-bold rounded-lg cursor-pointer">
                  Login
                </div>
              </Link>
              <Link href="/auth/signup">
                <div className="font-bold bg-blue-500 px-4 py-2 rounded-lg cursor-pointer text-white hover:scale-105 duration-300">
                  SignUp
                </div>
              </Link>
            </>
          ) : (
            <div
              onClick={logout}
              className="font-bold bg-blue-500 px-4 py-2 rounded-lg cursor-pointer text-white hover:scale-105 duration-300"
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
