import {
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
  STAFF_LOGOUT,
  STAFF_REGISTER_REQUEST,
  STAFF_REGISTER_SUCCESS,
  STAFF_REGISTER_FAIL
} from "../Constants/staffConstants";

export const staffLoginReducer = (state = {}, action)=>{
    switch (action.type) {
      case STAFF_LOGIN_REQUEST:
        return { loading: true };

      case STAFF_LOGIN_SUCCESS:
        return { loading: true, staffInfo: action.payload };

      case STAFF_LOGIN_FAIL:
        return { loading: false, error: action.payload };

      case STAFF_LOGOUT:
        return {};

      default:
        return state;
    }
};

export const staffRegisterReducer = (state = {}, action)=>{
     switch (action.type) {
       case STAFF_REGISTER_REQUEST:
         return { loading: true };

       case STAFF_REGISTER_SUCCESS:
         return { loading: true, staffInfo: action.payload, success: true };

       case STAFF_REGISTER_FAIL:
         return { loading: false, error: action.payload, success: false };

       default:
         return state;
     }
};

