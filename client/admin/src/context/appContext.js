import React, { useReducer, useContext } from "react";

import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_ADMIN_BEGIN,
  SETUP_ADMIN_ERROR,
  SETUP_ADMIN_SUCCESS,
  UPDATE_ADMIN_BEGIN,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_ADMIN,
} from "./actions";

const token = localStorage.getItem("token");
const admin = localStorage.getItem("admin");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  admin: admin ? JSON.parse(admin) : null,
  token: token,
  showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //display alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  //clear alert
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //add admin to local storage
  const addAdminToLocalStorage = ({ admin, token }) => {
    localStorage.setItem("admin", JSON.stringify(admin));
    localStorage.setItem("token", token);
  };

  //remove admin from local storage
  const removeAdminFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  };

  //login and register user
  const setupAdmin = async ({ currentAdmin, endPoint, alertText }) => {
    dispatch({ type: SETUP_ADMIN_BEGIN });

    try {
      if (
        endPoint === "register" &&
        currentAdmin.confirm !== currentAdmin.password
      ) {
        dispatch({
          type: SETUP_ADMIN_ERROR,
          payload: { msg: "Please Check Your Password " },
        });
      } else {
        const response = await axios.post(
          `http://localhost:5000/api/v1/admin-auth/${endPoint}`,
          currentAdmin
        );
        console.log(response);
        const { admin, token } = response.data;

        dispatch({
          type: SETUP_ADMIN_SUCCESS,
          payload: { admin, token, alertText },
        });

        //local storage
        addAdminToLocalStorage({ admin, token });
      }
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: SETUP_ADMIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //update admin
  const updateAdmin = async (currentAdmin) => {
    dispatch({ type: UPDATE_ADMIN_BEGIN });

    try {
      const response = await axios.put(
        "http://localhost:5000/api/v1/admin-auth/update",
        currentAdmin,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log(response);
      const { admin, token } = response.data;

      dispatch({
        type: UPDATE_ADMIN_SUCCESS,
        payload: { admin, token },
      });

      //local storage
      addAdminToLocalStorage({ admin, token });
    } catch (error) {
      console.log(error.response);

      dispatch({
        type: UPDATE_ADMIN_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  //
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  //
  const logoutAdmin = () => {
    dispatch({ type: LOGOUT_ADMIN });
    removeAdminFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupAdmin,
        toggleSidebar,
        logoutAdmin,
        updateAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
