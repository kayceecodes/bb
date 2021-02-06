import React, { ReactChildren, ReactElement } from "react";
import PositionAbsolute from "./PositionAbsolute";

interface IProps {
  trueComponent: ReactElement;
  falseComponent: ReactElement;
  booleanValue: boolean;
  children: ReactChildren
}
/**
 * Returns component based on passed conditions,
 * easier for testing components true conditional statements
 * @param {trueComponent, falseComponent, booleanValue}
 */
function ConditionalReturn(props: IProps) {
  return props.booleanValue !== true ? (
    <div style={{ position: "relative" }}>
      {PositionAbsolute(props.trueComponent)}
    </div>
  ) : (
    <div style={{ position: "relative" }}>
      {PositionAbsolute(props.falseComponent)}
    </div>
  );
}

export default ConditionalReturn;
