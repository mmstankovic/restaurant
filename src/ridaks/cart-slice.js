import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {items: [], totalQuantity: 0, totalAmount: 0, changed: false},
    reducers: {
        addItemToCart: (state, action) => {
            const newItem = action.payload

            const existingCartItem = state.items.find(item => item.id === newItem.id)
           
            state.totalQuantity = state.totalQuantity + (newItem.quantity || 1)
            state.totalAmount = state.totalAmount + newItem.quantity * newItem.price
            state.changed = true

            if(existingCartItem) {
                existingCartItem.quantity++
                existingCartItem.totalPrice = existingCartItem.totalPrice + newItem.price
            } else {
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    totalPrice: newItem.price,
                    quantity: newItem.quantity || 1
                })
            }
        },
        removeItemFromCart: (state, action) => {
            const id = action.payload

            const existingCartItem = state.items.find((item) => item.id === id)
            state.totalQuantity--
            state.totalAmount = state.totalAmount - existingCartItem.price
            state.changed = true

            if(existingCartItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingCartItem.quantity--
                existingCartItem.totalPrice = existingCartItem.totalPrice - existingCartItem.price
            }
        },
        cancelTheItem: (state, action) => {
            const id = action.payload

            const existingCartItem = state.items.find((item) => item.id === id)
            
           state.totalQuantity = state.totalQuantity - existingCartItem.quantity
           state.items = state.items.filter(item => item.id !== id)
           state.totalAmount = state.totalAmount - existingCartItem.price * existingCartItem.quantity

           state.changed = true
        },
        replaceCart: (state, action) => {
            state.items = action.payload.items
            state.totalQuantity = action.payload.totalQuantity
            state.totalAmount = action.payload.totalAmount
        },
        clearCart: (state, action) => {
            state.items = []
            state.totalAmount = 0
            state.totalQuantity = 0
            state.changed = true
        }
    }
})
export const cartSliceActions = cartSlice.actions

export default cartSlice