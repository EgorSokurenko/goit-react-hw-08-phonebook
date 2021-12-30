import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(token) {
    axios.defaults.headers.common.Authorization = ``;
  },
};
export const register = createAsyncThunk("user/Reg", async (user) => {
  try {
    const { data } = await axios.post(
      "https://connections-api.herokuapp.com/users/signup",
      user
    );
    token.set(data.token);
    return data;
  } catch (error) {
    return error;
  }
});
export const login = createAsyncThunk("user/LogIn", async (user) => {
  try {
    const { data } = await axios.post(
      "https://connections-api.herokuapp.com/users/login",
      user
    );
    token.set(data.token);
    return data;
  } catch (error) {
    // Fix
  }
});
export const logout = createAsyncThunk("user/LogOut", async () => {
  try {
    const { data } = await axios.post(
      "https://connections-api.herokuapp.com/users/logout"
    );
    token.unset();
    return;
  } catch (error) {
    // Fix
  }
});
