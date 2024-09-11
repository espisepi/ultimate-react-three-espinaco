import styled from "styled-components";
import { BREAKPOINTS } from "../../../../../../config/breakpoints";

export const Button = styled.button`
  /* Quitar estilos por defecto */
  all: unset;

  pointer-events: all;
  cursor: pointer;
  flex-shrink: 1;

  align-self: center;

  margin: 1rem;
  padding: 1rem;

  opacity: 0.9;

  width: 5rem;
  height: 5rem;

  background-size: 4rem;
  background-repeat: no-repeat;
  background-position: center;

  transition: all 1s;

  svg {
    fill: #833ab4;
  }

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);

    svg {
      fill: #b74cff;
    }
  }

  &:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    svg {
      fill: #491e65;
    }
  }

  @media (max-width: ${BREAKPOINTS.MD}) {
    width: 3rem;
    height: 3rem;
  }
`;
