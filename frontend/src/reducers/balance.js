import { GET_BALANCE, UPDATE_BALANCE } from "../constants/actionTypes";

const balanceReducer = (state = 0, action) => {
  switch (action.type) {
    case GET_BALANCE:
      return action.payload;
    case UPDATE_BALANCE:
      return action.payload;
    default:
      return state;
  }
};
export default balanceReducer;