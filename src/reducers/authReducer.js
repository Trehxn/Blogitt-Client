const INITIAL_STATE = {
  loading: false,
  isFetched: false,
  error: null,
  user: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN_START":
      return {
        ...state,
        loading: true,
        isFetched: false,
        error: null,
        user: {},
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        loading: false,
        isFetched: true,
        error: null,
        user: action.payload,
      };
    case "SIGN_IN_ERROR":
      return {
        ...state,
        error: action.payload,
        isFetched: true,
        loading: false,
        user: {},
      };
    case "SIGN_OUT":
      return {
        ...state,
        isFetched: true,
        loading: false,
        error: null,
        user: {},
      };
    case "NO_USER_FOUND":
      return {
        ...state,
        isFetched: true,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
