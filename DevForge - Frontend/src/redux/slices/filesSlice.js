import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  files: [],
  selectedFile: null,
  explainText: '',
}

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload
    },

    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload
    },

    setExplainText: (state, action) => {
      state.explainText = action.payload
    },
  },
})

export const {
  setFiles,
  setSelectedFile,
  setExplainText,
} = filesSlice.actions

export default filesSlice.reducer