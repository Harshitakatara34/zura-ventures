import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, loginOrCreateUser } from "../redux/actions";

const UserEmailCollectionPopup = ({
  handleCloseEmailCollectionPopup,
  setShowEmailPopup,
  showEmailPopup,
}) => {
  const dispatch = useDispatch();
  const [warning, setWarning] = useState("");

  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmitEmail = () => {
    handleCloseEmailCollectionPopup();
    dispatch(loginOrCreateUser(email));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-3/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Welcome to LAMA.</h2>
        </div>
        <label className="block text-gray-400">
          Enter Your Email:
          <input
            type="email"
            placeholder="Type here ..."
            value={email}
            onChange={handleEmailChange}
            className="block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
          {warning && <p className="text-red-500 text-sm mt-1">{warning}</p>}
        </label>
        <div className="flex justify-center my-4">
          <button
            className={`px-4 py-2 rounded bg-purple-700 text-white font-semibold`}
            onClick={handleSubmitEmail}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEmailCollectionPopup;
