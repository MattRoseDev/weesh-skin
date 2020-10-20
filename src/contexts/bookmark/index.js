import React from "react"
import { bookmarkReducer } from "Root/reducers/bookmark"

export const BookmarkContext = React.createContext()

const initialBookmark = null

const BookmarkProvider = props => {
    const [bookmark, dispatch] = React.useReducer(
        bookmarkReducer,
        initialBookmark,
    )

    return (
        <BookmarkContext.Provider value={{ bookmark, dispatch }}>
            {props.children}
        </BookmarkContext.Provider>
    )
}

export default BookmarkProvider
