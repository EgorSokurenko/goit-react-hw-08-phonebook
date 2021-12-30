import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contacts, error, isLoading } from "./Contact/contact-reducer";
import filter from "./Filter/filter-reducer";
import { user } from "./User/user-reducer";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
const userStore = persistReducer(authPersistConfig, user);
const rootReducer = combineReducers({
  user: userStore,
  items: contacts,
  isLoading,
  error,
  filter: filter,
});

export const store = configureStore({
  reducer: rootReducer,
});
export const persistor = persistStore(store);
