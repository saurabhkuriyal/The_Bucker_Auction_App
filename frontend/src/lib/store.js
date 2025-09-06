import userReducer from "@/lib/features/userSlice";
import { configureStore } from '@reduxjs/toolkit';

export const makeStore = () => {
    return configureStore({
        reducer: userReducer
    })
}