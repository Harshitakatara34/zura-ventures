import React from "react";
import moment from "moment";
import { deleteFile } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Files = ({
  files,
  toggleEditFileData,
  fetchFilesForProject,
}) => {
  const { id } = useParams();
  const dispatch = useDispatch();
 
  const handleDelete = (id) => {
    dispatch(deleteFile(id)).then((res) => {
      fetchFilesForProject(id);
    });
  };

  return (
    <div className="ml-44 w-9/12 mt-4 flex flex-col justify-center items-center">
      <div
        className="mt-8 rounded-md border border-gray-300"
        style={{ width: "880px", justifyContent: "space-between" }}
      >
        <table
          style={{
            width: "880px",
          }}
        >
          <thead className="ml-72">
            <tr>
              <th className="px-8 py-3 border-b-2 border-gray-300 text-left text-lg font-semibold  tracking-wider">
                File Name
              </th>
              <th className="px-32 py-3 border-b-2 border-gray-300 text-left text-lg font-semibold  tracking-wider">
                Last Updated
              </th>
              <th className="px-32 py-3 border-b-2 border-gray-300 text-left text-lg font-semibold tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file._id} className="border-b border-gray-300">
                <td className="px-12 py-2 whitespace-nowrap">
                  {file.fileName}
                </td>
                <td className="px-32 py-2 whitespace-nowrap">
                  {moment(file.updatedAt).format("DD MMM YY | HH:mm")}
                </td>
                <td className="px-32 py-2 whitespace-nowrap">
                  <button
                    className="mr-4 bg-purple-100 text-gray-700 font-semibold py-2 px-4 rounded"
                    onClick={() => {
                      toggleEditFileData();
                      localStorage.setItem("fileId", file._id);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(file._id);
                      console.log("button delete for id", file._id);
                    }}
                    className="text-red-600 bg-purple-100 font-semibold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Files;
