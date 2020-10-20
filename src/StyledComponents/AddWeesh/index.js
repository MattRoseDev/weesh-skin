import styled, { css } from "styled-components";
import C from "Root/constants";

const Frame = styled.div`
  ${C.styles.flex.flexColumn};
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.light};
  overflow: hidden;
`;

export default {
  Frame,
};
