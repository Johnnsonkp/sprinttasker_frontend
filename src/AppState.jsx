import React, {useContext, useReducer} from "react"; 

////////////////////////////////////////////////////////////////////
// INITIAL STATE //
////////////////////////////////////////////////////////////////////

const initialState = {
    url: "http://localhost:3000", // Change before deploying 
    token: null,
    username: null,
    name: null,
    email: null,
    usertasks: [],
    alltasks: [],
    user_id: 0
}

////////////////////////////////////////////////////////////////////
// REDUCER //
////////////////////////////////////////////////////////////////////

const reducer = (state, action) => {
    let newState;
    switch(action.type){
        case "auth":
            newState = {...state, ...action.payload}
            return newState;
            break;
        case "logout":
            newState = {...state, token: null, username: null, name: null, email: null, user_id: null, usertasks: null}
            window.localStorage.removeItem('auth')
            window.localStorage.removeItem('getTasks')
            return newState;
            break;
        case "getTasks":
            newState = {...state, alltasks: action.payload}
            return newState;
            break;
         default: 
            return state 
            break;
    }   
};

////////////////////////////////////////////////////////////////////
// APP CONTEXT //
////////////////////////////////////////////////////////////////////
const AppContext = React.createContext(null)

////////////////////////////////////////////////////////////////////
// APP STATE COMPONENT //
////////////////////////////////////////////////////////////////////

export const AppState = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <AppContext.Provider value={{state, dispatch}}>
        {props.children}
    </AppContext.Provider>
}

////////////////////////////////////////////////////////////////////
// USEAPPSTATE HOOK //
////////////////////////////////////////////////////////////////////

export const useAppState = () => {
    return React.useContext(AppContext)
}