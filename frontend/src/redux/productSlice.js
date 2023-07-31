import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList : [],
    cartItem : []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers : {
        setDataProduct : (state, action)=>{
            // console.log(action)
            state.productList = [...action.payload]
        },
        addCartItem : (state, action)=>{
            console.log(action)
            const total = action.payload.price
            state.cartItem = [...state.cartItem,{...action.payload, qty : 1, total : total}]
        },
        deleteCardItem : (state, action)=>{

        }
    }
})

export const {setDataProduct, addCartItem, deleteCardItem} = productSlice.actions
export default productSlice.reducer