import React from 'react';

const AddStageForm = ({
  handleSubmit,
  stageName,
  closeStageModal,
  setStageName,
}) => {
  return (
    <div className=" w-full p-2">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className=" border w-full rounded-lg py-2 px-2 border-gray-400"
          placeholder="Stage Name..."
          value={stageName}
          onChange={(e) => setStageName(e.target.value)}
        />

        <div className=" flex justify-between py-3 px-5">
          <div
            onClick={handleSubmit}
            className="bg-blue-500 px-2 py-2 rounded-lg text-white cursor-pointer"
          >
            Create Stage
          </div>
          <div
            onClick={() => {
              closeStageModal();
              setStageName('');
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

export default AddStageForm;
