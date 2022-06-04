import {
    SUBMISSION_CREATE_FAIL,
    SUBMISSION_CREATE_REQUEST,
    SUBMISSION_CREATE_SUCCESS,
    SUBMISSION_LIST_FAIL,
    SUBMISSION_LIST_REQUEST,
    SUBMISSION_LIST_SUCCESS,
    SUBMISSION_DELETE_FAIL,
    SUBMISSION_DELETE_REQUEST,
    SUBMISSION_DELETE_SUCCESS,
  } from "../constants/submissionConstants";

  export const submissionListReducer = (state = { submissions: [] }, action) => {
    switch (action.type) {
      case SUBMISSION_LIST_REQUEST:
        return { loading: true };
      case SUBMISSION_LIST_SUCCESS:
        return { loading: false, submissions: action.payload };
      case SUBMISSION_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export const submissionCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBMISSION_CREATE_REQUEST:
        return { loading: true };
      case SUBMISSION_CREATE_SUCCESS:
        return { loading: false, success: true };
      case SUBMISSION_CREATE_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const submissionDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case SUBMISSION_DELETE_REQUEST:
        return { loading: true };
      case SUBMISSION_DELETE_SUCCESS:
        return { loading: false, success: true };
      case SUBMISSION_DELETE_FAIL:
        return { loading: false, error: action.payload, success: false };
  
      default:
        return state;
    }
  };
  