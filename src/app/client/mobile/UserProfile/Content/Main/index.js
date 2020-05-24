import React from 'react'
import uuid from 'uuid'
import Weesh from 'Root/components/global/Weesh'
import InfiniteScroll from 'Root/components/global/InfiniteScroll'
import { UserContext } from 'Root/contexts/user'

export default (props) => {
    const { user } = React.useContext(UserContext)
    return <InfiniteScroll onLoadMore={props.handlePaginate} hasNextPage={props.nextPage} padding='.5rem .5rem 3.125rem'>
        {user.weesh && user.weesh.weeshes.map(weesh => <Weesh {...weesh} key={uuid()} />)}
    </InfiniteScroll>
}