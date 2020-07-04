import React from 'react'
import styled, {css} from 'styled-components'
import Icon from 'Root/components/global/Icon'
import C from 'Root/constants'
import uuid from 'uuid'

const StyledContainer = styled.div`
    border-radius: 5rem;
    width: 100%;
    /* margin: 0 auto 1rem; */
`

const StyledFrame = styled.ul`
    position: relative;
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentAround};
    ${C.styles.flex.alignItemsCenter};
    padding: 0.3rem 0;
`

const StyledTab = styled.li`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.justifyContentCenter};
    width: 100%;
    font-size: 0.85rem;
    z-index: 2;
`

const StyledSlider = styled.span`
    position: absolute;
    background: ${({theme}) => theme.colors.primary};
    ${({tabs}) =>
        tabs &&
        css`
            width: ${Math.round(100 / tabs)}%;
        `};
    transition: all 0.25s ease;
    left: 0;
    height: 100%;
    z-index: 1;
    border-radius: 5rem;
    color: inherit;
    ${C.styles.boxShadow.primary.normal};
`

const StyledInput = styled.input`
    display: none;
`

const StyledLabel = styled.label`
    ${C.styles.flex.flexRow};
    ${C.styles.flex.center};
    width: 100%;
    &.active {
        color: ${({theme}) => theme.colors.background};
        font-weight: bold;
    }
    color: ${({theme}) => theme.colors.foreground};
    transition: all 0.25s ease;
    cursor: pointer;
`

const StyledTitle = styled.span`
    padding: 0 0 0 0.1rem;
    color: inherit;
`

export default props => {
    const refSlider = React.useRef()
    const [state, setState] = React.useState(props.tabs)

    const handleChange = e => {
        let newState = state.map((item, key) => {
            if (item.id == e.target.id) {
                refSlider.current.style.left = `${Math.round(
                    key * (100 / props.tabs.length),
                )}%`
                props.setStatus({status: item.status})
                item.value = true
            } else {
                item.value = false
            }
            return item
        })
        setState(newState)
    }

    return (
        <StyledContainer>
            <StyledFrame>
                {state.map(item => (
                    <StyledTab key={item.id}>
                        <StyledLabel
                            className={item.value && 'active'}
                            htmlFor={item.id}
                        >
                            <Icon
                                icon={item.icon}
                                size='14'
                                color={item.value ? 'background' : 'foreground'}
                            />
                            <StyledTitle className={item.value && 'active'}>
                                {item.title}
                            </StyledTitle>
                        </StyledLabel>
                        <StyledInput
                            id={item.id}
                            checked={item.value}
                            onChange={e => handleChange(e)}
                            type='checkbox'
                        />
                    </StyledTab>
                ))}
                <StyledSlider ref={refSlider} tabs={props.tabs.length} />
            </StyledFrame>
        </StyledContainer>
    )
}
