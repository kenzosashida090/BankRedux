import { combineReducers, createStore } from "redux"

type TStateAccount = {
    balance:number,
    loan:number,
    loanPurpose:string,
}
type TStateCustomer = {
    fullName:string,
    nationalId: string,
    createdAt: string | Date,
}
type TAction = {
    type : "account/deposit" | "account/withdraw" | "account/requestLoan" | "account/payLoan", 
    payload:  number | {ammount:number, purpose:string},  // amount to deposit

}
type TActionCustomer = {
    type : "customer/createCustomer" | "customer/updateName" | "customer/requestLoan" | "customer/payLoan", 
    payload: string | TStateCustomer,  // amount to deposit

}
const initialStateAccount : TStateAccount = {
    balance:0,
    loan:0,
    loanPurpose:""
}

const initialStateCustomer: TStateCustomer = {
    fullName:"",
    nationalId:"",
    createdAt:""
}

function reducer(state:TStateAccount=initialStateAccount,action:TAction) {
    switch(action.type){
        case "account/deposit": 
        return {...state, balance: typeof(action.payload) === "number" &&  state.balance + action.payload}

        case "account/withdraw":
        return {...state, balance: typeof(action.payload) === "number" &&  state.balance - action.payload }

        case "account/requestLoan":
            if(state.loan > 0 ) return state
            return {...state, loan: typeof(action.payload) === "object" && action.payload.ammount, loanPurpose: typeof(action.payload) === "object" && action.payload.purpose, balance: typeof(action.payload) === "object" && action.payload.ammount + state.balance}
        case "account/payLoan":
            return{ ...state, loan: typeof(action.payload) === "object" &&  action.payload.ammount, loanPurpose: typeof(action.payload) === "object" &&  action.payload.purpose, balance: state.balance - state.loan }
        default: 
            return state
    }
}

function reducerCustomer(state:TStateCustomer= initialStateCustomer, action:TActionCustomer) {
    switch (action.type) {
        case "customer/createCustomer":
            return{...state, fullName:  action.payload.fullName, nationalId: action.payload.nationalId, createdAt: action.payload.createdAt }
        case "customer/updateName":
            return{...state, fullName: action.payload.fullName}
    
        default:
            return state

}
}
const rootReducer = combineReducers(
    {
        account : reducer,
        customer :reducerCustomer
    }
)
const store = createStore(rootReducer)

function deposit(amount:number) {
    return {type:"account/deposit", payload:amount}
}
function requestLoan(ammount:number, purpose:string) {
    return {type:"account/requestLoan", payload:{ammount, purpose}}
}
function withdraw(amount:number) {
    return {type:"account/withdraw", payload:amount}
}

function createCustomer(fullName:string,nationalId:string){
    return {type:"customer/createCustomer", payload:{fullName,nationalId,createdAt:new Date().toISOString()}};
}

function updateName(fullName:string){
    return {type:"customer/updateName", payload:{fullName}}
}

store.dispatch(deposit(500))

store.dispatch(withdraw(100))
store.dispatch(createCustomer("kenzosashida", "1234"))
console.log(store.getState())