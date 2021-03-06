import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { studentRegisterReducer } from "./reducers/studentReducer";
import { studentLoginReducer } from "./reducers/studentReducer"
import { studentUpdateReducer } from "./reducers/studentReducer";
import { groupCreateReducer } from "./reducers/groupReducer";
import { submissionCreateReducer, submissionDeleteReducer, submissionListReducer } from "./reducers/submissionReducer";

const reducer = combineReducers({
  studentRegister: studentRegisterReducer,
  studentLogin: studentLoginReducer,
  studentUpdate: studentUpdateReducer,
  groupCreate: groupCreateReducer,
  submissionList: submissionListReducer,
  submissionCreate: submissionCreateReducer,
  submissionDelete: submissionDeleteReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  studentLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
