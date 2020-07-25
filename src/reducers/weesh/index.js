export const weeshReducer = (state, action) => {
    let characterCount
    switch (action.type) {
        case 'ADD_WEESH':
            return {
                ...state,
                ...action.data,
            }
        case 'ADD_CONTENT':
            characterCount = action.data.content.length
            return {
                ...state,
                ...action.data,
                characterCount,
            }
        case 'EMPTY_SUGGESTION_TAGS':
            return {
                ...state,
                suggestionTags: [],
                allowShowSuggestions: false,
            }
        default:
            return state
    }
}
