import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:'jobs',
    initialState:{
        data:null
    },
    reducers:{
        setData : (state,action)=>{
            state.data = action.payload
        }
    }
})

export const {setData} = jobSlice.actions

export default jobSlice.reducer