import React, { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  left?: string | number;
  top?: string | number;
}

/**
 * Returns centered, relative, & absolute positioned children
 * @param {children, left, top}
 * @returns {ReactNode}
 */
function CenteredAbsolute(
  props: IProps = { children: {}, left: "50%", top: "50%" }
): ReactNode {
  const topValue =
    typeof props.top === "number" ? props.top.toString() : props.top;
  const leftValue =
    typeof props.left === "number" ? props.left.toString() : props.left;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: topValue, left: leftValue }}>
        {props.children}
      </div>
    </div>
  );
}

export default CenteredAbsolute;
