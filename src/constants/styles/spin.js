import { css } from "styled-components";
import themes from "Root/constants/themes";

export default css`
  @keyframes spin {
    0% {
      transform: rotateZ(0);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  animation: spin 1s ease infinite;
`;
