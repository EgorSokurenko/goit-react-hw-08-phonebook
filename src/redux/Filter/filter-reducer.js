import { createReducer } from "@reduxjs/toolkit";
import { onFilter } from "./filter-action";

const filter = createReducer("", {
  [onFilter]: (state, { payload }) => payload,
});
export default filter;
