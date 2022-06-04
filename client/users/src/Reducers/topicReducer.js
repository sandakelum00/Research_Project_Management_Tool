import{
    TOPIC_LIST_REQUEST,
    TOPIC_LIST_SUCCESS,
    TOPIC_LIST_FAIL,
    TOPIC_UPDATE_REQUEST,
    TOPIC_UPDATE_SUCCESS,
    TOPIC_UPDATE_FAIL
} from "../Constants/topicConstant"

export const topicListReducer = (state = { groupsubmissions: [] }, action) => {
  switch (action.type) {
    case TOPIC_LIST_REQUEST:
      return { loading: true };
    case TOPIC_LIST_SUCCESS:
      return { loading: false, groupsubmissions: action.payload };
    case TOPIC_LIST_FAIL:
      return { loading: false, groupsubmissions: action.payload };
    default:
      return state;
  }
};

export const topicUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TOPIC_UPDATE_REQUEST:
      return { loading: true };
    case TOPIC_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case TOPIC_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};