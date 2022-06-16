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
