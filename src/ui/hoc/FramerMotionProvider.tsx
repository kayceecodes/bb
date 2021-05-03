import { FunctionComponent } from 'react'
import { Motions } from '../../types/interfaces';

interface Props {
    children: FunctionComponent<any>
}

const FramerMotionProvider = ({ children }: Props) => {
    const styleProps:any | Motions = {
        pageStyle: {
            position: "absolute",
            width: "100%",
            textAlign: "center",
            overflow: "hidden",
          },
          motions: {
            initial: "initial",
            animate: "in",
            exit: "out",
          },
          pageAnimations: {
            variants: {
              initial: {
                opacity: 0,
                x: "0vw",
                // scale: 0.95,
              },
              in: {
                opacity: 1,
                x: 0,
                scale: 1,
              },
              out: {
                opacity: 0,
                x: "0px",
                // scale: 1.3,
              },
            },
            transition: {
              type: "tween", // Tween: animation that looks like it's evolving/transforming into something else
              ease: "linear",
              duration: 0.35,
            },
          }
      // any other props here...
    }
    return children(styleProps)
}

export default FramerMotionProvider