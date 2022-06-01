import React from "react";
import download from "downloadjs";
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
  ADD_DOCUMENT_BEGIN,
  ADD_DOCUMENT_SUCCESS,
  ADD_DOCUMENT_ERROR,
  GET_DOCS_BEGIN,
  GET_DOCS_SUCCESS,
  DOC_DOWNLOAD_BEGIN,
  DOC_DOWNLOAD_SUCCESS,
  DOC_DOWNLOAD_ERROR,
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

  if (action.type === GET_DOCS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_DOCS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      docs: action.payload.docs,
      totalDocs: action.payload.totalDocs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === DOC_DOWNLOAD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DOC_DOWNLOAD_SUCCESS) {
    download(
      action.payload.result.data,
      action.payload.filename,
      action.payload.mimetype
    );
    return {
      ...state,
      isLoading: false,
      alertType: "success",
      alertText: "Document downloading....",
    };
  }
  if (action.type === DOC_DOWNLOAD_ERROR) {
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
