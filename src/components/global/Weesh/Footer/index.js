import React from 'react'
import styled, {css} from 'styled-components'
import IconButton from 'Root/components/global/IconButton'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'
import uuid from 'uuid'
import {Link} from 'react-router-dom'
import useHistory from 'Root/hooks/useHistory'
import {AuthContext} from 'Root/contexts/auth'
import {SnackBarContext} from 'Root/contexts/snackbar'
import {useMutation} from '@apollo/react-hooks'
import api from 'Root/api'

const StyledFooterContainer = styled.div`
    ${C.styles.flex.flexColumn};
`

const StyledFooter = styled.div`
    margin: 0.25rem;
    color: ${({theme}) => theme.colors.dark};
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsStretch};
    ${C.styles.flex.justifyContentBetween};
`

const StyledComments = styled(Link)`
    text-decoration: none;
    color: ${({theme}) => theme.colors.dark};
    padding: 0 1rem 1rem;
    font-size: 0.85rem;
`

const StyledButtonContainer = styled.span`
    padding: 0.5rem 0.5rem;
`

const StyledNumbers = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    color: ${({theme}) => theme.colors.dark};
    margin: 0 0.75rem 0 0;
`

const StyledNumberContainer = styled.span`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    ${({margin}) =>
        margin &&
        css`
            margin: ${margin};
        `};
`

const StyledButtons = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
`

const StyledNumber = styled.span`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    color: ${({theme}) => theme.colors.dark};
    font-size: 0.75rem;
    margin: 0 0 0 0.1rem;
`

export default props => {
    const {auth} = React.useContext(AuthContext)
    const {snackbar, dispatch: snackbarDispatch} = React.useContext(
        SnackBarContext,
    )
    const [isLiked, setIsLiked] = React.useState(props.isLiked)
    const [isBookmarked, setIsBookmarked] = React.useState(props.isBookmarked)
    const history = useHistory()

    const [likeWeesh, likeWeeshResult] = useMutation(api.weeshLikes.like, {
        variables: {
            weeshId: `${props.id}`,
        },
    })
    const [dislikeWeesh, dislikeWeeshResult] = useMutation(
        api.weeshLikes.dislike,
        {
            variables: {
                weeshId: `${props.id}`,
            },
        },
    )

    const [addToBookmark, addToBookmarkResult] = useMutation(
        api.weeshBookmarks.add,
        {
            variables: {
                weeshId: `${props.id}`,
            },
        },
    )
    const [removeFromBookmark, removeFromBookmarkResult] = useMutation(
        api.weeshBookmarks.remove,
        {
            variables: {
                weeshId: `${props.id}`,
            },
        },
    )

    const buttons = [
        {
            icon: 'Bookmark',
            fill: () => (isBookmarked ? 'foreground' : undefined),
            color: () => (isBookmarked ? 'foreground' : 'foreground'),
            handleClick: props => {
                if (!auth.token) {
                    return history.push('/login')
                }
                if (isBookmarked) {
                    removeFromBookmark()
                } else {
                    addToBookmark()
                    snackbarDispatch({
                        type: 'SET_DATA',
                        data: {
                            icon: 'Bookmark',
                            message: 'Added to your Bookmarks.',
                            background: 'foreground',
                            visible: true,
                        },
                    })
                    setTimeout(() => {
                        snackbarDispatch({type: 'HIDE'})
                    }, 2 * 1000)
                }
                setIsBookmarked(isBookmarked ? false : true)
            },
        },
        {
            icon: 'MessageCircle',
            fill: () => undefined,
            color: () => 'foreground',
            handleClick: () => {
                history.push(`/w/${props.link}`)
            },
        },
        {
            icon: 'Heart',
            fill: () => (isLiked ? 'red' : undefined),
            color: () => (isLiked ? 'red' : 'foreground'),
            handleClick: props => {
                if (!auth.token) {
                    return history.push('/login')
                }
                if (isLiked) {
                    dislikeWeesh()
                } else {
                    likeWeesh()
                }
                setIsLiked(isLiked ? false : true)
            },
        },
    ]

    const numbers = [
        {
            number: props.like && props.like.paginate.totalDocs,
            icon: 'Heart',
        },
        {
            number: props.commentsCounter,
            icon: 'MessageCircle',
        },
    ]
    return (
        <StyledFooterContainer>
            <StyledFooter>
                <StyledButtons>
                    {buttons.map(item => (
                        <StyledButtonContainer key={uuid()}>
                            <IconButton
                                icon={item.icon}
                                onClick={() => item.handleClick(props)}
                                fill={item.fill()}
                                color={item.color()}
                                size={24}
                                strokeWidth={1.5}
                            />
                        </StyledButtonContainer>
                    ))}
                </StyledButtons>
                <StyledNumbers>
                    {numbers.map(
                        item =>
                            item.number > 0 && (
                                <StyledNumberContainer
                                    key={uuid()}
                                    margin='0 0 0 .75rem'
                                >
                                    <Icon
                                        icon={item.icon}
                                        size={12}
                                        fill='dark'
                                        color='dark'
                                    />
                                    <StyledNumber>{item.number}</StyledNumber>
                                </StyledNumberContainer>
                            ),
                    )}
                </StyledNumbers>
            </StyledFooter>
            {props.commentsCounter > 0 && (
                <StyledComments to={`/w/${props.link}`}>
                    View all {props.commentsCounter} comments
                </StyledComments>
            )}
        </StyledFooterContainer>
    )
}
