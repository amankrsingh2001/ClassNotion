import {configureStore} from "@reduxjs/toolkit"
import { rootReducer } from "../reducer/combinedReducer"

export const store = configureStore({
    reducer:rootReducer
})