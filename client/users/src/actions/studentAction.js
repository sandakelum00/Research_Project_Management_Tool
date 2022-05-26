import axios from "axios";
import {
  STUDENT_REGISTER_FAIL,
  STUDENT_REGISTER_REQUEST,
  STUDENT_REGISTER_SUCCESS,
  STUDENT_LOGIN_REQUEST,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT
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

      localStorage.setItem("studentInfo", JSON.stringify(data));
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
  
      localStorage.setItem("studentInfo", JSON.stringify(data));
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
    localStorage.removeItem("studentInfo");
    dispatch({ type: STUDENT_LOGOUT });
  };
  