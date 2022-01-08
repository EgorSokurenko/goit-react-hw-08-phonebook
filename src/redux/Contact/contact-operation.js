import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
  getContactRequest,
  getContactSuccess,
  getContactError,
} from "./contact-action";
const axios = require("axios");

export const asyncGetContact = () => async (dispatch) => {
  dispatch(getContactRequest());
  axios
    .get("https://connections-api.herokuapp.com/contacts")
    .then((response) => dispatch(getContactSuccess(response.data)))
    .catch((error) => dispatch(getContactError(error)));
};
export const asyncAddContact = (name, number) => async (dispatch) => {
  dispatch(addContactRequest());
  const newContact = { name, number };
  try {
    const addContact = await axios.post(
      "https://connections-api.herokuapp.com/contacts",
      newContact
    );
    dispatch(addContactSuccess(addContact.data));
  } catch (error) {
    console.log(error);
    dispatch(addContactError(error));
  }
};
export const asyncDeleteContact = (id) => async (dispatch) => {
  dispatch(deleteContactRequest);
  try {
    const deleteContact = await axios.delete(
      `https://connections-api.herokuapp.com/contacts/${id}`
    );
    const newContact = await axios.get(
      "https://connections-api.herokuapp.com/contacts"
    );
    dispatch(deleteContactSuccess(newContact.data));
  } catch (error) {
    dispatch(deleteContactError(error));
  }
};
export const asyncChangeContact = createAsyncThunk(
  "contacts/changeContact",
  async ({ id, contact }, thunkApi) => {
    try {
      console.log(contact);
      const { data } = await axios.patch(
        `https://connections-api.herokuapp.com/contacts/${id}`,
        contact
      );
      const newContact = await axios.get(
        "https://connections-api.herokuapp.com/contacts"
      );
      return newContact.data;
    } catch (error) {
      alert("Error");
      return thunkApi.rejectWithValue(error);
    }
  }
);
