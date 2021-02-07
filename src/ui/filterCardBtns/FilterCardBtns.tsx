import Button from "@material-ui/core/Button/Button"
import Grid from "@material-ui/core/Grid/Grid"
import makeStyles from "@material-ui/core/styles/makeStyles"
import Typography from "@material-ui/core/Typography/Typography"
import React from "react"

import { CATEGORIES } from "../../../pages/collections"

import UseImgFile from "../useImgFile/UseImgFile"

interface IProps {
  filterCategory: string
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>
  jumpTo: (jumpingTarget: string | number | Element) => void
}

const useStyles = makeStyles((theme) => ({
  setMargin: {
    [theme.breakpoints.up("sm")]: {
      marginTop: "60px",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "35px",
    },
  },
  caption: {
    fontFamily: "Raleway",
    letterSpacing: "1.2px",
    fontSize: "0.97rem",
    color: "rgba(73,67,57, 0.9)",
    borderBottom: `2.9px solid ${theme.palette.common.orange}`,
  },
  categoryCard: {
    width: "240px",
    border: "0.5px solid rgba(0,0,0,0.1)",
    height: "340px",
    padding: "6px 6px 0px",
    overflow: "hidden",
    transition: "background-color 0.2s",
    // marginTop: "25px",
  },
  categoryCardBtn: {
    textTransform: "none",
    padding: "0px",
    height: "100%",
    backgroundColor: "rgba(165,152,136, 0.35)",
    "&:hover": {
      backgroundColor: "rgba(165,152,136, 0.2)",
    },
  },
  categoryCardBtnActive: {
    backgroundColor: "rgba(165,152,136, 0.95)",
    boxShadow: "0px 0px 12px #52390680",
  },
  cardBtnIcons: {
    color: `${theme.palette.common.dimegray}`
  },
  categoryCardImgs: {
    width: "100%",
    paddingBottom: "12px",
  },
  cardBtnLabel: {
    height: "99%",
  },
}))

/** These buttons will set the filter category and the state of the filterCategory
 * @param props: {filterCategory, setFilterCategory}
 * @return {filterCategory: string}
 */

export default function FilterCardBtns(props: IProps) {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      {/* On mouse hover, caption 'filter by:' appears*/}
      <Grid container spacing={3} justify="center">
        {/*Container of the categories - card*/}
        <Grid item data-aos="fade-up">
          <Button
            className={
              classes.categoryCardBtn +
              " " +
              (props.filterCategory === CATEGORIES["Luxury"].name
                ? classes.categoryCardBtnActive
                : "")
            }
            onClick={() => {
              props.setFilterCategory(CATEGORIES["Luxury"].name)
              props.jumpTo("#gallery")
            }}
          >
            <div className={classes.categoryCard}>
              <img
                src={'/assets/images/bracelets/collections/luxury88by1ratio.jpg'}
                className={classes.categoryCardImgs}
                alt="Category Of Benson Bracelets"
              />
              <Grid
                container
                alignItems="center"
                justify="center"
                alignContent="center"
              >
                <Grid item>
                  <Typography className={classes.caption} variant="caption" style={{marginRight: '4px'}}>
                    Luxury
                  </Typography>
                  <span className={classes.cardBtnIcons}>{UseImgFile('Luxury')}</span>
                </Grid>
              </Grid>
            </div>
          </Button>
        </Grid>
        <Grid item data-aos="fade-up">
          <Button
            className={
              classes.categoryCardBtn +
              " " +
              (props.filterCategory === CATEGORIES["Fraternity & Sorority"].name
                ? classes.categoryCardBtnActive
                : "")
            }
            onClick={() => {
              props.setFilterCategory(CATEGORIES["Fraternity & Sorority"].name)
              props.jumpTo("#gallery")
            }}
          >
            <div className={classes.categoryCard}>
              <img
                src={'/assets/images/bracelets/collections/fraternity88by1ratio753x856px.jpg'}
                className={classes.categoryCardImgs}
                alt="Category Of Benson Bracelets"
              />
              <Grid
                container
                alignItems="center"
                justify="center"
                alignContent="center"
              >
                <Grid item>
                  <Typography className={classes.caption} variant="caption" style={{marginRight: '4px'}}>
                    Fraternity & Sorority 
                  </Typography>
                  <span className={classes.cardBtnIcons}>{UseImgFile('Fraternity & Sorority')}</span>
                </Grid>
              </Grid>
            </div>
          </Button>
        </Grid>
        <Grid item data-aos="fade-up">
          <Button
            className={
              classes.categoryCardBtn +
              " " +
              (props.filterCategory === CATEGORIES["Team Colors"].name
                ? classes.categoryCardBtnActive
                : "")
            }
            onClick={() => {
              props.setFilterCategory(CATEGORIES["Team Colors"].name)
              props.jumpTo("#gallery")
            }}
          >
            <div className={classes.categoryCard}>
              <img
                src={'/assets/images/bracelets/collections/teamcolors88by1ratio440x500px.jpg'}
                className={classes.categoryCardImgs}
                alt="Category Of Benson Bracelets"
              />
              <Grid
                container
                alignItems="center"
                justify="center"
                alignContent="center"
              >
                <Grid item id="gallery">
                  <Typography className={classes.caption} variant="caption" style={{marginRight: '4px'}}>
                    Team Colors
                  </Typography>
                  <span className={classes.cardBtnIcons}>{UseImgFile('Team Colors')}</span>
                </Grid>
              </Grid>
            </div>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
