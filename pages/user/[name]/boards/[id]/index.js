import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import WithSidebar from '../../../../../components/utilities/hocs/sideBar/withSidebar';
import { Context } from '../../../../../context/index';

function Boards() {
  const router = useRouter();
  const { id } = router.query;

  const [destination, setDestination] = useState('');
  const [source, setSource] = useState('');
  const appContext = useContext(Context);
  const { state } = appContext;
  const [section, setSection] = useState(state.Boards);

  useEffect(() => {
    setSection(state.boards);
  }, []);

  if (router.isFallback) {
    return <div>loading Data...</div>;
  } else {
    return (
      <main className="flex overflow-x-auto overflow-y-hidden h-[92vh] w-full">
        {section
          ?.filter((bord) => {
            return bord.id == id;
          })[0]
          ?.section?.map((sec) => (
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

              <main
                className="hover:bg-gray-200 h-full overflow-y-auto overflow-x-hidden"
                onDragOver={(e) => {
                  e.preventDefault();
                  // console.log('over', sec.name);
                  //setDestination state Here
                  setDestination(sec.name);
                }}
                onDrop={(e) => {
                  let index = e.dataTransfer.getData('index');
                  setSection((section) => {
                    const newSection = [...section];
                    let a = newSection?.filter((bord) => {
                      return bord.id == id;
                    })[0];

                    const removed = a['section']
                      .filter((n) => n.name == source)[0]
                      ['jobs'].splice(index, 1);
                    a['section']
                      .filter((n) => n.name == destination)[0]
                      ['jobs'].push(removed[0]);
                    return newSection;
                  });

                  // Todo: update current Section to global boards
                }}
              >
                {sec.jobs?.map((job, index) => (
                  <div
                    key={job.id}
                    draggable
                    onDragStart={(e) => {
                      setSource(sec.name);
                      // console.log('start At', sec.name, job.id);
                      e.dataTransfer.setData('index', index);
                    }}
                  >
                    <div className="bg-blue-200 mb-3 cursor-pointer rounded-md h-32 p-2">
                      {job.title}
                      <div className="text-sm text-gray-600">{job.company}</div>
                    </div>
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

export default WithSidebar(Boards);
