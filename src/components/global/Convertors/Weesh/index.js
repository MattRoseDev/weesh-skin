import React from 'react'
import C from 'Root/constants'
import uuid from 'uuid'
import Tag from 'Root/components/global/Tag'

export default ({content}) => {
    let template = content.split(C.regexes.weesh)

    template = template.map(item => {
        if (item[0] == '#' && item.length > 1) {
            item = <Tag to={`/t/${item.substr(1)}`} key={uuid()}>{item}</Tag>
        }
        return item
    })

    return template
}