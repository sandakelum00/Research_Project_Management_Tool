import {
  MARK_CREATE_REQUEST,
  MARK_CREATE_SUCCESS,
  MARK_CREATE_FAIL,
  MARK_LIST_REQUEST,
  MARK_LIST_SUCCESS,
  MARK_LIST_FAIL,
  MARK_UPDATE_REQUEST,
  MARK_UPDATE_SUCCESS,
  MARK_UPDATE_FAIL,
  MARK_DELETE_REQUEST,
  MARK_DELETE_SUCCESS,
  MARK_DELETE_FAIL,
} from "../Constants/markConstants";
import axios from "axios";

//Get the marks
export const listMarksAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARK_LIST_REQUEST,
    });

    const {
      staffLogin: { staffInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${staffInfo.token}`,
      },
    };

    const { data } = await axios.get(
      "http://localhost:5000/api/marks",
      config
    );

    dispatch({
      type: MARK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MARK_LIST_FAIL,
      payload: message,
    });
  }
};

export const addMarkAction =
  (year, groupid, mark) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MARK_CREATE_REQUEST,
      });

      const {
        staffLogin: { staffInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${staffInfo.token}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/marks/addMarks",
        { year, groupid, mark },
        config
      );

      dispatch({
        type: MARK_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: MARK_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateMarkAction =
  (id, year, groupid, mark) => async (dispatch, getState) => {
    try {
      dispatch({
        type: MARK_UPDATE_REQUEST,
      });

      const {
        staffLogin: { staffInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${staffInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:5000/api/marks/${id}`,
        { year, groupid, mark },
        config
      );

      dispatch({
        type: MARK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: MARK_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteMarkAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARK_DELETE_REQUEST,
    });

    const {
      staffLogin: { staffInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${staffInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `http://localhost:5000/api/marks/${id}`,
      config
    );

    dispatch({
      type: MARK_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: MARK_DELETE_FAIL,
      payload: message,
    });
  }
};