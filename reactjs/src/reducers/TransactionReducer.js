import * as ActionsTypes from "../ActionsTypes";

const initialState = {
  totalIncome: 0,
  totalExpense: 0,
};

export const TransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.TOTAL_INCOME:
      return { ...state, totalIncome: action.data.total };
    case ActionsTypes.TOTAL_EXPENSE:
      return { ...state, totalExpense: action.data.total };
    default:
      return { ...state };
  }
};
