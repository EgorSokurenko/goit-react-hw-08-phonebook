import { createReducer } from "@reduxjs/toolkit";
import { register, login, logout, current } from "./user-operations";
const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

export const user = createReducer(initialState, {
  [register.fulfilled]: (_, { payload }) => {
    return { user: payload.user, token: payload.token };
  },
  [login.fulfilled]: (state, { payload }) => {
    return { user: payload.user, token: payload.token, isLoggedIn: true };
  },
  [logout.fulfilled]: () => {
    return initialState;
  },
  [current.fulfilled]: (state, { payload }) => {
    if (!payload) {
      return initialState;
    }
    const normUser = {
      ...state,
      user: { ...payload },
      isLoggedIn: true,
    };
    return normUser;
  },
  [current.pending]: (state, { payload }) => {
    return { ...state, isLoggedIn: "pending" };
  },
});
