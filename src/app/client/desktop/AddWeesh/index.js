import React from "react"
import AddWeeshContainer from "./AddWeeshContainer"
import WeeshProvider from "Root/contexts/weesh"

export default props => {
    return (
        <WeeshProvider>
            <AddWeeshContainer {...props} />
        </WeeshProvider>
    )
}
