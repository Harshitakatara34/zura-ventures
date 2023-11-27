import React, { useEffect, useState } from "react";
import CreateFilePopup from "./Create";
import youtube from "../assets/youtubeIcon.svg";
import spotify from "../assets/spotify.svg";
import NoFileScreen from "./NoFileScreen";
import { useParams } from "react-router-dom";
import { fetchProjectFiles } from "../redux/actions";
import EditTranscription from "./Edit";
import Box from "./Box";

const Upload = () => {
  const { id } = useParams();
  const [showEdit, setShowEdit] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFileUploadPopup, setShowFileUploadPopup] = useState(false);
 

  

  const toggleFileUploadPopup = () => {
    setShowFileUploadPopup(!showFileUploadPopup);
  };
  const toggleEditFileData = () => {
    setShowEdit(!showEdit);
};
  

  useEffect(() => {
    fetchFilesForProject();
  }, []);
  const fetchFilesForProject = () => {
    fetchProjectFiles(id)
      .then((files) => {
        console.log("Project files:", files);
        setFiles(files);
      })
      .catch((error) => {
        console.error("Error fetching project files:", error.message);
      });
  };
  if (showEdit) {
    return <EditTranscription />;
  }

  return (
    <div className="w-screen mt-2 ml-14">
      <Box className="ml-96 mb-4" text1={"Project"} text2={"Upload"} />
      <h1 className="text-purple-700 text-4xl font-bold ml-80">Upload</h1>

      <div
        className=" flex ml-80 w-9/12 bg-white p-2 rounded-xl 
                 mt-2 mx-4 pr-2"
      >
        <div
          onClick={toggleFileUploadPopup}
          className="w-52 h-24 rounded-lg flex justify-center items-center mr-14 border border-gray-300 border-2"
        >
          <img src={youtube} alt="" />
          <div className="mt-4 ml-2">
            <h3 className="text-base font-semibold">Upload</h3>
            <h3 className="text-base font-semibold">Youtube Video</h3>
          </div>
        </div>
        <div
          onClick={toggleFileUploadPopup}
          className="w-52 h-24 rounded-lg flex justify-center items-center mr-14 border border-gray-300 border-2"
        >
          <img src={spotify} alt="" />
          <div className="mt-4 ml-2">
            <h3 className="text-base font-semibold">Upload</h3>
            <h3 className="text-base font-semibold">Youtube Video</h3>
          </div>
        </div>
        <div
          onClick={toggleFileUploadPopup}
          className="w-52 h-24 rounded-lg flex justify-center items-center mr-4 border border-gray-300 border-2"
        >
          <img src={youtube} alt="" />
          <div className="mt-4 ml-2">
            <h3 className="text-base font-semibold">Upload</h3>
            <h3 className="text-base font-semibold">Youtube Video</h3>
          </div>
        </div>
        {showFileUploadPopup && (
          <CreateFilePopup
            setLoading={setLoading}
            toggleFileUploadPopup={toggleFileUploadPopup}
            fetchFilesForProject={fetchFilesForProject}
            projectId={id}
          />
        )}
      </div>
      <hr />
      {files.length === 0 && !loading ? (
        <NoFileScreen />
      ) : (
        <ProjectFilesDisplayScreen
          files={files}
          fetchFilesForProject={fetchFilesForProject}
          toggleEditFileData={toggleEditFileData}
        />
      )}
    </div>
  );
};

export default Upload;
