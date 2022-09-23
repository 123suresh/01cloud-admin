import initialState from "./initialState";
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  UPDATE_BREADCRUMB,
} from "./actions";

const reducer = (state = initialState, payload) => {
  switch (payload.type) {
    case FETCH_USERS:
      return {
        ...state,
        fetchingUser: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        userList: payload.data?.data ?? [],
        userCount: payload.data?.count,
        fetchingUser: false,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        fetchingUser: false,
        error: payload.data?.error,
      };
    case UPDATE_BREADCRUMB: 
    return {
      ...state,
      breadcrumbData : payload.data.payload
    }

    default:
      return state;
  }
};

export default reducer;
