export const notificationsReducer = (state, action) => {
    let store
    switch(action.type) {
        case 'PUSH_NOTIFICATION': 
            store = {}
            action.data.forEach(item => {
                store[`${item.id}`] = item
            })
            return {
                ...state,
                store
            }
        case 'UNSHIFT_NOTIFICATION': 
            store = {
                [action.data.id]: action.data,
                ...state.store
            }
            return {
                ...state,
                isEmpty: false,
                store
            }
        case 'READ_ALL': 
            store = {}
            Object.values(state.store).forEach(item => {
                store[`${item.id}`] = {
                    ...item,
                    read: true
                }
            })
            return {
                ...state,
                store
            }
        case 'EMPTY':
            return {
                ...state,
                store: {},
                isEmpty: true
            }
        default:
            return state
    }
}