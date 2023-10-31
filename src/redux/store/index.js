import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "../feature/sidebarSlice";
import modalSlice from "../feature/modalSlice";

const store = configureStore({
  reducer: {
    sidebarSlice,
    modalSlice,
  },
});

export default store;
