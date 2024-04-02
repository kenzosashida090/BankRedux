
import accountSlice from "../features/account/accountSlice"
import customerSlice from "../features/customers/customerSlice"
import { thunk } from "redux-thunk"
import { composeWithDevTools } from '@redux-devtools/extension'

import { configureStore } from "@reduxjs/toolkit"

//thunk acts as a middleware which allows ous to manipulate or fetching data before it reach the sotre


// Combine all the reducers that use the redux 
const store = configureStore({
    reducer: {
        account: accountSlice,
        customer: customerSlice,
    }
})
export default store