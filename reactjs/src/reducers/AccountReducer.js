import * as ActionsTypes from "../ActionsTypes";

const initialState = {
  count: 0,
  totalBalance: 0,
  accounts: [],
  message: "",
};

export const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.ACCOUNT_COUNT:
      return { ...state, count: action.data.count };
    case ActionsTypes.TOTAL_ACCOUNT_BALANCE:
      return { ...state, totalBalance: action.data.total };
    case ActionsTypes.GET_ALL_ACCOUNTS:
      return { ...state, accounts: action.data.accounts };
    case ActionsTypes.ADD_ACCOUNT:
      return { ...state, message: action.data.message };
    case ActionsTypes.DELETE_ACCOUNT:
      return { ...state, message: action.data.message };
    case ActionsTypes.EDIT_ACCOUNT:
      return { ...state, message: action.data.message };
    default:
      return { ...state };
  }
};
