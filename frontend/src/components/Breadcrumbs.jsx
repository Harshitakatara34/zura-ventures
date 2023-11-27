import React from "react";
import { Link } from "react-router-dom";
import home from "../assets/home.svg";
const Breadcrumbs = ({ text1, text2 }) => {
  return (
    <div className="ml-80 mt-0">
      <nav className="text-lg">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <img src={home} alt="home-pic" />
            <span className="mx-2">/</span>
          </li>
          {text1 && (
            <>
              {" "}
              <li className="flex items-center">
                <Link to="" className="text-gray-600 hover:underline">
                  {text1}
                </Link>
                <span className="mx-2">/</span>
              </li>
            </>
          )}

          <li className="flex items-center">
            <Link to={``} className="text-purple-700 hover:underline">
              {text2}
            </Link>
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
