import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Context } from '../../../../context/index';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';

import {
  AiFillSetting,
  AiOutlineUser,
  AiOutlinePlus,
  AiOutlineDelete,
} from 'react-icons/ai';
import axios from 'axios';
import { ADDBOARD, BOARDS } from '../../../../context/types';
import AddBoardForm from '../../../Forms/AddBoardForm';
export default function Sidebar() {
  const appContext = useContext(Context);
  const { boards, user } = appContext.state;
  const [boardModal, setBoardModal] = useState(false);
  const [boardName, setBoardName] = useState('');

  const openBoadModal = () => {
    setBoardModal(true);
  };

  const closeBoardModal = () => {
    setBoardModal(false);
  };

  useEffect(() => {
    loadBoards();
  }, [user]);

  const loadBoards = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/board/getBoards/${user?._id}`
      );

      appContext.dispatch({
        type: BOARDS,
        payload: data.boards,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/board/create',
        {
          name: boardName,
        }
      );

      appContext.dispatch({
        type: ADDBOARD,
        payload: data.board,
      });

      console.log(data);
      closeBoardModal();
    } catch (err) {
      console.log(err);
    }
  };

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
              <div onClick={openBoadModal} className=" cursor-pointer">
                <AiOutlinePlus size={25} title="Add a job board" />
              </div>
            </span>
            {/* Add Board Modal */}
            <Transition as={Fragment} appear show={boardModal}>
              <Dialog as="div" onClose={closeBoardModal}>
                <Transition
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed bg-black bg-opacity-25 inset-0" />
                </Transition>
                <div className=" fixed inset-0 overflow-y-auto">
                  <div className="flex items-center justify-center min-h-full ">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className=" w-[25rem] transition-all rounded-lg transform bg-white shadow-lg">
                        <h1 className="font-bold text-2xl text-center py-2">
                          New Board
                        </h1>
                        <AddBoardForm
                          handleSubmit={handleSubmit}
                          boardName={boardName}
                          setBoardName={setBoardName}
                          closeBoardModal={closeBoardModal}
                        />
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
            <ul className="h-[20rem] overflow-y-auto">
              {boards.map((b) => (
                <Link
                  key={b?._id}
                  href={`/user/${user?.name}/boards/${b?._id}`}
                >
                  <li
                    className="ml-5 cursor-pointer  text-black  hover:bg-gray-200  hover:rounded mt-2 flex justify-between items-center p-2"
                    id={b?.id}
                  >
                    <a className=" text-gray-400"> {b?.name}</a>
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
