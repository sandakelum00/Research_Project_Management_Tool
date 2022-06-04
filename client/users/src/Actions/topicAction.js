import {
  TOPIC_LIST_REQUEST,
  TOPIC_LIST_SUCCESS,
  TOPIC_LIST_FAIL,
  TOPIC_UPDATE_REQUEST,
  TOPIC_UPDATE_SUCCESS,
  TOPIC_UPDATE_FAIL,
} from "../Constants/topicConstant";
import axios from "axios";

export const listTopicAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOPIC_LIST_REQUEST,
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
      "http://localhost:5000/api/topic/",
      config
    );

    dispatch({
      type: TOPIC_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: TOPIC_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateTopicAction =
  (id, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TOPIC_UPDATE_REQUEST,
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
        `http://localhost:5000/api/topic/${id}`,
        { status },
        config
      );

      dispatch({
        type: TOPIC_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type:TOPIC_UPDATE_FAIL,
        payload: message,
      });
    }
  };
