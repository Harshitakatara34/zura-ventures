import React from "react";
import { Routes, Route } from "react-router-dom";
import ProjectPage from "./ProjectPage";
import HomePage from "./HomePage";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
     
      </Routes>
    </div>
  );
};

export default AllRoutes;
