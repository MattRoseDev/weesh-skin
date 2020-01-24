import React from 'react'
import Icon from 'Root/components/global/Icon'

export default [
    {
        exact: true,
        title: 'Home',
        path: '/',
        content: <Icon color='black' strokeWidth={1.75} icon='Home' size={26} />,
    },
    {
        title: 'Search',
        path: '/explore',
        content: <Icon color='black' strokeWidth={1.75} icon='Search' size={26} />,
    },
    {
        title: 'Weesh',
        path: '/compose/weesh',
        content: <Icon color='black' strokeWidth={1.75} icon='PlusSquare' size={26} />,
    },
    {
        title: 'Notification',
        path: '/notification',
        content: <Icon color='black' strokeWidth={1.75} icon='AlertCircle' size={26} />,
    },
    {
        title: 'Profile',
        path: '/profile',
        content: <Icon color='black' strokeWidth={1.75} icon='User' size={26} />,
    },
]