export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                ...action.data,
            }
        case 'LOGOUT':
            return {
                theme: 'light',
                color: 'blue',
                token: false,
            }
        case 'TOGGLE_THEME':
            let theme = state.theme == 'light' ? 'night' : 'light'
            return {
                ...state,
                theme,
            }
        case 'EDIT_THEME':
            return {
                ...state,
                theme: action.data,
            }
        case 'EDIT_COLOR':
            return {
                ...state,
                color: action.data,
            }
        default:
            return state
    }
}
