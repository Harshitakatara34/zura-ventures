import React, { useEffect, useState } from "react";
import { FaSearchLocation, FaRegEdit } from "react-icons/fa";
import { getFileById, updateFile } from "../redux/actions";
import { useDispatch } from "react-redux";
import Box from "./Box";

const Edit = () => {
  const [editMode, setEditMode] = useState(false);
  const fileId = localStorage.getItem("fileId");
  const [editedData, setEditedData] = useState("");
  const [data, setData] = useState("");
  const dispatch = useDispatch();
  const updateFileDataInDB = () => {
    console.log("edited data", editedData);
    dispatch(updateFile(fileId, editedData));
    window.location.href = "/";
  };
  
  useEffect(() => {
    dispatch(getFileById(fileId)).then((result) => {
      console.log("inside edit use effect response", result.data.file.fileData);
      result = result.data.file.fileData;
      setData(result);
    });
  }, [editMode]);

 
  return (
    <div className="w-screen mt-2 ml-14">
      <Box
        className="ml-96 mb-4"
        text1={"Project"}
        text2={"Transcript"}
      />

      <div className="flex justify-between w-3/4">
        <h1 className="text-purple-700 text-3xl font-bold ml-80">
          Edit Transcript
        </h1>
        {editMode && (
          <div className="flex gap-7">
            <button
              className="text-red-700 border border-red-600 border-2 px-4 text-semibold rounded-md"
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              Discard
            </button>
            <button
              onClick={updateFileDataInDB}
              className="text-white bg-gray-900 text-semibold border border-gray-600 border-2 px-4 rounded-md"
            >
              Save & Exit
            </button>
          </div>
        )}
      </div>
      <div
        className="border border-gray-300 ml-80 mt-4 rounded-lg"
        style={{ width: "1050px" }}
      >
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setEditMode(!editMode);
              setEditedData(data);
            }}
            className="flex border border-gray-300 px-4  py-1 rounded-full mx-4 my-2 font-semibold bg-gray-600 text-white"
          >
            <FaRegEdit /> Edit Mode
          </button>
          <button className="border border-gray-300 px-1 py-1 rounded-full mx-4 my-4 bg-purple-200 ">
            <FaSearchLocation />
          </button>
        </div>
        <hr />
        <div className="flex justify-center">
          <input
            type="textarea"
            value={editMode ? editedData : data.replace(/\n/g, "<br />")}
            className="w-11/12 h-96 my-2"
            disabled={!editMode}
            rows="2"
            cols="30"
            name="text"
            onChange={(e) => {
              setEditedData(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
