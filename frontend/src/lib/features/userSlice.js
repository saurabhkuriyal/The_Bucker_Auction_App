import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userId:"",
    username:"",
    email:"",
    role:""
}

export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.userId=action.payload.userId,
            state.username=action.payload.username,
            state.email=action.payload.email,
            state.role=action.payload.role
    }

    }
})

export const {setUser}=userSlice.actions;

export default userSlice.reducer;