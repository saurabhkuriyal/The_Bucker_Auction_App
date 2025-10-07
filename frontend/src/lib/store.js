import userReducer from "@/lib/features/userSlice";
import { configureStore } from '@reduxjs/toolkit';

//global store

export const makeStore = () => {
    return configureStore({
        reducer: userReducer
    })
}