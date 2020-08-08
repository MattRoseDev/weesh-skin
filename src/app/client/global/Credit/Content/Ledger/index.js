import React from 'react'
import styled from 'styled-components'
import C from 'Root/constants'
import Ledger from './Ledger'
import StyledComponents, { Components } from 'Root/StyledComponents'

const StyledContainer = styled.div`
    ${C.styles.flex.flexColumn};
    ${C.styles.flex.alignItemsCenter};
    width: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.light};
`

export default () => {
    const ledgers = []
    for (let i = 0; i < 20; i++) {
        ledgers.push({
            username: 'Weesh',
            value: Math.floor(Math.random() * 10) - 4,
        })
    }
    return (
        <StyledContainer>
            {ledgers && ledgers.map(ledger => <Ledger {...ledger} />)}

            {!ledgers && (
                <StyledComponents.Title padding='2rem 0' color='gray'>
                    {C.txts.en.credit.noTransactionsFound}
                </StyledComponents.Title>
            )}
        </StyledContainer>
    )
}
