import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import WithSidebar from '../../../../../components/utilities/hocs/sideBar/withSidebar';

function Boards({ board }) {
  const router = useRouter();
  const { id } = router.query;
  const [section, setSection] = useState();

  console.log(board);
  if (router.isFallback) {
    return <div>loading Data...</div>;
  } else {
    return (
      <main className="flex overflow-x-auto overflow-y-hidden h-[92vh] w-full">
        {/* <div>{board[0].name}</div> */}
        {board[0].section?.map((sec) => (
          <section
            key={sec.name}
            className="bg-gray-100 w-[40rem] border-r-2 p-4 h-[92vh] "
          >
            <center className="mb-2">
              {sec.name}
              <div className="text-gray-400 text-sm mb-1">
                {sec.jobs.length} Jobs
              </div>

              <button
                className="bg-white border-2 w-72 rounded-md text-4xl text-gray-300"
                title="Add Job"
              >
                +
              </button>
            </center>

            <main className="hover:bg-gray-200 h-full overflow-y-auto overflow-x-hidden">
              {sec.jobs?.map((job) => (
                <div
                  key={job.id}
                  className="bg-blue-200 mb-3 cursor-pointer rounded-md h-32 p-2"
                >
                  {job.title}
                  <div className="text-sm text-gray-600">{job.company}</div>
                </div>
              ))}
            </main>
          </section>
        ))}
        <div className="p-10 cursor-pointer w-80">
          <button className="bg-white hover:border-2 w-72 h-10 rounded-md text-lg text-gray-500">
            + Add Stage
          </button>
        </div>
      </main>
    );
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      // {
      //   // params: { name: 'labs', id: '1' }, //can get all paths available and populate
      // },
    ],
    fallback: true, //todo:Add a fallback component
  };
}
export async function getStaticProps(context) {
  const { params } = context; //params are from getstatic path
  //get boards from server
  const boards = [
    {
      name: 'job-Search-2022',
      id: '1',
      section: [
        {
          name: 'Waiting',
          jobs: [
            {
              title: 'Software Engineer',
              company: 'Google',
              id: '3',
            },
            {
              title: 'Software Engineer',
              company: 'Facebook',
              id: '2',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '4',
            },
          ],
        },
        {
          name: 'Applied',
          jobs: [
            {
              title: 'Software Architect',
              company: 'Google',
              id: '5',
            },
            {
              title: 'Software Engineer',
              company: 'Twitter',
              id: '6',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
              id: '9',
            },
          ],
        },
      ],
    },
    {
      name: 'job-search-1',
      id: 2,
    },
  ];

  let boardDetails = boards.filter((bord) => bord.id == params.id);
  return {
    props: {
      board: boardDetails,
    },
  };
}
export default WithSidebar(Boards);
