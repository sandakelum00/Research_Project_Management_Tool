import axios from "axios";
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

  export const listSubmissions = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBMISSION_LIST_REQUEST,
      });
  
      const {
        studentLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`http://localhost:5000/api/groupSubmission/submissions`, config);
  
      dispatch({
        type: SUBMISSION_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SUBMISSION_LIST_FAIL,
        payload: message,
      });
    }
  };

  export const createSubmissionAction =
  (LeaderNo, title, supervisor, cosupervisor) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBMISSION_CREATE_REQUEST,
      });

      const {
        studentLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `http://localhost:5000/api/groupSubmission/submitGroup`,
        { LeaderNo, title, supervisor, cosupervisor},
        config
      );

      dispatch({
        type: SUBMISSION_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SUBMISSION_CREATE_FAIL,
        payload: message,
      });
    }
  };

  export const deleteSubmissionAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBMISSION_DELETE_REQUEST,
      });
  
      const {
        studentLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete(`http://localhost:5000/api/groupSubmission/${id}`, config);
  
      dispatch({
        type: SUBMISSION_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: SUBMISSION_DELETE_FAIL,
        payload: message,
      });
    }
  };