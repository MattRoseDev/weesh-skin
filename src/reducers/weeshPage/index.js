export const weeshPageReducer = (state, action) => {
    let weeshComments
    switch (action.type) {
        case "SET_WEESH":
            return {
                ...state,
                ...action.data,
            }
        case "SET_TEXTAREA":
            return {
                ...state,
                ...action.data,
            }
        case "ADD_COMMENT":
            if (state.reply) {
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
                    weeshComments,
                },
                reply: null,
            }
        case "REMOVE_COMMENT":
            weeshComments = state.comment.weeshComments
            weeshComments = weeshComments.filter(weeshComment => {
                if (weeshComment.id != action.data.id) {
                    return weeshComment
                }
            })
            return {
                ...state,
                comment: {
                    ...state.comment,
                    weeshComments,
                },
            }
        case "SET_REPLY":
            let reply = {
                parentId: action.data.id,
                id: action.data.user.id,
                username: action.data.user.username,
            }
            return {
                ...state,
                reply,
            }
        case "UNSET_REPLY":
            return {
                ...state,
                reply: null,
            }
        case "LIKE_COMMENT":
            weeshComments = modifyCommentById({
                weeshComments: state.comment.weeshComments,
                value: 1,
                commentId: action.data.commentId,
            })
            return {
                ...state,
                comment: {
                    ...state.comment,
                    weeshComments,
                },
            }
        case "DISLIKE_COMMENT":
            weeshComments = modifyCommentById({
                weeshComments: state.comment.weeshComments,
                value: -1,
                commentId: action.data.commentId,
            })
            return {
                ...state,
                comment: {
                    ...state.comment,
                    weeshComments,
                },
            }
        default:
            return state
    }
}

const modifyCommentById = ({ weeshComments, value, commentId }) => {
    return weeshComments.map(comment => {
        if (comment.id == commentId) {
            comment.like.paginate.totalDocs =
                comment.like.paginate.totalDocs + value
            comment.isLiked = value == 1 ? true : false
        }
        let children
        if (comment.children) {
            children = modifyCommentById({
                weeshComments: comment.children.weeshComments,
                value,
                commentId,
            })
        }
        comment = {
            ...comment,
            children: {
                ...comment.children,
                ...children,
            },
        }
        return comment
    })
}
