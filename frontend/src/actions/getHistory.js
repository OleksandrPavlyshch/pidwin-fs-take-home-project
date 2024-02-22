import { GET_HISTORY } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const getHistory = () => async (dispatch) => {
  try {
    const { data } = await api.getHistory();
    dispatch({ type: GET_HISTORY, payload: data });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};