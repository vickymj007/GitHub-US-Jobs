import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './jobSlice.js'
import userReducer from './userSlice.js'

export const store = configureStore({
    reducer:{
        jobs:jobReducer,
        user:userReducer
    }
})