import axios from 'axios';
import React, { useState } from 'react';

const AddJobForm = ({
  currentId,
  closeJobModal,
  stages,
  setStages,
  loadStages,
}) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/board/addJob/${currentId}`,
        {
          title,
          company,
        }
      );

      console.log(stages, currentId, data.addedJob);
      loadStages();
      // setStages((prev) => {
      //   const NeSt = prev;
      //   let a = NeSt.filter((sta) => sta._id == currentId);
      //   // let b = data.addedJob.jobs.filter((sta) => sta._id == currentId);
      //   // console.log(a[]);
      //   a.jobs = data.addedJob.jobs;
      //   return NeSt;
      // });
      closeJobModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" w-full p-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className=" border w-full rounded-lg mb-3 py-2 px-2 border-gray-400"
          placeholder="Job Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className=" border w-full rounded-lg mb-3 py-2 px-2 border-gray-400"
          placeholder="Company Name..."
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <div className=" flex justify-between py-3 px-5">
          <div
            onClick={handleSubmit}
            className="bg-blue-500 px-2 py-2 rounded-lg text-white cursor-pointer"
          >
            Add Stage
          </div>
          <div
            onClick={() => {
              closeJobModal();
              setTitle('');
              setCompany('');
            }}
            className="bg-red-500 text-white px-2 py-2 rounded-lg cursor-pointer "
          >
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddJobForm;
