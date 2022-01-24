import React, {useReducer} from "react";

////////////////////////////////////////////////////////////////////
// INITIAL STATE //
////////////////////////////////////////////////////////////////////

const initialState = {
    // url: "http://localhost:3000", // Change before deploying 
    url: "https://sprinttaskerbackend.herokuapp.com",
    token: null,
    username: null,
    name: null,
    email: null,
    usertasks: [],
    alltasks: null,
    user_id: 0,
    work_mode: false,
    notes: [],
    selectedTask: '',
    selectedNote: [],
    subtask: '',
    timer: 0,
    inProgressTimer: 0,
    new: {
        title: "",
        body: ""
    },
    edit: {
        id: 0,
        title: "",
        body: ""
    }
}

////////////////////////////////////////////////////////////////////
// REDUCER //
////////////////////////////////////////////////////////////////////

export const reducer = (state, action) => {
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
            window.localStorage.removeItem('tasks')
            return newState;
            break;
        case "getTasks":
            newState = {...state, alltasks: action.payload}
            console.log('getTasks:', state.alltasks)
            return newState;
            break;
        case "workMode":
            newState = {...state, work_mode: action.payload}
            return newState;
            break;
        case "getNotes":
            // console.log("payload", action.payload)
            newState = {...state, notes: action.payload}
            return newState;
            break;
        case "selectTask":
            newState = {...state, selectedTask: action.payload}
            return newState;
            break;
        case "unSelectTask":
            newState = {...state, selectedTask: action.payload}
            return newState;
            break;
        case "selectedNote":
            newState = {...state, selectedNote: action.payload}
            return newState;
            break;
        case "timer":
            newState = {...state, timer: action.payload}
            return newState;
            break;
        case "inProgressTimer":
            newState = {...state, inProgressTimer: action.payload}
            return newState;
            break;
        case "stopTimer":
            newState = {...state, timer: action.payload}
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