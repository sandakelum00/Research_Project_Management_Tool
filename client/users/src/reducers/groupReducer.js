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

// export const groupListReducer = (state = { groups: [] }, action) => {
//   switch (action.type) {
//     case GROUP_LIST_REQUEST:
//       return { loading: true };
//     case GROUP_LIST_SUCCESS:
//       return { loading: false, groups: action.payload };
//     case GROUP_LIST_FAIL:
//       return { loading: false, error: action.payload };

//     default:
//       return state;
//   }
// };

export const groupCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_CREATE_REQUEST:
      return { loading: true };
    case GROUP_CREATE_SUCCESS:
      return { loading: false, success: true };
    case GROUP_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// export const groupUpdateReducer = (state = {}, action) => {
//   switch (action.type) {
//     case GROUP_UPDATE_REQUEST:
//       return { loading: true };
//     case GROUP_UPDATE_SUCCESS:
//       return { loading: false, success: true };
//     case GROUP_UPDATE_FAIL:
//       return { loading: false, error: action.payload, success: false };

//     default:
//       return state;
//   }
// };
