import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
        cartItems: [],
        totalQuantity: 0,
    },
    reducers:{
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
            state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
          },
          updateCartItemQuantity: (state, action) => {
            const item = state.cartItems.find(item => item._id === action.payload._id);
            if (item) {
              item.quantity = action.payload.quantity;
              state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            }
          },
          addItemToCart: (state, action) => {
            state.cartItems.push(action.payload);
            state.totalQuantity += action.payload.quantity;
          },
          removeItemToCart: (state, action) => {
            state.cartItems.push(action.payload);
            state.totalQuantity += action.payload.quantity;
          },
    }
})

export const  {setCartItems ,updateCartItemQuantity ,addItemToCart,removeItemToCart} = cartSlice.actions;
export default cartSlice.reducer;