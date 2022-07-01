import React, { useState, useEffect, useContext, Fragment } from 'react';
import { useRouter } from 'next/router';
import WithSidebar from '../../../../../components/utilities/hocs/sideBar/withSidebar';
import { Context } from '../../../../../context/index';
import { Transition, Dialog } from '@headlessui/react';
import axios from 'axios';
import AddStageForm from '../../../../../components/Forms/AddStageForm';

function Boards() {
  const router = useRouter();
  const { id } = router.query;

  const [destination, setDestination] = useState('');
  const [source, setSource] = useState('');
  const [stages, setStages] = useState([]);
  const [stageModal, setStageModal] = useState(false);
  const [stageName, setStageName] = useState('');

  useEffect(() => {
    loadStages();
  }, [id]);

  const loadStages = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/board/getStages/${id}`
      );

      console.log(data.stages, 'stages');
      setStages(data?.stages);
    } catch (err) {
      console.log(err);
    }
  };

  const openStageModal = () => {
    setStageModal(true);
  };

  const closeStageModal = () => {
    setStageModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/board/addStage/${id}`,
        { name: stageName }
      );
      setStages([...stages, data.stage]);
      closeStageModal();
      console.log(data.stage);
    } catch (err) {
      console.log(err);
    }
  };

  if (router.isFallback) {
    return <div>loading Data...</div>;
  } else {
    return (
      <main className="flex overflow-x-auto overflow-y-hidden h-[92vh] w-full">
        {stages?.map((stage) => (
          <section
            key={stage.name}
            className="bg-gray-100 w-[40rem] border-r-2 p-4 h-[92vh] "
          >
            <center className="mb-2">
              {stage.name}
              <div className="text-gray-400 text-sm mb-1">
                {stage.jobs.length} Jobs
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
                setDestination(stage.name);
              }}
              onDrop={(e) => {
                let index = e.dataTransfer.getData('index');
                setStages((stages) => {
                  const newSection = [...stages];

                  let a = newSection;

                  const removed = a
                    ?.filter((n) => n.name == source)[0]
                    ['jobs'].splice(index, 1);
                  a?.filter((n) => n.name == destination)[0]['jobs'].push(
                    removed[0]
                  );
                  return newSection;
                });

                // Todo: update current Section to global boards
              }}
            >
              {stage.jobs?.map((job, index) => (
                <div
                  key={job._id}
                  draggable
                  onDragStart={(e) => {
                    setSource(stage.name);
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
          <button
            onClick={openStageModal}
            className="bg-white hover:border-2 w-72 h-10 rounded-md text-lg text-gray-500"
          >
            + Add Stage
          </button>
        </div>
        <Transition as={Fragment} appear show={stageModal}>
          <Dialog as="div" onClose={closeStageModal}>
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
                      New Stage
                    </h1>
                    <AddStageForm
                      handleSubmit={handleSubmit}
                      setStageName={setStageName}
                      closeStageModal={closeStageModal}
                      stageName={stageName}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </main>
    );
  }
}

export default WithSidebar(Boards);
