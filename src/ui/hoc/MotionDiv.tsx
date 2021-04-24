import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { PageAnimations } from "../../types/interfaces";

interface Props {
  pageAnimations: PageAnimations;
  children: ReactNode;
}

export default function MotionDiv(props: Props) {
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={props.pageAnimations.variants}
      transition={props.pageAnimations.transition}
    >
      {props.children}
    </motion.div>
  );
}
