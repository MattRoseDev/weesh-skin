import React from 'react'
import BookmarkContainer from './BookmarkContainer'
import BookmarkProvider from 'Root/contexts/bookmark'

export default (props) => {
    return <BookmarkProvider>
        <BookmarkContainer {...props}/>
    </BookmarkProvider>
}