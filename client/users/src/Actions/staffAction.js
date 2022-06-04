import axios from 'axios';

import {
  STAFF_LOGIN_REQUEST,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
  STAFF_LOGOUT,
  STAFF_REGISTER_REQUEST,
  STAFF_REGISTER_SUCCESS,
  STAFF_REGISTER_FAIL
} from "../Constants/staffConstants";


export const login = (useremail, userpassword) => async (dispatch) => {
  try {
    dispatch({ type: STAFF_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/staff/loginStaff",
      { useremail, userpassword },
      config
    );

    dispatch({ type: STAFF_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("staffInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STAFF_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = ()=> async (dispatch)=>{
    localStorage.removeItem("staffInfo");
    dispatch({type: STAFF_LOGOUT});
};

export const register = (username, useremail, userposition, userpassword, researchInterestingAreas,department)=> async (dispatch)=>{
    try {
        dispatch({type: STAFF_REGISTER_REQUEST});

        const config ={
            headers: {
                "Content-type" : "application/json",
            },
        };

        const { data } = await axios.post(
          "http://localhost:5000/api/staff/registerStaff",
          {
            username,
            useremail,
            userposition,
            userpassword,
            researchInterestingAreas,
            department,
          },
          config
        );

        dispatch({ type: STAFF_REGISTER_SUCCESS, payload: data });

        dispatch({ type: STAFF_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("staffInfo", JSON.stringify(data));
    } catch (error) {
         dispatch({
           type: STAFF_REGISTER_FAIL,
           payload:
             error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
         });
    };
};

