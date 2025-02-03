import { createSlice } from '@reduxjs/toolkit'

const intialValue = {
  allCategory: [],
  loadingCategory: false,
  allSubCategory: [],
  product: [],
}

const productSlice = createSlice({
  name: 'product',
  initialState: intialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = [...action.payload]
    },
    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload
    },
    setAllSubCategory: (state, action) => {
      state.allSubCategory = [...action.payload]
    },
  },
})

export const { setAllCategory, setLoadingCategory, setAllSubCategory } = productSlice.actions
export default productSlice.reducer
