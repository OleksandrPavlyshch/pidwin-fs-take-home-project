import { GET_BALANCE } from "../constants/actionTypes";

const balansReducer = (state = 0, action) => {
  switch (action.type) {
    case GET_BALANCE:
      return action.payload;
    default:
      return state;
  }
};
export default balansReducer;