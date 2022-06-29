import * as ActionTypes from "../ActionsTypes";
import axiosInstance from "../axios";

export const getAccountCount = () => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.get("/acc/total-acc");

      dispatch({
        type: ActionTypes.ACCOUNT_COUNT,
        data: {
          count: result.data[0].count,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getTotalAccountBalance = () => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.get("/acc/total-income");

      dispatch({
        type: ActionTypes.TOTAL_ACCOUNT_BALANCE,
        data: {
          total: result.data[0].total,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllAccounts = () => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.get("/acc");
      dispatch({
        type: ActionTypes.GET_ALL_ACCOUNTS,
        data: {
          accounts: result.data.accounts,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const addAccount = (data) => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.post("/acc/add", data);
      dispatch({
        type: ActionTypes.ADD_ACCOUNT,
        data: {
          message:
            result.data.status === "201"
              ? result.data.message
              : result.data.error,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const deleteAccount = (id) => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.delete("/acc/delete/" + id);
      dispatch({
        type: ActionTypes.DELETE_ACCOUNT,
        data: {
          message:
            result.data.status === "200"
              ? result.data.message
              : result.data.error,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const editAccount = (id, data) => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.patch("/acc/edit/" + id, data);
      dispatch({
        type: ActionTypes.EDIT_ACCOUNT,
        data: {
          message:
            result.data.status === "200"
              ? result.data.message
              : result.data.error,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};
