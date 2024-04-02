import { applyMiddleware, combineReducers, createStore } from "redux"
import { reducerAccount } from "../features/account/accountSlice"
import { reducerCustomer } from "../features/customers/customerSlice"
import { thunk } from "redux-thunk"
import { composeWithDevTools } from '@redux-devtools/extension'

import { configureStore } from "@reduxjs/toolkit"

//thunk acts as a middleware which allows ous to manipulate or fetching data before it reach the sotre


// Combine all the reducers that use the redux 
const rootReducer = combineReducers(
    {
        account : reducerAccount,
        customer :reducerCustomer
    }
)
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))



export default store