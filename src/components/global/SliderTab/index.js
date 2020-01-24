import React from 'react'
import styled, { css } from 'styled-components'
import CONSTANTS from 'Root/constants'
import uuid from 'uuid'

const StyledContainer = styled.div`
    background: ${CONSTANTS.themes.light.colors.light};
    border-radius: .85rem;
    width: 75%;
    margin: 0 auto 1rem;
    padding: .25rem;
`

const StyledFrame = styled.ul`
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: .5rem 0;
`

const StyledTab = styled.li`
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: .85rem;
    z-index: 2;
`

const StyledSlider = styled.span`
    position: absolute;
    background: ${CONSTANTS.themes.light.colors.white};
    ${({ tabs }) => tabs && css`
        width: ${Math.round(100 / tabs)}%;
    `};
    transition: all .25s ease;
    left: 0;
    height: 100%;
    z-index: 1;
    border-radius: .75rem;
    ${CONSTANTS.styles.boxShadow.primary.normal};
`

const StyledInput = styled.input`
    display: none;
`

const StyledLabel = styled.label`
    &.active {
        color: ${CONSTANTS.themes.light.colors.black};
        font-weight: bold;
    }
    color: ${CONSTANTS.themes.light.colors.black};
    transition: all .25s ease;

`

export default (props) => {
    const refSlider = React.useRef()
    const [data, setData] = React.useState(props.tabs)
    
    const handleChange = (e) => {
        let newData = data.map((item, key) => {
            if(item.id == e.target.id) {
                refSlider.current.style.left = `${Math.round(key * (100 / props.tabs.length))}%`
                item.value = true
            } else {
                item.value = false
            }
            return item
        })
        setData(newData)
    }

    return <StyledContainer>
        <StyledFrame>
            {data.map(item => <StyledTab key={item.id}>
                <StyledLabel className={item.value && 'active'} htmlFor={item.id}>{item.title}</StyledLabel>
                <StyledInput id={item.id} checked={item.value} onChange={(e) => handleChange(e)} type='checkbox' />
            </StyledTab>)}
            <StyledSlider ref={refSlider} tabs={props.tabs.length} />
        </StyledFrame>
    </StyledContainer> 
}
