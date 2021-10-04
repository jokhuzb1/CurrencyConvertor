import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


export const savedSlice = createSlice({

    name: 'saved',
    initialState: {
        history: []
    },


    reducers: {
        addToSaved: (state, action) => {
            state.history.push(action.payload)
        },

    }
})


export const { addToSaved } = savedSlice.actions;
export default savedSlice.reducer;