import React, { ReactElement } from "react";

/**
 * Styles commponent to have position absolute and top left to 50
 * @param children 
 */
function PositionAbsolute(children: ReactElement) {
  var inputReactObject = React.Children.only(children);
  var clonedChild = React.cloneElement(inputReactObject, {
    style: {positon: 'absolute', top: '50%', left: '50%'},
  });

  return <>
  {clonedChild}
  </>;
}

export default PositionAbsolute;
