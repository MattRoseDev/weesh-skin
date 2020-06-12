export const weeshPageReducer = (state, action) => {
    let weeshComments
    switch(action.type) {
        case 'SET_WEESH': 
            return {
                ...state,
                ...action.data
            }
        case 'SET_TEXTAREA': 
            return {
                ...state,
                ...action.data
            }
        case 'ADD_COMMENT': 
            if(state.reply) {
                weeshComments = state.comment.weeshComments
                weeshComments = weeshComments.map(weeshComment => {
                    if (weeshComment.id == state.reply.parentId) {
                        weeshComment.children.weeshComments.push(action.data)
                    }
                    return weeshComment
                })
            } else {
                weeshComments = state.comment.weeshComments
                weeshComments.push(action.data)
            }
            
            return {
                ...state,
                comment: {
                    ...state.comment,
                    weeshComments
                },
                reply: null
            }
        case 'SET_REPLY': 
            let reply = {
                parentId: action.data.id,
                id: action.data.user.id,
                username: action.data.user.username,
            }
            return {
                ...state,
                reply
            }
        case 'UNSET_REPLY': 
            return {
                ...state,
                reply: null
            }
        default:
            return state
    }
}