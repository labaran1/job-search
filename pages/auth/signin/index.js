import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { LOGIN } from '../../../context/types';
import { Context } from '../../../context/index';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const { dispatch } = useContext(Context);
  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        values
      );

      {
        data.user &&
          dispatch({
            type: LOGIN,
            payload: data.user,
          });
      }

      const user = JSON.stringify(data.user);

      {
        data.user && window.localStorage.setItem('user', user);
      }

      {
        data.user && router.push(`/user/${encodeURIComponent(data.user.name)}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="  shadow-lg h-[20rem] w-[25rem] border rounded-md border-slate-800 ">
        <form onSubmit={handleSubmit} className=" w-full h-full px-2">
          <h1 className=" text-2xl font-bold text-center py-3 capitalize">
            Sign In
          </h1>

          <input
            className=" border w-full px-2 py-2 mb-3 rounded-lg border-slate-600 outline-none"
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            className=" border w-full px-2 py-2 mb-4 rounded-lg border-slate-600 outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />

          <div className=" flex justify-center mt-2 mb-5">
            <button
              onClick={handleSubmit}
              className=" bg-blue-600 text-2xl font-bold px-4 py-2 w-[15rem] text-white rounded-lg hover:scale-105 duration-300"
            >
              Login
            </button>
          </div>

          <div className=" flex items-center justify-between">
            <Link href="/auth/signup">
              <h1 className=" text-gray-500 hover:text-blue-500 cursor-pointer">
                Dont have an account? Sign up
              </h1>
            </Link>
            <Link href="">
              <h1 className=" text-gray-500 hover:text-blue-500 cursor-pointer">
                Forgot password
              </h1>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
