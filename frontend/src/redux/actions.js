import axios from "axios";
import {
  CREATE_FILE_SUCCESS,
  DELETE_FILE_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FILE_OPERATION_FAILURE,
  GET_FILE_SUCCESS,
  PROJECT_CREATE_FAILED,
  PROJECT_CREATE_SUCCESS,
  UPDATE_FILE_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
} from "./actionTypes";

const apiUrl = "https://venturee.onrender.com";

export const loginOrCreateUser = (email) => async (dispatch) => {
  try {
    const response = await axios.post(`${apiUrl}/user`, { email });
    console.log(response)
    const { token, existingUser } = response.data;
    localStorage.setItem("loggedInUser", JSON.stringify(existingUser));
    localStorage.setItem("email", email);
    

    if (token) {
      localStorage.setItem("token", token);
    }

    dispatch({ type: USER_LOGIN_SUCCESS, payload: { token, existingUser } });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAILED, payload: error.message });
  }
};

const accessToken = localStorage.getItem("token");
const config = {
  headers: {
    authorization: `${accessToken}`,
  },
};
// Set th


// Action to create a project
export const createProjectForTheLoggedInUser =
  (email, projectName) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}/project/create`,
        {
          email,
          projectName,
        },
        config
      );
      const { newProject } = response.data;

      dispatch({
        type: PROJECT_CREATE_SUCCESS,
        payload: newProject,
      });
    } catch (error) {
      dispatch({ type: PROJECT_CREATE_FAILED, payload: error.message });
    }
  };
  export const fetchProjects = () => async (dispatch) => {
    try {
      dispatch({ type: FETCH_PROJECTS_REQUEST });
  
      const response = await axios.get(`${apiUrl}/project`, config);
      console.log(response);
  
      dispatch({
        type: FETCH_PROJECTS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      dispatch({
        type: FETCH_PROJECTS_FAILURE,
        payload: error,
      });
    }
  };
  
export const fetchProjectFiles = async (projectId) => {
  try {
    const response = await axios.get(
      `https://venturee.onrender.com/project/${projectId}`,
      config
    );
    return response.data; // Returns the files related to the project
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const createFile = (projectId, fileName, fileData) => {
  // creating a file
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://venturee.onrender.com/file/${projectId}`,
        {
          fileName,
          fileData,
        },
        config
      );
      dispatch({ type: CREATE_FILE_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FILE_OPERATION_FAILURE, payload: error.message });
    }
  };
};




export const deleteFile = (fileId) => async (dispatch) => {
  try {
    await axios.delete(`https://venturee.onrender.com/file/${fileId}`, config);
    dispatch({ type: DELETE_FILE_SUCCESS });
  } catch (error) {
    dispatch({ type: FILE_OPERATION_FAILURE, payload: error.message });
  }
};
export const getFileById = (fileId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://venturee.onrender.com/file/${fileId}`,
      config
    );
    dispatch({ type: GET_FILE_SUCCESS, payload: response.data });
    return response;
  } catch (error) {
    dispatch({ type: FILE_OPERATION_FAILURE, payload: error.message });
  }
};

export const updateFile = (fileId, fileData) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `https://venturee.onrender.com/file/${fileId}`,
      { fileData },
      config
    );
    dispatch({ type: UPDATE_FILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FILE_OPERATION_FAILURE, payload: error.message });
  }
};



