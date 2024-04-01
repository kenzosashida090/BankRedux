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

const initialStateAccount : TStateAccount = {
    balance:0,
    loan:0,
    loanPurpose:"",
    isLoading:false
}
export function reducerAccount(state:TStateAccount=initialStateAccount,action:TAction) {
    switch(action.type){
        case "account/deposit": 
        return {...state, balance: typeof(action.payload) === "number" &&  state.balance + action.payload, isLoading:false}

        case "account/withdraw":
        return {...state, balance: typeof(action.payload) === "number" &&  state.balance - action.payload }

        case "account/requestLoan":
            if(state.loan > 0 ) return state
            return {...state, loan: typeof(action.payload) === "object" && action.payload.ammount, loanPurpose: typeof(action.payload) === "object" && action.payload.purpose, balance: typeof(action.payload) === "object" && action.payload.ammount + state.balance}
        case "account/payLoan":
            return{ ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan }
        
        case "account/convertingCurrency":
            return {...state, isLoading:true}
        default: 
            return state
    }
}

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
export function requestLoan(ammount:number, purpose:string) {
    return {type:"account/requestLoan", payload:{ammount, purpose}}
}
export function withdraw(amount:number) {
    return {type:"account/withdraw", payload:amount}
}

export function payLoan() {
    return {type:"account/payLoan"}
}