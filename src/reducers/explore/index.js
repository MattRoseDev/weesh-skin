export const exploreReducer = (state, action) => {
    switch (action.type) {
        case 'EXPLORE':
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}
