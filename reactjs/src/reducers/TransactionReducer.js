import * as ActionsTypes from "../ActionsTypes";

const initialState = {
  totalIncome: 0,
  totalExpense: 0,
  transactions: [],
  transactionTypes: [],
  expenseTags: [],
  message: "",
};

export const TransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.TOTAL_INCOME:
      return { ...state, totalIncome: action.data.total };
    case ActionsTypes.TOTAL_EXPENSE:
      return { ...state, totalExpense: action.data.total };
    case ActionsTypes.GET_ALL_TRANSACTIONS:
      return { ...state, transactions: action.data.transactions };
    case ActionsTypes.GET_ALL_TRANSACTION_TYPES:
      return { ...state, transactionTypes: action.data.transactionTypes };
    case ActionsTypes.GET_ALL_EXPENSE_TAGS:
      return { ...state, expenseTags: action.data.expenseTags };
    case ActionsTypes.ADD_TRANSACTION:
      return { ...state, message: action.data.message };
    default:
      return { ...state };
  }
};
