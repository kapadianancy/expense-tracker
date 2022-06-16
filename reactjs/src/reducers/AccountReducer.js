import * as ActionsTypes from "../ActionsTypes";

const initialState = {
  count: 0,
  totalBalance: 0,
};

export const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionsTypes.ACCOUNT_COUNT:
      return { ...state, count: action.data.count };
    case ActionsTypes.TOTAL_ACCOUNT_BALANCE:
      return { ...state, totalBalance: action.data.total };
    default:
      return { ...state };
  }
};
