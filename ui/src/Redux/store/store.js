import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";


const store = configureStore(
    {
        reducer: {
            Land: cartSlice
        },
        
    }
)

export default store;