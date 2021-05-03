import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { CSSProperties } from "react";
import { PageAnimations } from "../../types/interfaces";

interface Props {
  pageAnimations: PageAnimations
  pageStyle: CSSProperties
  children: ReactNode
}

export default function PageTransition(props: Props) {
  return (
    <motion.div
      style={props.pageStyle}
      initial="initial"
      animate="in"
      exit="out"
      variants={props.pageAnimations.variants}
      transition={props.pageAnimations.transition}
    >
      {props.children}
    </motion.div>
  );
}
