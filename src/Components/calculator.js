import { createSlice } from "@reduxjs/toolkit";



export const calculatorSlice = createSlice({

    name: 'calculator',
    initialState: {
        result: 0,
        baseCurrency: "aud",
        secondCurrency: "usd",
        secondCurrencyAt: 0,
        amountToConvert: 0,

    },

    reducers: {
        setBaseCurrency: (state, action) => {
            state.baseCurrency = action.payload;
        },
        setSecondCurrency: (state, action) => {
            state.secondCurrency = action.payload;
        },
        setAmountToConvert: (state, action) => {
            state.amountToConvert = action.payload;
        },
        setResult: (state, action) => {
            state.result = action.payload;
        },
        setSecondCurrencyAt: (state, action) => {
            state.secondCurrencyAt = action.payload;
        }


    }
})


export const { setBaseCurrency, setAmountToConvert, setSecondCurrency, setResult, setSecondCurrencyAt } = calculatorSlice.actions;
export default calculatorSlice.reducer;