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
    <nav className="bg-slate-50  w-72 h-screen ml-2 mt-10">
      <div className="flex  bg-slate-200 justify-evenly  rounded h-9 w-52 ml-8">
        {' '}
        <AiOutlineUser className="mt-2 text-xl" />
        <span className="text-xl mt-1">
          {user?.name.charAt(0).toUpperCase() + user?.name.slice(1)}
        </span>
        <AiFillSetting
          className=" cursor-pointer mt-2 text-xl"
          title="Go to settings"
        />{' '}
        {/* //Todo: Add link to settings page */}
      </div>

      <ul className="mt-20">
        <li className="text-black  hover:bg-gray-200  hover:rounded mb-3">
          <Link href={`/user/${user?.name}/jobs`}>
            <a className="cursor-pointer text-lg ">Jobs</a>
          </Link>
        </li>

        <li className="mb-3">
          <span>
            {' '}
            Boards{' '}
            <AiOutlinePlus
              className="inline-block text-xl ml-48 cursor-pointer"
              title="Add a job board"
            />
          </span>
          <ul>
            {boards.map((b) => (
              <Link key={b.id} href={`/user/${user?.name}/boards/${b.id}`}>
                <li
                  className="ml-5 cursor-pointer  text-black  hover:bg-gray-200  hover:rounded mt-2"
                  id={b.id}
                >
                  <a className=" text-gray-400"> {b.name}</a>
                  {/* //todo: show delete only on hover */}

                  <AiOutlineDelete className="inline-block  ml-20" />
                </li>
              </Link>
            ))}
          </ul>
        </li>

        <li className="text-black  hover:bg-gray-200  hover:rounded mb-3">
          <Link href={`/user/${user?.name}/reports`}>
            <a className="cursor-pointer text-lg ">Reports</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
