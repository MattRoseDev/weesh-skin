import React from 'react'
import { snackbarReducer } from 'Root/reducers/snackbar'

export const SnackBarContext = React.createContext()

const initialSnackBar = {
    message: '',
    icon: '',
    background: 'foreground',
    color: 'background',
    visible: false,
}

const SnackBarProvider = props => {
    const [snackbar, dispatch] = React.useReducer(
        snackbarReducer,
        initialSnackBar,
    )

    return (
        <SnackBarContext.Provider value={{ snackbar, dispatch }}>
            {props.children}
        </SnackBarContext.Provider>
    )
}

export default SnackBarProvider
