import{
    MARK_CREATE_REQUEST,
    MARK_CREATE_SUCCESS,
    MARK_CREATE_FAIL,

    MARK_LIST_REQUEST,
    MARK_LIST_SUCCESS,
    MARK_LIST_FAIL,

    MARK_UPDATE_REQUEST,
    MARK_UPDATE_SUCCESS,
    MARK_UPDATE_FAIL,

    MARK_DELETE_REQUEST,
    MARK_DELETE_SUCCESS,
    MARK_DELETE_FAIL
} from "../Constants/markConstants";

export const markListReducer = (state = {marks: []}, action)=>{

       switch (action.type) {
         case MARK_LIST_REQUEST:
           return { loading: true };
         case MARK_LIST_SUCCESS:
           return { loading: false, marks: action.payload };
         case MARK_LIST_FAIL:
           return { loading: false, marks: action.payload };
         default:
           return state;
       }
}

export const addMarksReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_CREATE_REQUEST:
      return { loading: true };
    case MARK_CREATE_SUCCESS:
      return { loading: false, success: true };
    case MARK_CREATE_FAIL:
      return { loading: false, Error: action.payload };
    default:
      return state;
  }
};


export const markUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_UPDATE_REQUEST:
      return { loading: true };
    case MARK_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case MARK_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const markDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_DELETE_REQUEST:
      return { loading: true };
    case MARK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case MARK_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
