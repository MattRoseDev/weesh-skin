export const alertReducer = (state, action) => {
    switch(action.type) {
        case 'SET_DATA': 
            return {
                ...state,
                ...action.data
            }
        case 'SHOW': 
            return {
                ...state,
                visible: true
            }
        case 'HIDE': 
            return {
                ...state,
                visible: false
            }
        default:
            return state
    }
}