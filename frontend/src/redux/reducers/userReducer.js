import {
  UPDATE_USERNAME_FAILED,
  UPDATE_USERNAME_SUCCESS,
  CREATE_FAILED,
  CREATE_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
} from "../actionTypes";

const initialState = {
  token: null,
  error: false,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.existinUser,
      };
    case CREATE_SUCCESS:
      return {
        ...state,
      };
    case LOGIN_FAILED:
    case CREATE_FAILED:
      return {
        ...state,
        token: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
