import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import {staffLoginReducer,staffRegisterReducer} from "./Reducers/staffReducers"
// import {fileDeleteReducer, 
//     fileDownloadReducer,fileUpdateReducer,fileUploadReducer,fileListReducer} from "./Reducers/fileReducer";
import {
  markDeleteReducer,
  markUpdateReducer,
  addMarksReducer,
  markListReducer,
} from "./Reducers/markReducers";

import {topicListReducer,topicUpdateReducer} from "./Reducers/topicReducer"
const reducer = combineReducers({
  staffLogin: staffLoginReducer,
  staffRegister: staffRegisterReducer,
  markDelete: markDeleteReducer,
  markUpdate: markUpdateReducer,
  addMarks: addMarksReducer,
  markList: markListReducer,
  topicList: topicListReducer,
  topicUpdate: topicUpdateReducer,
  //   fileDelete:fileDeleteReducer,
  //   fileDownload:fileDownloadReducer,
  //   fileUpdate:fileUpdateReducer,
  //   fileUpload:fileUploadReducer,
  //   fileList:fileListReducer,
});

const staffInformStorage = localStorage.getItem("staffInfo")
? JSON.parse(localStorage.getItem("staffInfo"))
: null;

const initialState = {
    staffLogin:{staffInfo: staffInformStorage},
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;