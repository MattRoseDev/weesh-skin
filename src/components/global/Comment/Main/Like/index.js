import React from 'react'
import styled, { css } from 'styled-components'
import C from 'Root/constants'
import Avatar from 'Root/components/global/Avatar'
import Link from 'Root/components/global/Link'
import IconButton from 'Root/components/global/IconButton'
import { WeeshPageContext } from 'Root/contexts/weeshPage'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'

const StyledContainer = styled.div`
    padding: 0.5rem 1rem 0 0.5rem;
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsStart};
`

export default props => {
    const [isLiked, setIsLiked] = React.useState(props.isLiked)
    const { weeshPage, dispatch: weeshPageDispatch } = React.useContext(
        WeeshPageContext,
    )
    const [likeWeeshComment, likeWeeshCommentResult] = useMutation(
        api.weeshCommentsLikes.like,
        {
            variables: {
                commentId: `${props.id}`,
            },
        },
    )
    const [dislikeWeeshComment, dislikeWeeshCommentResult] = useMutation(
        api.weeshCommentsLikes.dislike,
        {
            variables: {
                commentId: `${props.id}`,
            },
        },
    )

    React.useEffect(() => {
        if (likeWeeshCommentResult.data) {
            weeshPageDispatch({
                type: 'LIKE_COMMENT',
                data: {
                    commentId: props.id,
                },
            })
        }
    }, [likeWeeshCommentResult.data])

    React.useEffect(() => {
        if (dislikeWeeshCommentResult.data) {
            weeshPageDispatch({
                type: 'DISLIKE_COMMENT',
                data: {
                    commentId: props.id,
                },
            })
        }
    }, [dislikeWeeshCommentResult.data])

    const handleClick = () => {
        if (isLiked) {
            dislikeWeeshComment()
        } else {
            likeWeeshComment()
        }
    }

    return (
        <StyledContainer>
            <IconButton
                icon='Heart'
                onClick={handleClick}
                fill={isLiked ? 'red' : undefined}
                color={isLiked ? 'red' : 'foreground'}
                size={14}
            />
        </StyledContainer>
    )
}
