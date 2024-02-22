import { GET_BALANCE } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const getBalance = () => async (dispatch) => {
  try {
    const { data } = await api.getBalance();
    dispatch({ type: GET_BALANCE, payload: data.balance });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};