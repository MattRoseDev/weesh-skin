import React from "react"
import C from "Root/constants"
import uuid from "uuid"
import StyledComponents from "Root/StyledComponents"
import anchorme from "anchorme"

export default ({ content, tag }) => {
    let store = {}
    let result = anchorme({
        input: content,
        extensions: [
            // an extension for hashtag search
            {
                test: C.regexes.weesh.url,
                transform: value => {
                    let protocol =
                        (anchorme.list(value).length &&
                            anchorme.list(value)[0].protocol) ||
                        null
                    let key = uuid()
                    store[`${key}`] = {
                        key,
                        component: anchorme.list(value).length ? (
                            <StyledComponents.Link.Anchor
                                target="_blank"
                                href={`${protocol ? "" : "http://"}${value}`}>
                                {value}
                            </StyledComponents.Link.Anchor>
                        ) : (
                            value
                        ),
                    }
                    return `$$$___${key}___$$$`
                },
            },
            // an extension for hashtag search
            {
                test: C.regexes.weesh.hashtag,
                transform: value => {
                    let key = uuid()
                    store[`${key}`] = {
                        key,
                        component: (
                            <StyledComponents.Link.Item
                                to={`/t/${value.slice(1)}`}
                                fontWeight={
                                    tag == value.substr(1) ? "bold" : undefined
                                }>
                                {value}
                            </StyledComponents.Link.Item>
                        ),
                    }
                    return `$$$___${key}___$$$`
                },
            },
            // an extension for mentions
            {
                test: C.regexes.weesh.mention,
                transform: value => {
                    let key = uuid()
                    store[`${key}`] = {
                        key,
                        component: (
                            <StyledComponents.Link.Item
                                to={`/${value.slice(1)}`}>
                                {value}
                            </StyledComponents.Link.Item>
                        ),
                    }
                    return `$$$___${key}___$$$`
                },
            },
        ],
    })
    result = result.split(C.regexes.weesh.key)

    result = result.map(item => {
        if (item.match(C.regexes.weesh.key)) {
            let key = item.replace(C.regexes.weesh.leftTrimKey, "")
            key = key.replace(C.regexes.weesh.rightTrimKey, "")
            return store[`${key}`].component
        } else {
            return item
        }
    })

    return result
}
