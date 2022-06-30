import React, { useContext, useState } from 'react';
import { Context } from '../../../../context/index';
import Link from 'next/link';

import {
  AiFillSetting,
  AiOutlineUser,
  AiOutlinePlus,
  AiOutlineDelete,
} from 'react-icons/ai';
export default function Sidebar() {
  const appContext = useContext(Context);
  const { boards, user } = appContext.state;

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <nav className="bg-slate-50 h-full  w-72  p-3 border-r border-slate-500">
      <div className="h-full flex items-center flex-col justify-between">
        <ul className="mt-2">
          <li className="text-black  hover:bg-gray-200 font-bold text-2xl  hover:rounded mb-3 px-2 py-2">
            <Link href={`/user/${user?.name}/jobs`}>
              <a className="cursor-pointer text-lg ">Jobs</a>
            </Link>
          </li>

          <li className="mb-3 p-2">
            <span className=" flex w-[13rem] items-center justify-between">
              <p className=" font-bold text-2xl">Boards</p>
              <AiOutlinePlus size={25} title="Add a job board" />
            </span>
            <ul>
              {boards.map((b) => (
                <Link key={b.id} href={`/user/${user?.name}/boards/${b.id}`}>
                  <li
                    className="ml-5 cursor-pointer  text-black  hover:bg-gray-200  hover:rounded mt-2 flex justify-between items-center p-2"
                    id={b.id}
                  >
                    <a className=" text-gray-400"> {b.name}</a>
                    {/* //todo: show delete only on hover */}

                    <AiOutlineDelete className="hover:text-red-600" size={25} />
                  </li>
                </Link>
              ))}
            </ul>
          </li>

          <li className="text-black  hover:bg-gray-200  hover:rounded mb-3 p-2">
            <Link href={`/user/${user?.name}/reports`}>
              <a className="cursor-pointer font-bold text-2xl ">Reports</a>
            </Link>
          </li>
        </ul>
        <div className="flex items-center hover:shadow-md py-1 hover:scale-105 duration-300  bg-slate-200 justify-evenly  rounded  w-52 mb-3 ">
          {' '}
          <AiOutlineUser size={25} />
          <span className="text-xl ">
            {user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}
          </span>
          <AiFillSetting size={25} title="Go to settings" />{' '}
          {/* //Todo: Add link to settings page */}
        </div>
      </div>
    </nav>
  );
}
