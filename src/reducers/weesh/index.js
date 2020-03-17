export const weeshReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_WEESH': 
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}