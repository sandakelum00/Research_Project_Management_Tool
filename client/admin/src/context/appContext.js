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
  CHANGE_PAGE,
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
  docs: [],
  docTypeOptions: ["presentation-template", "marking-scheme"],
  editDocId: "",
  totalDocs: 0,
  numOfPages: 1,
  page: 1,
  isEditing: false,
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  staffs: [],
  editStaffId: "",
  staffTypeOptions: ["supervisor", "co-supervisor"],
  panelMembers: [],
  panelTypeOptions: ["Pending", "Accept", "Reject"],
  totalPanelMembers: 0,
  editMemberId: "",
  students: [],
  totalStudents: 0,
  editStudentId: "",
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

  //add document
  const addDocument = async (formData) => {
    dispatch({ type: ADD_DOCUMENT_BEGIN });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/docs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      dispatch({ type: ADD_DOCUMENT_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: ADD_DOCUMENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //get all documents
  const getAllDocuments = async () => {
    const { page, search, searchType, sort } = state;

    let url = `http://localhost:5000/api/v1/docs?page=${page}&docType=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_DOCS_BEGIN });

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      const { docs, totalDocs, numOfPages } = data;

      dispatch({
        type: GET_DOCS_SUCCESS,
        payload: {
          docs,
          totalDocs,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutAdmin();
    }
    clearAlert();
  };

  //download document
  const downloadFile = async (values) => {
    const { id, path, mimetype } = values;

    dispatch({ type: DOC_DOWNLOAD_BEGIN });

    try {
      const result = await axios.get(
        `http://localhost:5000/api/v1/docs/${id}`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const split = path.split("/");
      const filename = split[split.length - 1];

      dispatch({
        type: DOC_DOWNLOAD_SUCCESS,
        payload: {
          result,
          filename,
          mimetype,
        },
      });
      // download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch({
          type: DOC_DOWNLOAD_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  //update document
  const setEditDoc = (id) => {
    dispatch({ type: SET_EDIT_DOC, payload: { id } });
  };

  const editDocument = async (formData) => {
    dispatch({ type: EDIT_DOC_BEGIN });

    try {
      await axios.put(
        `http://localhost:5000/api/v1/docs/${state.editDocId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({ type: EDIT_DOC_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_DOC_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  //delete document
  const deleteDocument = async (id) => {
    dispatch({ type: DELETE_DOC_BEGIN });

    try {
      await axios.delete(`http://localhost:5000/api/v1/docs/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      getAllDocuments();
    } catch (error) {
      logoutAdmin();
    }
  };

  //get all staff
  const getAllStaff = async () => {
    const { search, page, searchType, sort } = state;

    let url = `http://localhost:5000/api/v1/staff?page=${page}&userposition=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_STAFF_BEGIN });

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      const { staffs, totalStaff, numOfPages } = data;

      dispatch({
        type: GET_STAFF_SUCCESS,
        payload: {
          staffs,
          totalStaff,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutAdmin();
    }
    clearAlert();
  };

  //update staff
  const setEditStaff = (id) => {
    dispatch({ type: SET_EDIT_STAFF, payload: { id } });
  };

  const editStaff = async (formData) => {
    dispatch({ type: EDIT_STAFF_BEGIN });

    try {
      await axios.put(
        `http://localhost:5000/api/v1/staff/${state.editStaffId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({ type: EDIT_STAFF_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_STAFF_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  //delete staff
  const deleteStaff = async (id) => {
    dispatch({ type: DELETE_STAFF_BEGIN });

    try {
      await axios.delete(`http://localhost:5000/api/v1/staff/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      getAllStaff();
    } catch (error) {
      logoutAdmin();
    }
  };

  //get all panel members
  const getAllPanelMembers = async () => {
    const { search, page, searchType, sort } = state;

    let url = `http://localhost:5000/api/v1/panel?page=${page}&status=${searchType}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_PANEL_MEMBER_BEGIN });

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      const { panelMembers, totalPanelMembers, numOfPages } = data;

      dispatch({
        type: GET_PANEL_MEMBER_SUCCESS,
        payload: {
          panelMembers,
          totalPanelMembers,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutAdmin();
    }
    clearAlert();
  };

  //update panel member
  const setEditPanelMember = (id) => {
    dispatch({ type: SET_EDIT_PANEL_MEMBER, payload: { id } });
  };

  const editPanelMember = async (formData) => {
    dispatch({ type: EDIT_PANEL_MEMBER_BEGIN });

    try {
      await axios.put(
        `http://localhost:5000/api/v1/panel/${state.editMemberId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({ type: EDIT_PANEL_MEMBER_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PANEL_MEMBER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  //get all students
  const getAllStudents = async () => {
    const { page, search, sort } = state;

    let url = `http://localhost:5000/api/v1/student?page=${page}&sort=${sort}`;

    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_STUDENT_BEGIN });

    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });

      const { students, totalStudents, numOfPages } = data;

      dispatch({
        type: GET_STUDENT_SUCCESS,
        payload: {
          students,
          totalStudents,
          numOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
      // logoutAdmin();
    }
    clearAlert();
  };

  //update student
  const setEditStudent = (id) => {
    dispatch({ type: SET_EDIT_STUDENT, payload: { id } });
  };

  const editStudent = async (formData) => {
    dispatch({ type: EDIT_STUDENT_BEGIN });

    try {
      await axios.put(
        `http://localhost:5000/api/v1/student/${state.editStudentId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      dispatch({ type: EDIT_STUDENT_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_STUDENT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  //delete student
  const deleteStudent = async (id) => {
    dispatch({ type: DELETE_STUDENT_BEGIN });

    try {
      await axios.delete(`http://localhost:5000/api/v1/student/${id}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      });
      getAllStudents();
    } catch (error) {
      // logoutAdmin();
    }
  };

  //clear filter
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  //handel change
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
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

  //change page
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
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
        addDocument,
        getAllDocuments,
        downloadFile,
        setEditDoc,
        deleteDocument,
        editDocument,
        clearFilters,
        handleChange,
        getAllStaff,
        setEditStaff,
        deleteStaff,
        editStaff,
        getAllPanelMembers,
        editPanelMember,
        setEditPanelMember,
        getAllStudents,
        setEditStudent,
        editStudent,
        deleteStudent,
        changePage,
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
