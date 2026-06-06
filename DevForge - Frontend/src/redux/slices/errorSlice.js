import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  errorInput: '',
  analysisResult: '',
  loading: false,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorInput: (state, action) => {
      state.errorInput = action.payload
    },

    setErrorResult: (state, action) => {
      state.analysisResult = action.payload
    },

    setErrorLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const {
  setErrorInput,
  setErrorResult,
  setErrorLoading,
} = errorSlice.actions

export default errorSlice.reducer