import axios from "axios";
import {
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT,
  STUDENT_UPDATE_REQUEST,
  STUDENT_UPDATE_SUCCESS,
  STUDENT_UPDATE_FAIL
} from "../constants/studentConstants";

export const register =
  (fullName, studentId, email, password) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/students/registerStudent",
        { fullName, studentId, email, password },
        config
      );

      dispatch({ type: STUDENT_REGISTER_SUCCESS, payload: data });

      dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: STUDENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const login = (studentId, password) => async (dispatch) => {
    try {
      dispatch({ type: STUDENT_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/students/loginStudent",
        { studentId, password },
        config
      );
  
      dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: STUDENT_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: STUDENT_LOGOUT });
  };
  
  export const updateProfile = (student) => async (dispatch, getState) => {
    try {
      dispatch({ type: STUDENT_UPDATE_REQUEST });
  
      const {
        studentLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put("http://localhost:5000/api/students/profileStudent", student, config);
  
      dispatch({ type: STUDENT_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: STUDENT_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: STUDENT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };