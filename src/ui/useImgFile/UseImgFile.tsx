import Icon, { IconTypeMap } from "@material-ui/core/Icon/Icon"
import { OverridableComponent } from "@material-ui/core/OverridableComponent"
import React from "react"
import { CATEGORIES } from "../../../pages/collections"
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

/* These types are for marterial Icons, svgs, or i tags for Font Awesome icons */
type ImgTypes =
  | OverridableComponent<IconTypeMap<{}, "span">> /* Material UI Icons */
  | React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> /* i tags */
  | React.SVGProps<SVGSVGElement> /* SVG Elements*/

const luxuryIcon: ImgTypes = (
  <i
    style={{ paddingRight: "8px", fontSize: "9px" }}
    className="far fa-gem"
  ></i>
)

const fraternitysororityIcon: ImgTypes = (
  <i
    className="fas fa-venus-mars"
    style={{ fontSize: "11px", paddingRight: "6px" }}
  ></i>
)

const teamColorsIcon: ImgTypes = (
  <Icon style={{ fontSize: "12px", paddingRight: "6px" }}>
    sports_basketball
  </Icon>
)

const error: ImgTypes = (
    <HighlightOffIcon />
)

/** Based on the category it will return
 *  the necessary icon respresenting the category
 * @param {category}
 * @return {ImgTypes}
 */
export default function UseImgFile(category: string): ImgTypes {
  switch (category) {
    case CATEGORIES["Luxury"].name:
      return luxuryIcon

    case CATEGORIES["Fraternity & Sorority"].name:
      return fraternitysororityIcon

    case CATEGORIES["Team Colors"].name:
      return teamColorsIcon

    default:
      return error
  }
}
