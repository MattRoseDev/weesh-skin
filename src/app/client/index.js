import React from 'react'
import Mobile from './mobile'
import Desktop from './desktop'

const Client = () => {
    return window.innerWidth > 768 ? <Desktop /> : <Mobile/>
}

export default Client