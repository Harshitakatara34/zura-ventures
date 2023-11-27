import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProjectPage from "./ProjectPage";
import PageNotFound from "./PageNotFound";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
