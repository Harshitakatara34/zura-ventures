import {
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_PROJECTS_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAILED,
} from "../actionTypes";

const initialState = {
  newProject: {},
  projects: [],
  error: false,
  loading: false,
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case PROJECT_CREATE_SUCCESS:
      return {
        ...state,
        newProject: action.payload.newProject,
      };
    case PROJECT_CREATE_FAILED:
      return {
        ...state,
        newProject: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default projectReducer;
