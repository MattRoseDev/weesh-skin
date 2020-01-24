import React from 'react'
import * as Feather from 'react-feather'
import CONSTANTS from 'Root/constants'

const Element = (props) => {
    const Icon = Feather[props.icon]
    return <Icon size={20} color={CONSTANTS.themes.light.colors.white} />
}

export default Element