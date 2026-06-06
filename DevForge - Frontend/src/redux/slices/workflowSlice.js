import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentStep: 1,
  progress: 0,
  loading: false,
  logs: [],
}

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setProgress: (state, action) => {
      state.progress = action.payload
    },

    setLoading: (state, action) => {
      state.loading = action.payload
    },

    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },

    addLog: (state, action) => {
      state.logs.push(action.payload)
    },

    resetWorkflow: () => initialState,
  },
})

export const {
  setProgress,
  setLoading,
  setCurrentStep,
  addLog,
  resetWorkflow,
} = workflowSlice.actions

export default workflowSlice.reducer