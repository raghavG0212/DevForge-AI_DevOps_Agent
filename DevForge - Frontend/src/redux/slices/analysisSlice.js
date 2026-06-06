import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projectName: '',
  analysis: null,
}

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setAnalysis: (state, action) => {
      state.analysis = action.payload
    },

    setProjectName: (state, action) => {
      state.projectName = action.payload
    },
  },
})

export const {
  setAnalysis,
  setProjectName,
} = analysisSlice.actions

export default analysisSlice.reducer