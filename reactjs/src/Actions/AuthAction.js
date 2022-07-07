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

      localStorage.setItem("user", result.data.user);
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

export const logout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch({
      type: ActionTypes.LOGOUT,
    });
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    var result;
    try {
      result = await axiosInstance.post("user/signup", data);

      localStorage.setItem("user", result.data.user);
      dispatch({
        type: ActionTypes.SIGNUP,
        data: {
          user: result.data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.SIGNUP_FAILED,
        data: {
          error: "Soemthing went wrong.please try again with valid data.",
        },
      });
      console.log(error);
    }
  };
};

export const getUser = () => {
  return async (dispatch) => {
    var result;
    try {
      const userId = localStorage.getItem("user");
      result = await axiosInstance.get("user/" + userId);

      dispatch({
        type: ActionTypes.GET_USER,
        data: {
          user: result.data,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};
