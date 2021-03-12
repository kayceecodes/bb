import React, { useEffect } from "react"
import Link from "../../Link"
import { useRouter } from 'next/router'
import { connect } from "react-redux"

import Button from "@material-ui/core/Button/Button"
import Grid from "@material-ui/core/Grid/Grid"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Typography from "@material-ui/core/Typography/Typography"
import Popover from "@material-ui/core/Popover/Popover"
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery"
import theme from "../Theme"

import { ICartItems } from "../../types/interfaces"

import Aos from "aos"
import "aos/dist/aos.css"
import Backdrop from "@material-ui/core/Backdrop/Backdrop"

interface IProps {
  setValue: React.Dispatch<React.SetStateAction<number>>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
  item: ICartItems
  cartTotal: number
  clearValues(): void
  anchorEl: HTMLElement | undefined
}

const useStyles = makeStyles((theme) => ({
  sectionMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "0px",
    },
    [theme.breakpoints.down(600)]: {
      margin: "15px",
    },
  },
  popoverPosition: {
    top: '115px'
  },
  arrow: {
    fontSize: "1.6rem",
  },
  boxShadows: {
    boxShadow: "0px 0px 8px 10px #efefef50",
  },
  itemImg: {
    width: "100px",
    [theme.breakpoints.up("sm")]: {
      // width: "120px",
    },
  },
  summaryContainer: {
    width: "340px",
    height: "340px",
    [theme.breakpoints.up("sm")]: {
      width: "600px",
    },
  },
  summaryDetails: {
    padding: "30px 0px 0px 0px",
    margin: "0 auto",
    width: "100%",
    borderBottom: "1px solid lightGray",
    // backgroundColor: "#aaa",
  },
  summaryBtn: {
    width: "97%",
    margin: "0px 5px 5px",
    textTransform: "none",
    letterSpacing: "1px",
    fontSize: "0.8rem",
    fontFamily: "Raleway",
    border: `0.5px solid ${theme.palette.common.dimegray}`,
    color: theme.palette.common.dimGray,
    transition: "transform 0.9s, color 0.3s !important",
    "&:hover": {
      color: theme.palette.common.orange,
    },
  },
}))

const CartSummaryModal = (props: IProps) => {
  const classes = useStyles()
  const router = useRouter()
  const matches = {
    sm: useMediaQuery(theme.breakpoints.up("sm")),
    md: useMediaQuery(theme.breakpoints.up("md")),
    lg: useMediaQuery(theme.breakpoints.up("lg")),
    xl: useMediaQuery(theme.breakpoints.up("xl")),
  } // If query matches sm,md,lg or xl then we'll use the 'matches' object to change styles based on width of the window

  /*Close Modal backdrop*/
  const closeModal = () => {
    props.setOpen(false)
  }

  /** 1 Close modal,
   *  2 clear values in the form->DisplayItem,
   *  3 then route to checkout */
  const handleRouteToCheckout = () => {
    // closeModal()
    props.clearValues()
    props.setValue(3)
    router.push('/shoppingcart')
  }

  useEffect(() => {
    Aos.init({ duration: 900 })
  }, [])

  return (
    <Backdrop
      style={{ zIndex: 1, backgroundColor: '#ffffff80'}}
      onClick={() => {
        closeModal()
        router.push('/collections/')
        props.clearValues()
      }}
      open={props.open}
    >
      <Popover
        open={props.open}
        anchorEl={props.anchorEl}
        anchorOrigin={{
          vertical: matches.sm ? 20 : 100,
          horizontal: matches.sm ? -150 : -100,
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Grid
          container
          className={classes.summaryContainer}
          direction="column"
          justify="space-around"
          alignContent="center"
          style={{ overflow: "hidden" }}
        >
          <Grid item xs={8} className={classes.summaryDetails}>
            <Grid container justify="flex-start" alignItems="flex-end">
              {/* Container Name Price Size & Total*/}
              <Grid item xs={6} sm={4}>
                <img
                  src={props.item.src}
                  className={classes.itemImg}
                  data-aos="fade-right"
                  alt={props.item.name}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Grid
                  container
                  direction="column"
                  alignItems={matches.sm ? "flex-start" : "flex-end"}
                >
                  <Typography variant="h5">
                    <strong>Name</strong>
                  </Typography>
                  <Typography variant="body2">{props.item.name}</Typography>

                  <Typography variant="h5">
                    <strong>Price</strong>
                  </Typography>
                  <Typography variant="body2">${props.item.price}</Typography>

                  <Typography variant="h5">
                    <strong>Qty</strong>
                  </Typography>
                  <Typography variant="body2">{props.item.quantity}</Typography>
                </Grid>
              </Grid>
              <div className={classes.sectionMargin} />
              <Grid item xs={12} sm={4}>
                <Grid
                  container
                  direction={matches.sm ? "column" : "row"}
                  alignItems="center"
                  alignContent="center"
                  justify="center"
                >
                  <Typography variant="body1">
                    <strong style={{ fontSize: "20px", marginRight: "8px" }}>
                      Cart Total
                    </strong>
                  </Typography>
                  <Typography variant="body2">
                    <strong
                      style={{ fontSize: "20px", fontFamily: "system-ui" }}
                    >
                      ${props.cartTotal.toFixed(2)}
                    </strong>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            {/*EO Container Row - Name, Price, Size, & Total*/}
          </Grid>

          {/* Summary Buttons */}
          <Grid item>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <Button
                  className={classes.summaryBtn}
                  onClick={() => handleRouteToCheckout()}
                  // component={Link}
                  // href="/shoppingcart"
                >
                  Checkout
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  className={classes.summaryBtn}
                  onClick={() => {
                    closeModal()
                    router.push('/collections/')
                    props.clearValues()
                  }}
                >
                  Continue Shopping
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </Backdrop>
  )
}

const mapStateToProps = (state: any) => ({
  cartTotal: state.cart.cartTotal,
})

export default connect(mapStateToProps)(CartSummaryModal)
