import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import { productDate } from "../utils";

const useStyles = makeStyles(theme => ({
  productName: {
    fontSize: "20px"
  },
  price: {
    color: "#ff0000",
    fontSize: "22px"
  },
  productData: {
    color: "#c2c2c2"
  }
}));

export default function ProductAdditionalItem({
  additionalProduct,
  checkedAdditional,
  handleAdditionalCheck,
  product
}) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        item
        xs={1}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Checkbox
          checked={checkedAdditional.includes(additionalProduct)}
          onChange={event =>
            handleAdditionalCheck(event, product, additionalProduct)
          }
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      <Grid item xs={8}>
        <Typography>
          to:{" "}
          <b>
            <span className={classes.productName}>
              {additionalProduct.name}
            </span>
          </b>
        </Typography>
        <Typography className={classes.productData}>
          {productDate(additionalProduct)}
        </Typography>
      </Grid>
      <Grid
        item
        xs={3}
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography className={classes.price}>
          {additionalProduct.price}
        </Typography>
      </Grid>
    </Grid>
  );
}
