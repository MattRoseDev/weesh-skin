export const editProfileReducer = (state, action) => {
    switch(action.type) {
        case 'EDIT_PROFILE': 
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}