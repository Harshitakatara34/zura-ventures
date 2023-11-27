import React from "react";
import fileUploadIcon from "../assets/fileUploadIcon.png";
const NoFileScreen = () => {
  return (
    <div className="ml-80 w-3/4 mt-8 flex justify-center items-center">
      <div>
        <h1 className="mb-4 text-base font-semibold px-72 ml-60"> Or</h1>
        <div className="border border-gray-500 rounded-md border-dashed pb-6 px-72">
          <img src={fileUploadIcon} alt="upload file" className="w-24 ml-52" />
          <h3 className="text-md font-semibold text-gray-600">
            Select a file or drag and drop here (Podcast Media Or Transcription
            Text)
          </h3>
          <p className="text-sm font-semibold text-gray-500 ml-32">
            MP4 , MOV ,MP3, WAV, PDF, DOCX or TXT file
          </p>
          <button className="ml-52 mt-4 px-6 py-2 text-purple-700 border border-purple-600 rounded-full">
            Select file
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoFileScreen;
