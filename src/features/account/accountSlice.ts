import { createSlice } from "@reduxjs/toolkit"

type TStateAccount = {
    balance:number,
    loan:number,
    loanPurpose:string,
    isLoading:boolean
}
type TAction = {
    type : "account/deposit" | "account/withdraw" | "account/requestLoan" | "account/payLoan" | "account/convertingCurrency", 
    payload:  number | {ammount:number, purpose:string},  // amount to deposit

}


const initialState: TStateAccount = {
    balance:0,
    loan:0,
    loanPurpose:"",
    isLoading:false
}
const accountSlice = createSlice({
    name:"account",
    initialState,
    reducers:{ //use mutable values, less code modify the actual value without returning an object
        deposit(state, action:TAction){
            state.balance += action.payload 
            state.isLoading=false; 

        },
        withdraw(state,action:TAction){
            state.balance -= action.payload  
        },
        //if we want to receive more than one argument we need to prepare the arguments to the action payload
        requestLoan:{
            prepare(amount,purpose) {
                return{
                    payload : {amount,purpose}
                }
            },
            reducer(state,action:TAction) {
            if(state.loan > 0) return
            state.loan = action.payload.amount
            state.loanPurpose = action.payload.purpose
            state.balance += action.payload.amount

        }},
        payLoan(state){
            state.balance -= state.loan
            state.loan = 0 
            state.loanPurpose=""
        },
        convertingCurrency(state){
            state.isLoading=true;
        }
    }
})

console.log(accountSlice);
export function deposit(amount:number,currency:string) {
    if(currency==="USD") return {type:"account/deposit", payload:amount}
    
    //in order to use the thunks, redux identify the thunks if we return a function as bellow
    return async  function (dispatch,getState) {
         //API CALL
       dispatch({type:"account/convertingCurrency"})
       const res = await  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
       const data = await res.json()
       const converted = data.rates.USD;
       //RETURN ACTION
       dispatch({type:"account/deposit", payload:converted});
 
    }
 }
export const {withdraw,requestLoan,payLoan} = accountSlice.actions;//create variable for each action in slice
export default accountSlice.reducer;
// export function reducerAccount(state:TStateAccount=initialStateAccount,action:TAction) {
//     switch(action.type){
//         case "account/deposit": 
//         return {...state, balance: typeof(action.payload) === "number" &&  state.balance + action.payload, isLoading:false}

//         case "account/withdraw":
//         return {...state, balance: typeof(action.payload) === "number" &&  state.balance - action.payload }

//         case "account/requestLoan":
//             if(state.loan > 0 ) return state
//             return {...state, loan: typeof(action.payload) === "object" && action.payload.ammount, loanPurpose: typeof(action.payload) === "object" && action.payload.purpose, balance: typeof(action.payload) === "object" && action.payload.ammount + state.balance}
//         case "account/payLoan":
//             return{ ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan }
        
//         case "account/convertingCurrency":
//             return {...state, isLoading:true}
//         default: 
//             return state
//     }
// }

// export function deposit(amount:number,currency:string) {
//    if(currency==="USD") return {type:"account/deposit", payload:amount}
   
//    //in order to use the thunks, redux identify the thunks if we return a function as bellow
//    return async  function (dispatch,getState) {
//         //API CALL
//       dispatch({type:"account/convertingCurrency"})
//       const res = await  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//       const data = await res.json()
//       const converted = data.rates.USD;
//       //RETURN ACTION
//       dispatch({type:"account/deposit", payload:converted});

//    }
// }
// export function requestLoan(ammount:number, purpose:string) {
//     return {type:"account/requestLoan", payload:{ammount, purpose}}
// }
// export function withdraw(amount:number) {
//     return {type:"account/withdraw", payload:amount}
// }

// export function payLoan() {
//     return {type:"account/payLoan"}
// }