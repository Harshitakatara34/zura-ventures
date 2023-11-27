import {
  UPDATE_USERNAME_FAILED,
  UPDATE_USERNAME_SUCCESS,
  USER_CREATE_FAILED,
  USER_CREATE_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
} from "../actionTypes";

const initialState = {
  token: null,
  error: false,
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.existinUser,
      };
    case USER_CREATE_SUCCESS:
      return {
        ...state,
      };
    case USER_LOGIN_FAILED:
    case USER_CREATE_FAILED:
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
