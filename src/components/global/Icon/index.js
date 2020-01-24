import React from 'react'
import * as Feather from 'react-feather'
import CONSTANTS from 'Root/constants'

const Icon = (props) => {
    const Icon = Feather[props.icon || 'User']
    return <Icon 
        {...props}
        size={props.size || 20} 
        color={CONSTANTS.themes.light.colors[props.color || 'dark']} 
    />
}

export default Icon