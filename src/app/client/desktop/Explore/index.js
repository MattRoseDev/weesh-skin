import React from "react"
import ExploreContainer from "./ExploreContainer"
import ExploreProvider from "Root/contexts/explore"

export default props => {
    return (
        <ExploreProvider>
            <ExploreContainer {...props} />
        </ExploreProvider>
    )
}
