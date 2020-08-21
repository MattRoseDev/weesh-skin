import React from 'react'
import styled, { css } from 'styled-components'
import IconButton from 'Root/components/global/IconButton'
import Link from 'Root/components/global/Link'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'
import uuid from 'uuid'
import useHistory from 'Root/hooks/useHistory'
import { AuthContext } from 'Root/contexts/auth'
import { WeeshPageContext } from 'Root/contexts/weeshPage'
import { SnackBarContext } from 'Root/contexts/snackbar'
import { DrawerDialogContext } from 'Root/contexts/drawerDialog'
import { useMutation } from '@apollo/react-hooks'
import api from 'Root/api'
import ReWeeshButton from 'Root/components/global/Weesh/Footer/ReWeeshButton'

const StyledFooterContainer = styled.div`
    ${C.styles.flex.flexColumn};
    border-bottom: 1px dashed ${({ theme }) => theme.colors.light};
`

const StyledFooter = styled.div`
    margin: 0.25rem;
    color: ${({ theme }) => theme.colors.dark};
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsStretch};
    ${C.styles.flex.justifyContentBetween};
`

const StyledComments = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.dark};
    padding: 0 1rem 1rem;
    font-size: 0.85rem;
`

const StyledButtonContainer = styled.span`
    padding: 0.5rem 0.5rem;
`

const StyledNumbers = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    margin: 0 0.75rem 0 0;
`

const StyledNumberContainer = styled(Link)`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
    ${({ margin }) =>
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
    font-size: 0.75rem;
    margin: 0 0 0 0.1rem;
    color: ${({ theme }) => theme.colors.dark};
`

export default props => {
    const { auth } = React.useContext(AuthContext)
    const { snackbar, dispatch: snackbarDispatch } = React.useContext(
        SnackBarContext,
    )
    const { weeshPage, dispatch: weeshPageDispatch } = React.useContext(
        WeeshPageContext,
    )
    const { drawerDialog, dispatch: drawerDialogDispatch } = React.useContext(
        DrawerDialogContext,
    )
    const [isLiked, setIsLiked] = React.useState(props.isLiked)
    const [isReweeshed, setIsReweeshed] = React.useState(props.isReweeshed)
    const [isBookmarked, setIsBookmarked] = React.useState(props.isBookmarked)
    const [numbers, setNumbers] = React.useState([
        {
            number: props.like && props.like.paginate.totalDocs,
            icon: 'Heart',
            link: `/w/${props.link}/likes`,
        },
        {
            number: props.comment && props.commentsCounter,
            icon: 'MessageCircle',
            link: `/w/${props.link}`,
        },
        {
            number: props.reweesh && props.reweesh.paginate.totalDocs,
            icon: 'Repeat',
            fill: 'none',
            strokeWidth: 3,
            link: `/w/${props.link}`,
        },
    ])

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
                        snackbarDispatch({ type: 'HIDE' })
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
                weeshPage.textarea.current._reactInternalFiber.child.stateNode.focus()
            },
        },
        {
            icon: 'Repeat',
            fill: () => undefined,
            color: () => {
                return isReweeshed ? 'blue' : 'foreground'
            },
            size: 22,
            strokeWidth: isReweeshed ? 3 : 1.6,
            handleClick: () => {
                if (!auth.token) {
                    return history.push('/login')
                }
                drawerDialogDispatch({
                    type: 'SHOW',
                })
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
                    setNumbers(prevState => [
                        {
                            ...prevState[0],
                            number: prevState[0].number - 1,
                        },
                        prevState[1],
                    ])
                } else {
                    likeWeesh()
                    setNumbers(prevState => [
                        {
                            ...prevState[0],
                            number: prevState[0].number + 1,
                        },
                        prevState[1],
                    ])
                }
                setIsLiked(isLiked ? false : true)
            },
        },
    ]

    if (props.status < 3) {
        buttons.splice(2, 1)
    }

    return (
        <StyledFooterContainer>
            <ReWeeshButton {...props} setIsReweeshed={setIsReweeshed} />
            <StyledFooter>
                <StyledButtons>
                    {buttons.map(item => (
                        <StyledButtonContainer key={uuid()}>
                            <IconButton
                                icon={item.icon}
                                onClick={() => item.handleClick(props)}
                                fill={item.fill()}
                                color={item.color()}
                                size={item.size || 24}
                                strokeWidth={item.strokeWidth || 1.5}
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
                                    to={item.link}>
                                    <Icon
                                        icon={item.icon}
                                        size={item.size || 12}
                                        fill={item.fill || 'dark'}
                                        strokeWidth={item.strokeWidth || 2}
                                        color='dark'
                                    />
                                    <StyledNumber>{item.number}</StyledNumber>
                                </StyledNumberContainer>
                            ),
                    )}
                </StyledNumbers>
            </StyledFooter>
        </StyledFooterContainer>
    )
}
