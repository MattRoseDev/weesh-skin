export const weeshReducer = (state, action) => {
    let characterCount
    switch (action.type) {
        case "ADD_WEESH":
            return {
                ...state,
                ...action.data,
            }
        case "ADD_CONTENT":
            characterCount = action.data.content.length
            return {
                ...state,
                ...action.data,
                characterCount,
            }
        case "EMPTY_SUGGESTION":
            return {
                ...state,
                suggestions: [],
                allowShowSuggestions: true,
            }
        case "ADD_SUGGESTION":
            return {
                ...state,
                ...action.data,
                allowShowSuggestions: true,
            }
        default:
            return state
    }
}
