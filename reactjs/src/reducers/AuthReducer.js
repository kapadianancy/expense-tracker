import * as ActionTypes from "../ActionsTypes";

const initialState = {
  user: "",
  error: "",
  userData: {},
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.data.user,
        error: "",
      };
    case ActionTypes.SIGNUP:
      return {
        ...state,
        user: action.data.user,
        error: "",
      };

    case ActionTypes.LOGIN_FAILED:
      return {
        ...state,
        error: action.data.error,
        user: "",
      };
    case ActionTypes.SIGNUP_FAILED:
      return {
        ...state,
        error: action.data.error,
        user: "",
      };
    case ActionTypes.LOGOUT:
      return { ...state, user: "", error: "" };

    case ActionTypes.GET_USER:
      return { ...state, userData: action.data.user };

    default:
      return state;
  }
};
