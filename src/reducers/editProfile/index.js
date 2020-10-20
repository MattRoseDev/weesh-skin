export const editProfileReducer = (state, action) => {
    switch (action.type) {
        case "EDIT_PROFILE":
            return {
                ...state,
                ...action.data,
            }
        case "ENABLE_DONE_BUTTON":
            return {
                ...state,
                doneButton: true,
            }
        case "DISABLE_DONE_BUTTON":
            return {
                ...state,
                doneButton: false,
            }
        default:
            return state
    }
}
