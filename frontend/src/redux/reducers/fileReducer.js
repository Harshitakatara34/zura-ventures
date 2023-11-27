import {
  CREATE_FILE_SUCCESS,
  DELETE_FILE_SUCCESS,
  FILE_OPERATION_FAILURE,
  GET_FILE_SUCCESS,
  UPDATE_FILE_SUCCESS,
} from "../actionTypes";

const initialState = {
  file: {},
  error: false,
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FILE_SUCCESS:
    case GET_FILE_SUCCESS:
    case UPDATE_FILE_SUCCESS:
      return {
        ...state,
        file: action.payload,
      };
    case DELETE_FILE_SUCCESS:
      return {
        ...state,
        file: {},
      };
    case FILE_OPERATION_FAILURE:
      return {
        ...state,
        file: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
