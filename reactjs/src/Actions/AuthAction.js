import * as ActionTypes from "../ActionsTypes";
import axiosInstance from "../axios";

export const login = (username, password) => {
  return async (dispatch) => {
    var result;
    try {
      result = await axiosInstance.post("user/login", {
        username: username,
        password: password,
      });

      localStorage.setItem("user", result);
      dispatch({
        type: ActionTypes.LOGIN,
        data: {
          user: result.data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.LOGIN_FAILED,
        data: {
          error: "Unauthorized",
        },
      });
      console.log(error);
    }
  };
};
