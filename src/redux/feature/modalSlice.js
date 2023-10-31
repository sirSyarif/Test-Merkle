import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: ''
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload;
    },
    setSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload;
    }
  }
});

export const modalState = (state) => state.modalSlice;

export const { setLoading, setError, setSuccess, setErrorMsg } = modalSlice.actions;

export default modalSlice.reducer;
