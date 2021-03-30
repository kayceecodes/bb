import React, { useState } from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../src/ui/Theme";
import FramerMotionProvider from "../src/ui/hoc/FramerMotionProvider";
// Inserted Below
import { useRouter } from 'next/router'
import Header from "../src/ui/header/Header";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
// import store from "../src/store/store";
import ScrollToTop from "../src/ui/scrolltotop/ScrollToTop";
// import { bracelets } from "../src/data/data";
import { easeInOutCubic } from "../src/utils/Easing";
import jump from "jump.js";
import ShopContext from '../src/components/context/ShopContext'

import { wrapper } from '../src/store/store'

export const parsePrice = (price: number) => {
  return parseFloat(price.toFixed(2));
};

// Inserted Above
 function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  //Inserted Below
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const router = useRouter()

  const setJump = (
    jumpingTarget: string | number | Element // Jump based on where the jump() is called from
  ) =>
    jump(jumpingTarget, {
      duration: 800,
      offset: -55,
      easing: easeInOutCubic,
    });
  // Inserted Above
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      {/* <Provider store={store}> */}
        <ScrollToTop />
        <ThemeProvider theme={Theme}>
        <ShopContext>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
          <FramerMotionProvider>
            {(props) => (
              <AnimatePresence exitBeforeEnter>
                <Component
                key={router.pathname}
                value={value}
                setValue={setValue} 
                {...pageProps} 
                {...props} jumpTo={setJump} />
              </AnimatePresence>
            )}
          </FramerMotionProvider>
          </ShopContext>
        </ThemeProvider>
      {/* </Provider> */}
    </React.Fragment>
  );
}

export default wrapper.withRedux(MyApp)