import React, { useEffect } from "react";
import plus from "../assets/Vector.svg";
import Popup from "./Popup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProjects } from "../redux/actions";
import Loader from "./Loader";

const AllProjects = ({ togglePopup, showPopup, toggleProjects }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.projectReducer.loading);
  let projects = useSelector((state) => state.projectReducer.projects);
  useEffect(() => {
    fetchingProjectsFromDB();
  }, []);
  const fetchingProjectsFromDB = () => {
    dispatch(fetchProjects());
  };
  const colors = ["teal","violet","blue","magenta","green","yellow","orange"];

  const colorMap = {};
  projects?.forEach((card, i) => {
    const color = i % colors.length;
    colorMap[card.projectName] = colors[color];
  });

  

  const generateProjectThumbnail = (projectName) => {
    const words = projectName.trim().split(" ");
    const initials =
      words.length >= 2
        ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
        : words[0][0].toUpperCase() + words[0][1].toUpperCase();

    return initials;
  };

  function limitProjectName(projectName) {
    if (projectName.length > 15) {
      return projectName.substring(0, 15) + "...";
    }
    return projectName;
  }
  return (
    <>
      <div className="mt-6 flex justify-between">
        <h1 className="text-purple-700 text-5xl font-bold	">Projects</h1>
        <div
          className="w-64  flex items-center justify-center rounded-lg bg-gray-900 px-2 py-2"
          onClick={togglePopup}
        >
          <img src={plus} alt="plus" className="h-6 w-6 mr-2" />
          <p className="text-white text-xl font-bold text-center font-Roboto">
            Create New Project
          </p>
        </div>
      </div>
      {loading && (
        <div style={{ marginTop: "-170px" }}>
          <Loader />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-lg mx-auto my-4">
        {!loading &&
          projects?.map((card, i) => (
            <Link to={`/project/${card._id}`} key={card._id}>
              <div
                key={card._id}
                className=" flex bg-white p-4 rounded-xl shadow-md border border-gray-300 mt-2 mx-4 pr-2"
              >
                <div
                  style={{ background: colorMap[card.projectName] }}
                  className="w-24 h-24 rounded-lg flex justify-center items-center mr-4"
                >
                  <p className="text-4xl font-semibold text-white font-Roboto">
                    {generateProjectThumbnail(card.projectName)}
                  </p>
                </div>
                <div className="mt-4">
                  <h3 className="text-base font-semibold text-purple-700">
                    {limitProjectName(card.projectName)}
                  </h3>
                  <p className="text-xs text-gray-800">
                    {card.files.length} Episodes
                  </p>
                </div>
              </div>
            </Link>
          ))}
        {showPopup && (
          <Popup togglePopup={togglePopup} toggleProjects={toggleProjects} />
        )}{" "}
       
      </div>
    </>
  );
};

export default AllProjects;
