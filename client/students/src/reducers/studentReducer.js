import {
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGOUT,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL
} from "../constants/studentConstants";

export const studentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_REGISTER_REQUEST:
      return { loading: true };
    case STUDENT_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case STUDENT_REGISTER_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const studentLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_LOGIN_REQUEST:
      return { loading: true };
    case STUDENT_LOGIN_SUCCESS:
      return { loading: true, userInfo: action.payload };
    case STUDENT_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case STUDENT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const studentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case STUDENT_UPDATE_REQUEST:
      return { loading: true };
    case STUDENT_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case STUDENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};