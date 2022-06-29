import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function SignUP() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        values
      );

      if (data.success) {
        router.push('/auth/signin');
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
            Register
          </h1>
          <input
            className=" border w-full px-2 py-2 mb-3 rounded-lg border-slate-600 outline-none"
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          />
          <input
            className=" border w-full px-2 py-2 mb-3 rounded-lg border-slate-600 outline-none"
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
          />
          <input
            className=" border w-full px-2 py-2 mb-2 rounded-lg border-slate-600 outline-none"
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
          />

          <div className=" flex justify-center mt-2 mb-2">
            <button
              onClick={handleSubmit}
              className=" bg-blue-600 text-2xl font-bold px-4 py-2 w-[15rem] text-white rounded-lg hover:scale-105 duration-300"
            >
              Sign Up
            </button>
          </div>

          <Link href="/auth/signin">
            <h1 className=" text-gray-500 hover:text-blue-500 cursor-pointer">
              Already have an account?
            </h1>
          </Link>
        </form>
      </div>
    </div>
  );
}
