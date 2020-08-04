import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import Ledger from './Ledger'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    width: 100%;
    margin: 1rem 0;
`

export default () => {
    const ledgers = []
    for (let i = 0; i < 20; i++) {
        ledgers.push({
            username: 'Weesh',
            price: Math.floor(Math.random() * 5),
        })
    }
    return (
        <StyledContainer>
            {ledgers.map(ledger => (
                <Ledger {...ledger} />
            ))}
        </StyledContainer>
    )
}
