import { combineReducers, createReducer } from "@reduxjs/toolkit";
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
import { asyncChangeContact } from "./contact-operation";

const ContactState = [];

export const contacts = createReducer(ContactState, {
  [getContactSuccess]: (state, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactSuccess]: (state, { payload }) => payload,
  [asyncChangeContact.fulfilled]: (state, { payload }) => payload,
});
export const isLoading = createReducer(false, {
  [addContactRequest]: () => true,
  [addContactError]: () => false,
  [deleteContactRequest]: () => true,
  [deleteContactError]: () => false,
  [getContactRequest]: () => true,
  [getContactError]: () => false,
});
export const error = createReducer(null, {
  [addContactError]: (_, payload) => `AddContactError: ${payload}`,
  [deleteContactError]: (_, payload) => `deleteContactError: ${payload}`,
  [getContactError]: (_, payload) => `getContactError: ${payload}`,
});
