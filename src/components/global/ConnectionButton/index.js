import React from 'react'
import ConnectionButton from './ConnectionButton'

export default props => {
    const handleStatus = () => {
        if (props.connection) {
            const { status } = props.connection
            const { user } = props

            switch (status) {
                case 0:
                    return <ConnectionButton user={user} type='FOLLOW' />
                case 1:
                    return <ConnectionButton user={user} type='REQUEST' />
                case 2:
                    return <ConnectionButton user={user} type='FOLLOWING' />
            }
        }
    }
    return handleStatus()
}
