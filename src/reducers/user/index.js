export const userReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER_DATA': 
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}