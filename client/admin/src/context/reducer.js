import React from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_ADMIN_BEGIN,
  SETUP_ADMIN_ERROR,
  SETUP_ADMIN_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_ADMIN,
  UPDATE_ADMIN_BEGIN,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  ADD_DOCUMENT_BEGIN,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_ERROR,
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values!",
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === SETUP_ADMIN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === SETUP_ADMIN_SUCCESS) {
    return {
      ...state,
      admin: action.payload.admin,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_ADMIN_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === LOGOUT_ADMIN) {
    return {
      ...initialState,
      admin: null,
      token: null,
    };
  }

  if (action.type === UPDATE_ADMIN_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === UPDATE_ADMIN_SUCCESS) {
    return {
      ...state,
      admin: action.payload.admin,
      token: action.payload.token,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Admin profile updated!",
    };
  }

  if (action.type === UPDATE_ADMIN_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editDocId: "",
      file: "",
      docTitle: "",
      docDescription: "",
      docType: "presentation-template",
    };

    return {
      ...state,
      ...initialState,
    };
  }

  if (action.type === ADD_DOCUMENT_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === ADD_DOCUMENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New Document Created!",
    };
  }
  if (action.type === ADD_DOCUMENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
