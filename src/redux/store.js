import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from '../Components/calculator'
import savedReducer from '../Components/saved'
export default configureStore({
    reducer: {
        calculator: calculatorReducer,
        saved: savedReducer
    }
})