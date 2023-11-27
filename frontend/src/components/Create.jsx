import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFile } from "../redux/actions";

const Create = ({
  projectId,
  toggleFileUploadPopup,
  fetchFilesForProject,
  setLoading,
}) => {
  const [fileData, setFileData] = useState("");
  const [fileName, setFileName] = useState("");
  const dispatch = useDispatch();
  console.log("inside create file popup project id", projectId);
  const uploadProjectFile = () => {
    toggleFileUploadPopup();
    dispatch(createFile(projectId, fileName, fileData)).then((res) => {
      fetchFilesForProject(projectId);
      setLoading(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New File</h2>
        </div>
        <label className="block text-gray-400">
          File Name:
          <input
            type="text"
            required
            placeholder="Type here ..."
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
            }}
            className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="block text-gray-400">
          Link Or Transcription:
          <input
            type="text"
            required
            placeholder="Type here ..."
            value={fileData}
            onChange={(e) => {
              setFileData(e.target.value);
            }}
            className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </label>
        <div className="flex justify-end my-4">
          <button
            onClick={toggleFileUploadPopup}
            className="text-red-600 hover:text-gray-900 focus:outline-none mr-4"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              uploadProjectFile();
            }}
            disabled={!fileName || fileName.length < 4}
            className={`px-4 py-2 rounded bg-purple-700 text-white font-semibold`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
