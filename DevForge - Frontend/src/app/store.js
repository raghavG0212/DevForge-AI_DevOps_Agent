import { configureStore } from '@reduxjs/toolkit'

import workflowReducer from '../redux/slices/workflowSlice'
import analysisReducer from '../redux/slices/analysisSlice'
import filesReducer from '../redux/slices/filesSlice'
import errorReducer from '../redux/slices/errorSlice'

export const store = configureStore({
  reducer: {
    workflow: workflowReducer,
    analysis: analysisReducer,
    files: filesReducer,
    error: errorReducer,
  },
})