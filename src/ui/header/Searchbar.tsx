import React, { ChangeEvent, useContext, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid/Grid';
import Hidden from '@material-ui/core/Hidden/Hidden';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';
import TextField from '@material-ui/core/TextField/TextField';
import { ShopContext } from '../../context/ShopContext';
import { Product } from 'shopify-buy';

interface Props {
    handleAutoComplete: (name: string) => void
}

const useStyles = makeStyles((theme) => ({
    toolbarGrid: {
        borderTop: `2px solid ${theme.palette.common.dimegray}99`,
        backgroundColor: theme.palette.common.antiqueWhite,
        padding: "0px 0px 30px",
      },
      secondToolbar: {
        height: "20px",
        marginLeft: "auto",
      },
      popperZIndex: {
        zIndex: 1303,
      },
      optionsText: {
        // AUTO COMPLETE SELECT - OPTIONS
        color: "rgb(85,77,64)",
        letterSpacing: "0.5px",
        fontSize: "0.85rem",
        backgroundColor: "rgba(231,212,195, 0.01)",
        fontFamily: "Raleway",
        "&:hover": {
          color: theme.palette.common.orange,
          backgroundColor: "rgba(231,212,195, 0.15)",
        },
      },
      underline: {
        "&:focused": {
          color: "blue",
        },
        "&:hover": {
          underline: "green",
        },
      },
}))

export default function Searchbar(props: Props) {
    const classes = useStyles()
    const {fetchAllProducts, products}:{
        fetchAllProducts(): Promise<Product[]>,
        products: Product[]
    } = useContext<any>(ShopContext)
    
    useEffect(() => {
        fetchAllProducts()
    }, [fetchAllProducts])

    if(!products) return <h3>Not Available</h3>
    return (
        <Hidden smDown>
        <Grid container classes={{ root: classes.toolbarGrid }}>
          <Toolbar className={classes.secondToolbar}>
            <div style={{ width: 300 }}>
              <Autocomplete
                classes={{
                  popper: classes.popperZIndex,
                  option: classes.optionsText,
                  listbox: classes.optionsText,
                }}
                onChange={(event: ChangeEvent<{}>, value: any) => {
                    event;
                    props.handleAutoComplete(value);
                }}
                id="free-solo-demo"
                freeSolo
                options={products.map((option: Product) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    id="outlined-size-small"
                    label="Search Bracelets"
                    margin="normal"
                    color={undefined}
                    classes={{ root: classes.underline }}
                  />
                )}
              />
            </div>
          </Toolbar>
        </Grid>
      </Hidden>
    )
}
