import React from "react";
import styled from "styled-components";

export interface IDividerProps {
  width?: string;
  height?: string;
  bg?: string;
}

const DividerComponent = styled.span<IDividerProps>`
  display: block;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "1px"};
  background-color: ${({ bg }) => bg || "#ccc"};
  margin: 8px 0;
`;

function Divider(props: IDividerProps) {
  return <DividerComponent {...props} />;
}

export default Divider;
