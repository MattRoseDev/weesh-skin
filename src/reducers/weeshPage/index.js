export const weeshPageReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WEESH': 
            return {
                ...state,
                ...action.data
            }
        case 'ADD_COMMENT': 
            let weeshComments = state.comment.weeshComments
            weeshComments.push(action.data)
            return {
                ...state,
                comment: {
                    ...state.comment,
                    weeshComments
                }
            }
        default:
            return state
    }
}