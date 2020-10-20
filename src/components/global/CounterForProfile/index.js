import React from "react";
import styled, { css } from "styled-components";
import C from "Root/constants";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: unset;
  text-decoration: none;
`;

const StyledCountItem = styled.div`
  ${C.styles.flex.flexRow};
  ${C.styles.flex.alignItemsCenter};
  color: unset;
  text-decoration: none;
  margin: 0 0.5rem 0 0;
`;

const StyledContainer = styled.div`
  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `};
  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};
`;

const StyledNumber = styled.span`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: bolder;
`;

const StyledHoverTitle = styled.span`
  ${C.styles.flex.inlineFlexRow};
  ${C.styles.flex.alignItemsCenter};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.9rem;
  margin: 0 0 0 0.25rem;
  :hover {
    text-decoration: underline;
  }
`;

const StyledTitle = styled.span`
  ${C.styles.flex.inlineFlexRow};
  ${C.styles.flex.alignItemsCenter};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.9rem;
  margin: 0 0 0 0.25rem;
`;

export default props => {
  return (
    <StyledContainer
      margin={props.margin || undefined}
      width={props.width || undefined}>
      {props.to ? (
        <StyledLink to={props.to}>
          <StyledCountItem>
            {props.number != null && (
              <StyledNumber>{props.number}</StyledNumber>
            )}
            <StyledHoverTitle>{props.title}</StyledHoverTitle>
          </StyledCountItem>
        </StyledLink>
      ) : (
        <StyledCountItem>
          {props.number != null && <StyledNumber>{props.number}</StyledNumber>}
          <StyledTitle>{props.title}</StyledTitle>
        </StyledCountItem>
      )}
    </StyledContainer>
  );
};
