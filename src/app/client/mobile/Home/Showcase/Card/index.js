import React from "react";
import styled, { css } from "styled-components";
import { ReactSVG } from "react-svg";
import C from "Root/constants";

const StyledCard = styled.div`
  ${({ flexDirection }) => {
    if (flexDirection && flexDirection == "column") {
      return css`
        ${C.styles.flex.flexColumn};
      `;
    } else {
      return css`
        ${C.styles.flex.flexRow};
      `;
    }
  }};
  ${C.styles.flex.alignItemsCenter};
  margin: 2rem 0.25rem;
`;
const StyledContent = styled.div`
  margin: 0;
`;
const StyledTitle = styled.h3`
  text-align: center;
  color: ${({ theme }) => theme.colors.foreground};
  text-transform: uppercase;
  font-size: 1.5rem;

  ${({ flexDirection }) => {
    if (flexDirection && flexDirection == "column") {
      return css`
        margin: 1.5rem 0 0.5rem;
      `;
    } else {
      return css`
        margin: 0.5rem 0;
      `;
    }
  }};
`;
const StyledDescription = styled.p`
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1.25rem;
  line-height: 2rem;
  text-align: center;
`;

export default props => {
  return (
    <StyledCard flexDirection={props.flexDirection || undefined}>
      <ReactSVG
        src={props.icon}
        beforeInjection={svg => {
          svg.setAttribute(
            "style",
            `width: ${props.width}px;height: ${props.width}px;fill:${props.color}`,
          );
        }}
      />
      <StyledContent>
        <StyledTitle flexDirection={props.flexDirection || undefined}>
          {props.title}
        </StyledTitle>
        <StyledDescription>{props.description}</StyledDescription>
      </StyledContent>
    </StyledCard>
  );
};
