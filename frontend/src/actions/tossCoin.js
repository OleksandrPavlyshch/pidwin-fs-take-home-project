import { UPDATE_BALANCE } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const tossCoin = (formData) => async (dispatch) => {
    try {
      const { data } = await api.tossCoin(formData);
        dispatch({ type: UPDATE_BALANCE, payload: data.balance });
        return data;
    } catch (error) {
        messages.error(
            error?.response?.data?.message || "Something went wrong"
        );
    }
};
