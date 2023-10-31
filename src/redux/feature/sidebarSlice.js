import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  collapsed: true
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setToggleSidebar: (state) => {
      state.collapsed = !state.collapsed;
    }
  }
});

export const sidebarData = (state) => state.sidebarSlice;

export const { setToggleSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
