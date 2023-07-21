import {configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice';

export const store = configureStore({
    reducer: {
        userSliceReducer
    },
});