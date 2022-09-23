import { 
    UPLOAD_FILE,
    UPLOAD_FILE_SUCCESS,
    UPLOAD_FILE_FAILURE,
    UPLOAD_MULTIPLE_FILES,
    UPDATE_NAV,
  } from './actions';
  import initialState from './initialState';
  
  const reducer = (state = initialState, payload ) => {
    switch (payload.type) {
      case UPLOAD_FILE:
        return {
          ...state,
          uploadingFile : true
        }
      case UPLOAD_MULTIPLE_FILES:
        return {
          ...state,
          uploadingFile : true
        }
      case UPLOAD_FILE_SUCCESS:
        return {
          ...state,
          uploadingFile: false
        }
      case UPLOAD_FILE_FAILURE:
        return {
          ...state,
          uploadingFile : false
        }
      case UPDATE_NAV:
        return {
          ...state,
          nav : {
            navText: payload.data.navText,
            toLink: payload.data.toLink
          }
        }
      default:
        return state
    }
  }
  
  export default reducer