export const drawerDialogReducer = (state, action) => {
    switch (action.type) {
        case "ADD_USER_DATA":
            return {
                ...state,
                ...action.data,
            }
        case "SHOW":
            return {
                ...state,
                visible: true,
            }
        case "HIDE":
            return {
                ...state,
                visible: false,
            }
        default:
            return state
    }
}
