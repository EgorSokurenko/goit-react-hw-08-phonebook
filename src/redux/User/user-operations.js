import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logOutContcatSuccess } from "../Contact/contact-action";
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset(token) {
    axios.defaults.headers.common.Authorization = ``;
  },
};
export const register = createAsyncThunk("user/Reg", async (user, thunkApi) => {
  try {
    const { data } = await axios.post(
      "https://connections-api.herokuapp.com/users/signup",
      user
    );
    token.set(data.token);
    return data;
  } catch (error) {
    alert("Error");
    return thunkApi.rejectWithValue(error);
  }
});
export const login = createAsyncThunk("user/LogIn", async (user, thunkApi) => {
  try {
    const { data } = await axios.post(
      "https://connections-api.herokuapp.com/users/login",
      user
    );
    console.log(data);
    token.set(data.token);
    return data;
  } catch (error) {
    alert("Pls entry correct data");
    console.log(error);
    return thunkApi.rejectWithValue(error);
  }
});
export const logout = createAsyncThunk("user/LogOut", async (_, thunkApi) => {
  try {
    const { data } = await axios.post(
      "https://connections-api.herokuapp.com/users/logout"
    );
    token.unset();
    thunkApi.dispatch(logOutContcatSuccess());
    return;
  } catch (error) {
    alert("Error");
    return thunkApi.rejectWithValue(error);
  }
});
export const current = createAsyncThunk("user/Get", async (_, thunkApi) => {
  const { user } = thunkApi.getState();
  const persistorToken = user.token;

  if (persistorToken === null) {
    return null;
  } else {
    token.set(persistorToken);
    try {
      const { data } = await axios.get(
        "https://connections-api.herokuapp.com/users/current"
      );
      return data;
    } catch (error) {
      alert("Error");
      return thunkApi.rejectWithValue(error);
    }
  }
});
