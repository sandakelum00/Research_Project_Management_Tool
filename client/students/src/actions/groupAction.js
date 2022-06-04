import axios from "axios";
import {
    GROUP_CREATE_FAIL,
    GROUP_CREATE_REQUEST,
    GROUP_CREATE_SUCCESS,
    GROUP_LIST_FAIL,
    GROUP_LIST_REQUEST,
    GROUP_LIST_SUCCESS,
    GROUP_UPDATE_FAIL,
    GROUP_UPDATE_REQUEST,
    GROUP_UPDATE_SUCCESS,
  } from "../constants/groupConstants";

//   export const listGroup = () => async (dispatch, getState) => {
//     try {
//       dispatch({
//         type: TASKS_LIST_REQUEST,
//       });
  
//       const {
//         userLogin: { userInfo },
//       } = getState();
  
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };
  
//       const { data } = await axios.get(`http://localhost:5000/api/studentGroup`, config);
  
//       dispatch({
//         type: GROUP_LIST_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       dispatch({
//         type: GROUP_LIST_FAIL,
//         payload: message,
//       });
//     }
//   };

  export const createGroupAction =
  (teamName, s1sid, s1email, s2sid, s2email, s3sid, s3email, s4sid, s4email) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GROUP_CREATE_REQUEST,
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
        `http://localhost:5000/api/studentGroup/createGroup`,
        { teamName, s1sid, s1email, s2sid, s2email, s3sid, s3email, s4sid, s4email },
        config
      );

      dispatch({
        type: GROUP_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GROUP_CREATE_FAIL,
        payload: message,
      });
    }
  };