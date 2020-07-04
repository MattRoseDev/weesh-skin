import React from 'react'
import styled, {css} from 'styled-components'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'
import Link from 'Root/components/global/Link'
import uuid from 'uuid'
import {AuthContext} from 'Root/contexts/auth'
import {EditProfileContext} from 'Root/contexts/editProfile'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.boxShadow.primary.normal};
    border-radius: 0.75rem;
    margin: 0.5rem 0 0;
`

const StyledColorContainer = styled.div`
    ${() => {
        return window.innerWidth < 786
            ? css`
                  ${C.styles.flex.flexColumn};
              `
            : css`
                  ${C.styles.flex.flexRow};
                  ${C.styles.flex.alignItemsCenter};
                  ${C.styles.flex.justifyContentBetween};
              `
    }};

    padding: 1rem;
    border-bottom: 1px dashed ${({theme}) => theme.colors.light};
`

const StyledColorTitle = styled.div`
    font-weight: bold;
    ${() => {
        return window.innerWidth < 786
            ? css`
                  padding: 0 0 0.75rem 0.25rem;
              `
            : css`
                  padding: 0 0 0 0.25rem;
              `
    }};
    font-size: 0.85rem;
    color: ${({theme}) => theme.colors.foreground};
`

const StyledColors = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
`

const StyledColor = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    width: 2.5rem;
    height: 2.5rem;
    background: ${({theme, color}) => color};
    border-radius: 0.5rem;
    &:not(:first-child) {
        margin: 0 0 0 2rem;
    }
    cursor: pointer;
`

const StyledBackgroundContainer = styled.div`
    ${() => {
        return window.innerWidth < 786
            ? css`
                  ${C.styles.flex.flexColumn};
              `
            : css`
                  ${C.styles.flex.flexRow};
                  ${C.styles.flex.alignItemsCenter};
                  ${C.styles.flex.justifyContentBetween};
              `
    }};

    flex-wrap: wrap;
    padding: 1rem;
`

const StyledBackgrounds = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.alignItemsCenter};
`

const StyledBackgroundTitle = styled.div`
    font-weight: bold;
    padding: 0 0 0.75rem 0.25rem;
    font-size: 0.85rem;
    color: ${({theme}) => theme.colors.foreground};
`

const StyledBackground = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    width: 5rem;
    height: 2.5rem;
    font-weight: bold;
    font-size: 0.75rem;
    background: ${({theme, color}) => color};
    color: ${({theme, titleColor}) => titleColor};
    border-radius: 0.5rem;
    ${({active, theme}) =>
        active
            ? css`
                  border: 2px solid ${({theme}) => theme.colors.primary};
              `
            : css`
                  border: 1px solid ${({theme}) => theme.colors.lightGray};
              `};
    &:not(:first-child) {
        margin: 0 0 0 1rem;
    }
    cursor: pointer;
`

const StyledIcon = styled.div`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    padding: 0 0.25rem 0 0;
`

export default () => {
    const {auth, dispatch: authDispatch} = React.useContext(AuthContext)
    const {editProfile, dispatch: editProfileDispatch} = React.useContext(
        EditProfileContext,
    )

    const colors = [
        {
            title: 'blue',
            color: C.themes[auth.theme || 'light'].colors.bluePack.primary,
        },
        {
            title: 'red',
            color: C.themes[auth.theme || 'light'].colors.redPack.primary,
        },
        {
            title: 'purple',
            color: C.themes[auth.theme || 'light'].colors.purplePack.primary,
        },
        {
            title: 'green',
            color: C.themes[auth.theme || 'light'].colors.greenPack.primary,
        },
    ]

    const backgrounds = [
        {
            title: 'Light',
            color: C.themes.light.colors.background,
            titleColor: '#262626',
        },
        {
            title: 'Night',
            color: C.themes.night.colors.background,
            titleColor: '#fff',
        },
        {
            title: 'Dark',
            color: C.themes.dark.colors.background,
            titleColor: '#fff',
        },
    ]

    const handleEditColor = color => {
        authDispatch({type: 'EDIT_COLOR', data: color})
        editProfileDispatch({type: 'ENABLE_DONE_BUTTON'})
    }

    const handleEditBackground = color => {
        authDispatch({type: 'EDIT_THEME', data: color})
        editProfileDispatch({type: 'ENABLE_DONE_BUTTON'})
    }

    return (
        <StyledContainer>
            <StyledColorContainer>
                <StyledColorTitle>
                    {C.txts.en.editProfile.theme.color}
                </StyledColorTitle>
                <StyledColors>
                    {colors.map(item => (
                        <StyledColor
                            {...item}
                            onClick={() => handleEditColor(item.title)}
                            key={uuid()}
                        >
                            {auth.color == item.title && (
                                <Icon
                                    icon="Check"
                                    strokeWidth={3}
                                    color="white"
                                />
                            )}
                        </StyledColor>
                    ))}
                </StyledColors>
            </StyledColorContainer>
            <StyledBackgroundContainer>
                <StyledColorTitle>
                    {C.txts.en.editProfile.theme.background}
                </StyledColorTitle>
                <StyledBackgrounds>
                    {backgrounds.map(item => (
                        <StyledBackground
                            {...item}
                            active={
                                auth.theme == item.title.toLocaleLowerCase()
                                    ? true
                                    : undefined
                            }
                            onClick={() =>
                                handleEditBackground(
                                    item.title.toLocaleLowerCase(),
                                )
                            }
                            key={uuid()}
                        >
                            <StyledIcon>
                                <Icon
                                    icon="Circle"
                                    size="15"
                                    fill={
                                        auth.theme ==
                                        item.title.toLocaleLowerCase()
                                            ? auth.color
                                            : undefined
                                    }
                                    color={
                                        auth.theme ==
                                        item.title.toLocaleLowerCase()
                                            ? auth.color
                                            : 'gray'
                                    }
                                />
                            </StyledIcon>{' '}
                            {item.title}
                        </StyledBackground>
                    ))}
                </StyledBackgrounds>
            </StyledBackgroundContainer>
        </StyledContainer>
    )
}
