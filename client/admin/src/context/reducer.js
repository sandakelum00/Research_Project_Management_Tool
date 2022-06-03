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
  SET_EDIT_DOC,
  EDIT_DOC_BEGIN,
  EDIT_DOC_SUCCESS,
  EDIT_DOC_ERROR,
  DELETE_DOC_BEGIN,
  HANDLE_CHANGE,
  CLEAR_FILTERS,
  GET_STAFF_BEGIN,
  GET_STAFF_SUCCESS,
  SET_EDIT_STAFF,
  EDIT_STAFF_BEGIN,
  EDIT_STAFF_SUCCESS,
  EDIT_STAFF_ERROR,
  DELETE_STAFF_BEGIN,
  GET_PANEL_MEMBER_BEGIN,
  GET_PANEL_MEMBER_SUCCESS,
  SET_EDIT_PANEL_MEMBER,
  EDIT_PANEL_MEMBER_BEGIN,
  EDIT_PANEL_MEMBER_SUCCESS,
  EDIT_PANEL_MEMBER_ERROR,
  GET_STUDENT_BEGIN,
  GET_STUDENT_SUCCESS,
  SET_EDIT_STUDENT,
  EDIT_STUDENT_BEGIN,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_ERROR,
  DELETE_STUDENT_BEGIN,
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

  if (action.type === SET_EDIT_DOC) {
    return {
      ...state,
      isEditing: true,
      editDocId: action.payload.id,
    };
  }

  if (action.type === EDIT_DOC_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_DOC_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Document Updated!",
    };
  }

  if (action.type === EDIT_DOC_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_DOC_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }

  if (action.type === GET_STAFF_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_STAFF_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      staffs: action.payload.staffs,
      totalStaff: action.payload.totalStaff,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_STAFF) {
    return {
      ...state,
      isEditing: true,
      editStaffId: action.payload.id,
    };
  }

  if (action.type === EDIT_STAFF_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_STAFF_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Staff Updated!",
    };
  }

  if (action.type === EDIT_STAFF_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_STAFF_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_PANEL_MEMBER_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_PANEL_MEMBER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      panelMembers: action.payload.panelMembers,
      totalPanelMembers: action.payload.totalPanelMembers,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_PANEL_MEMBER) {
    return {
      ...state,
      isEditing: true,
      editMemberId: action.payload.id,
    };
  }

  if (action.type === EDIT_PANEL_MEMBER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_PANEL_MEMBER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Status Updated!",
    };
  }

  if (action.type === EDIT_PANEL_MEMBER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_STUDENT_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_STUDENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      students: action.payload.students,
      totalStudents: action.payload.totalStudents,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === SET_EDIT_STUDENT) {
    return {
      ...state,
      isEditing: true,
      editStudentId: action.payload.id,
    };
  }

  if (action.type === EDIT_STUDENT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === EDIT_STUDENT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Student Updated!",
    };
  }

  if (action.type === EDIT_STUDENT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_STUDENT_BEGIN) {
    return { ...state, isLoading: true };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
