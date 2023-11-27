import React, { useState, useEffect } from "react";
import home from "../assets/home.svg";
import plus from "../assets/Vector.svg";
import coding from "../assets/coding.png";
import Popup from "./Popup";
import AllProjects from "./AllProjects";
import UserEmailCollectionPopup from "./Email";

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showProjects, setShowProjects] = useState(false);

  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const token = localStorage.getItem("token") || "";
  const handleCloseEmailCollectionPopup = () => {
    setShowEmailPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleProjects = () => {
    setShowProjects(true);
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      setShowPopup(false);
      setShowProjects(true);
    }
  }, []);

  useEffect(() => {
    setShowEmailPopup(true);
  }, []);
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    return () => {
      // Cleanup function to re-enable scrolling when component unmounts
      document.body.style.overflow = "";
    };
  }, [showPopup]);

  return (
    <div className="max-w-screen-lg mx-auto">
      {showEmailPopup && token === "" ? (
        <UserEmailCollectionPopup
          show={showEmailPopup}
          handleCloseEmailCollectionPopup={handleCloseEmailCollectionPopup}
          setShowEmailPopup={setShowEmailPopup}
        />
      ) : (
        <></>
      )}

      <div
        className="flex border border-gray-500 rounded-full my-7 w-40 px-2 py-1 mb-0 mx-0"
        onClick={() => {
          setShowProjects(false);
        }}
      >
        <img src={home} alt="back-to-home" className="h-6 mr-1 " />
        <p className="h-5 text-gray-600">Back to Home</p>
      </div>
      {showProjects ? (
        <AllProjects
          setShowProjects={setShowProjects}
          togglePopup={togglePopup}
          showPopup={showPopup}
          toggleProjects={toggleProjects}
        />
      ) : (
        <div>
          <p className="text-purple-700 text-4xl font-bold text-center font-Roboto">
            Create a New Project
          </p>
          <div className="flex flex-col justify-center">
            <div className="flex justify-center">
              <img src={coding} alt="coding" className="w-1/2" />
            </div>
            <div>
              <p className="text-gray-600 text-center font-roboto text-35 font-normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="w-72 h-110 flex items-center justify-center  my-6 rounded-lg bg-gray-900 px-2 py-2"
              onClick={togglePopup}
            >
              <img src={plus} alt="plus" className="h-8 w-8 m-2" />
              <p className="text-white text-2xl font-bold text-center font-Roboto">
                Create New Project
              </p>
            </div>
          </div>
          {showPopup && (
            <Popup
              togglePopup={togglePopup}
              toggleProjects={toggleProjects}
              token={token}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
