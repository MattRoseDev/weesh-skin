export const tagReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TAG_DATA':
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}
