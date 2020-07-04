import React from 'react'
import { exploreReducer } from 'Root/reducers/explore'

export const ExploreContext = React.createContext()

const initialExplore = {
    expression: '',
    status: null,
    results: null,
    loading: false,
}

const ExploreProvider = props => {
    const [explore, dispatch] = React.useReducer(exploreReducer, initialExplore)

    return (
        <ExploreContext.Provider value={{ explore, dispatch }}>
            {props.children}
        </ExploreContext.Provider>
    )
}

export default ExploreProvider
