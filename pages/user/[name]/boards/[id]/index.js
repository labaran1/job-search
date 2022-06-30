import React from 'react';
import { useRouter } from 'next/router';
import WithSidebar from '../../../../../components/utilities/hocs/sideBar/withSidebar';

function Boards({ board }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(board);
  if (router.isFallback) {
    return <div>loading Data...</div>;
  } else {
    return <div>Hello jobs {id}</div>;
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
            },
            {
              title: 'Software Engineer',
              company: 'Facebook',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
            },
          ],
        },
        {
          name: 'Applied',
          jobs: [
            {
              title: 'Software Architect',
              company: 'Google',
            },
            {
              title: 'Software Engineer',
              company: 'Twitter',
            },
            {
              title: 'Software Engineer (Frontend)',
              company: 'Spark',
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
