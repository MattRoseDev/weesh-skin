import React from 'react'
import GeneralContainer from './GeneralContainer'
import ExploreProvider from 'Root/contexts/explore'

export default props => {
    return (
        <ExploreProvider>
            <GeneralContainer {...props} />
        </ExploreProvider>
    )
}
