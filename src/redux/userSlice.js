import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        data:null,
        resumeData:null
    },
    reducers:{
        setUser : (state,action)=>{
            state.data = action.payload
        },
        setResumeData : (state,action)=>{
            state.resumeData = action.payload
        },
    }
})

export const {setUser, setResumeData} = userSlice.actions

export default userSlice.reducer