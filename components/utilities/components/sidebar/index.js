import React, { useContext } from 'react';
import { Context } from '../../../../context/index';
import Link from 'next/link';

import { AiFillSetting, AiOutlineUser } from 'react-icons/ai';
export default function Sidebar() {
  const appContext = useContext(Context);
  const { boards, user } = appContext.state;
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
        />
      </div>

      <ul>
        <Link href={`/user/${user?.name}/jobs`}>
          <a>Jobs</a>
        </Link>

        <li>
          Boards
          <ul>
            {boards.map((b) => (
              <Link href={`/user/${user?.name}/boards/${b.id}`} key={b.id}>
                <a> {b.name}</a>
              </Link>
            ))}
          </ul>
        </li>
        <Link href={`/user/${user?.name}/reports`}>
          <a>Reports</a>
        </Link>
      </ul>
    </nav>
  );
}
