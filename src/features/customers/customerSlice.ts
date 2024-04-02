import { createSlice } from "@reduxjs/toolkit"

type TStateCustomer = {
    fullName:string,
    nationalId: string,
    createdAt: string | Date,
}

type TActionCustomer = {
    type : "customer/createCustomer" | "customer/updateName" | "customer/requestLoan" | "customer/payLoan", 
    payload: string | TStateCustomer,  // amount to deposit

}

const initialState: TStateCustomer = {
    fullName:"",
    nationalId:"",
    createdAt:""
}
const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers:{
        createCustomer:{
            prepare(fullName: string, nationalId: string){
                return{
                    payload:{fullName,nationalId,createdAt: new Date().toISOString()}
                }
            },

            reducer(state, action) {
                state.fullName=action.payload.fullName; 
                state.nationalId=action.payload.nationalId
                state.createdAt=action.payload.createdAt
            }
        },
        updateName(state,action) {
            state.fullName = action.payload
        }
    }
})

export default customerSlice.reducer
export const {createCustomer, updateName} = customerSlice.actions
// export function reducerCustomer(state:TStateCustomer= initialStateCustomer, action:TActionCustomer) {
//     switch (action.type) {
//         case "customer/createCustomer":
//             return{...state, fullName:  action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt }
//         case "customer/updateName":
//             return{...state, fullName: action.payload}
    
//         default:
//             return state

// }
// }
// export function createCustomer(fullName:string,nationalId:string){
//     return {type:"customer/createCustomer", payload:{fullName,nationalId,createdAt:new Date().toISOString()}};
// }

// export function updateName(fullName:string){
//     return {type:"customer/updateName", payload:{fullName}}
// }
