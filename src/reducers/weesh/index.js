export const weeshReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_WEESH':
            return {
                ...state,
                ...action.data,
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
