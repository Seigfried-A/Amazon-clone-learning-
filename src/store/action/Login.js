import * as action from './actionTypes';


export const setUser = (authUser) => {
    return{
        type: action.SET_USER,
        user: authUser
    }
}
