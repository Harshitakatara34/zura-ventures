import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import projectReducer from "./reducers/projectReducer";
import userReducer from "./reducers/userReducer";
import fileReducer from "./reducers/fileReducer";
const rootReducer = combineReducers({
  projectReducer,
  userReducer,
  fileReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
