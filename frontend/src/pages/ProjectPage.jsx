import React, { useState } from "react";
import settings from "../assets/settingsIcon.svg";
import logo from "../assets/directright.svg";
import logoText from "../assets/LAMA..svg";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectUpload from "../components/Upload";

const LeftSidebar = () => {
  const [showSettings, setShowSettings] = useState(false);

  const [activeTab, setActiveTab] = useState("tab1"); 
  console.log("inside left side bar");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleClickSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-around">
        <div
          className={`bg-purple-100 sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px]
             overflow-y-auto text-center bg-gray-900`}
        >
          <div>
            <Link to="/">
              <div className="flex items-center ml-4">
                <img src={logo} alt="logo" className="w-8 h-8 mr-2" />
                <img src={logoText} alt="logo-text" className="h-5" />
              </div>
            </Link>
          </div>
          <div className="text-left mt-2 ml-6">
            <p>Podcast Upload Flow</p>
          </div>
          <div className="flex flex-col gap-4 mt-2">
            <div
              onClick={() => {
                window.location.reload();
                handleTabClick("tab1");
              }}
              style={{
                backgroundColor: activeTab === "tab1" ? "#7E22CE" : "",
                color: activeTab === "tab1" ? "white" : "",
              }}
              className="flex w-60 border border-black-700 rounded-full ml-4 py-2 pl-2"
            >
              <button className="h-6 w-6 rounded-full bg-purple-300 mr-2">
                1
              </button>
              <p>Projects</p>
            </div>
            <div
              onClick={() => handleTabClick("tab2")}
              style={{
                backgroundColor: activeTab === "tab2" ? "#7E22CE" : "",
                color: activeTab === "tab2" ? "white" : "",
              }}
              className="flex w-60 border border-black-700 rounded-full ml-4 py-2 pl-2"
            >
              <button className="h-6 w-6 rounded-full bg-purple-300  mr-2">
                2
              </button>
              <p>Widget Configuration</p>
            </div>
            <div className="flex w-60 border border-black-900 rounded-full ml-4 py-2 pl-2">
              <button className="h-6 w-6 rounded-full bg-purple-300  mr-2">
                3
              </button>
              <p>Deployment</p>
            </div>
            <div className="flex w-60 border border-black-700 rounded-full ml-4 py-2 pl-2">
              <button className="h-6 w-6 rounded-full bg-purple-300  mr-2">
                4
              </button>
              <p>Pricing</p>
            </div>
          </div>
          <div className="mt-80">
            <hr />
            <div
              className="flex w-60 border border-black-700 rounded-full ml-4 py-2 pl-2 mt-6"
              onClick={() => {
                handleTabClick("tab5");
                handleClickSettings();
              }}
              style={{
                backgroundColor: activeTab === "tab5" ? "#7E22CE" : "",
                color: activeTab === "tab5" ? "white" : "",
              }}
            >
              <img alt="settings" src={settings} className="w-6 h-6 mr-1" />
              <p className="text-sm font-semibold">Settings</p>
            </div>
          </div>
        </div>
       
        <div>
          <ProjectUpload />
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
