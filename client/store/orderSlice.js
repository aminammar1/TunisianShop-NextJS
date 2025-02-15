import { createSlice } from '@reduxjs/toolkit'


const initialValue = {
    orderList: [],
    }

const orderSlice = createSlice({
    name: 'order',
    initialState: initialValue,
    reducers: {
        handleAddOrder: (state, action) => {
            state.orderList = [...action.payload]
        },
    },
})

export const { handleAddOrder } = orderSlice.actions

export default orderSlice.reducer