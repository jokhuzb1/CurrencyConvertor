import { configureStore } from "@reduxjs/toolkit";
import Counter from "../Components/Counter";
export default configureStore({
    reducer: {
        counter: Counter,

    }
})