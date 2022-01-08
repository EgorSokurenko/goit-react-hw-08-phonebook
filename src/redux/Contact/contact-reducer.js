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
  logOutContcatSuccess,
} from "./contact-action";
import { asyncChangeContact } from "./contact-operation";

export const contacts = createReducer([], {
  [getContactSuccess]: (state, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactSuccess]: (state, { payload }) => payload,
  [asyncChangeContact.fulfilled]: (state, { payload }) => payload,
  [logOutContcatSuccess]: (state, { payload }) => [],
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
  [asyncChangeContact.rejected]: (_, payload) =>
    `changeContactError:${payload}`,
});
