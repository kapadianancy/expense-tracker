import * as ActionTypes from "../ActionsTypes";
import axiosInstance from "../axios";

export const getTotalIncome = () => {
  return async (dispatch) => {
    try {
      var userId = localStorage.getItem("user");
      var result = await axiosInstance.get(
        "/transaction/total-income/" + userId
      );

      dispatch({
        type: ActionTypes.TOTAL_INCOME,
        data: {
          total: result.data.total,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getTotalExpense = () => {
  return async (dispatch) => {
    try {
      var userId = localStorage.getItem("user");
      var result = await axiosInstance.get(
        "/transaction/total-expense/" + userId
      );

      dispatch({
        type: ActionTypes.TOTAL_EXPENSE,
        data: {
          total: result.data.total,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllTransactions = (query = "") => {
  return async (dispatch) => {
    try {
      var userId = localStorage.getItem("user");
      var result = await axiosInstance.get(
        "/transaction/" + userId + "?" + query
      );

      dispatch({
        type: ActionTypes.GET_ALL_TRANSACTIONS,
        data: {
          transactions: result.data.transactions,
        },
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: ActionTypes.GET_ALL_TRANSACTIONS,
        data: {
          transactions: [],
        },
      });
    }
  };
};

export const getAllTransactionTypes = () => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.get("/transactionTypes");

      dispatch({
        type: ActionTypes.GET_ALL_TRANSACTION_TYPES,
        data: {
          transactionTypes: result.data,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getAllExpenseTags = () => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.get("/expenseTags");

      dispatch({
        type: ActionTypes.GET_ALL_EXPENSE_TAGS,
        data: {
          expenseTags: result.data,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const addTransaction = (data) => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.post("/transaction/add", data);

      dispatch({
        type: ActionTypes.ADD_TRANSACTION,
        data: {
          message:
            result.status === "201" ? result.data.message : result.data.error,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};
