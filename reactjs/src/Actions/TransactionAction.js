import * as ActionTypes from "../ActionsTypes";
import axiosInstance from "../axios";

export const getTotalIncome = () => {
  return async (dispatch) => {
    try {
      var result = await axiosInstance.get("/transaction/total-income");

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
      var result = await axiosInstance.get("/transaction/total-expense");

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
