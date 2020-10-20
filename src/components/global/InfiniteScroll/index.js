import React from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import styled, { css } from "styled-components"
import Loader from "Root/components/global/Loader"
import C from "Root/constants"

const StyledContainer = styled(InfiniteScroll)`
    ${C.styles.flex.flexColumn};
    ${({ padding }) =>
        padding &&
        css`
            padding: ${padding};
        `};
    ${({ alignItems }) => {
        switch (alignItems) {
            case "center":
                return css`
                    ${C.styles.flex.alignItemsCenter};
                `
            case "stretch":
                return css`
                    ${C.styles.flex.alignItemsStretch};
                `
            default:
                return css`
                    ${C.styles.flex.alignItemsCenter};
                `
        }
    }};
`

const StyledLoader = styled.div`
    ${C.styles.flex.flexRowCenter};
    background: transparent;
    padding: 2rem 0;
`

export default props => {
    return (
        <StyledContainer
            padding={props.padding || undefined}
            alignItems={props.alignItems || undefined}
            dataLength={props.children.length}
            next={props.onLoadMore}
            hasMore={props.hasNextPage}
            loader={
                <StyledLoader>
                    <Loader size={20} strokeWidth={1.25} color="gray" />
                </StyledLoader>
            }>
            {props.children}
        </StyledContainer>
    )
}
