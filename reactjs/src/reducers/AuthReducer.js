import * as ActionTypes from "../ActionsTypes";

const initialState = {
  user: "",
  error: "",
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
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
    case ActionTypes.LOGOUT:
      return { ...state, user: "", error: "" };

    default:
      return state;
  }
};
