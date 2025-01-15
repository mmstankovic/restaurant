import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {cartIsVisible: false},
    reducers: {
        showCartHandler: (state) => {
            state.cartIsVisible = true
        },
        closeCartHandler: (state) => {
            state.cartIsVisible = false
        }
    }
})
export const uiSliceActions = uiSlice.actions

export default uiSlice