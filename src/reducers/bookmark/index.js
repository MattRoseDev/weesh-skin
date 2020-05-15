export const bookmarkReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_BOOKMARK_DATA': 
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}