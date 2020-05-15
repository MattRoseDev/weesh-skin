export const userReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_USER_DATA': 
            return {
                ...state,
                ...action.data
            }
        case 'REMOVE_WEESH': 
            let weeshes = state.weesh.weeshes.filter(item => {
                if(item.id != action.id) return item
            })
            return {
                ...state,
                weesh: {
                    ...state.weesh,
                    weeshes
                }
            }
        default:
            return state
    }
}