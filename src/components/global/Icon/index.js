import React from 'react'
import * as Feather from 'react-feather'
import C from 'Root/constants'
import { AuthContext } from 'Root/contexts/auth'

export default props => {
    const { auth, dispatch } = React.useContext(AuthContext)
    const Icon = Feather[props.icon || 'User']

    return (
        <Icon
            {...props}
            size={props.size || 20}
            color={
                C.themes[auth.theme || 'light'].colors[props.color || 'dark']
            }
            fill={C.themes[auth.theme || 'light'].colors[props.fill] || 'none'}
        />
    )
}
