export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN': 
            return {
                ...state,
                token: action.token
            }
        default:
            return state
    }
}