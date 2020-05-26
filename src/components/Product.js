import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ProductAdditionalListDialog from "./ProductAdditionalListDialog";
import Checkbox from "@material-ui/core/Checkbox";
import { getPrice } from "../utils";
import { productDate } from "../utils";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  productName: {
    fontSize: 20
  },
  productData: {
    color: "#c2c2c2"
  },
  price: {
    color: "#ff0000",
    fontSize: "22px"
  },
  paper: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "10px 10px",
      width: "100%",
      height: theme.spacing(10)
    }
  },
  productButtonCount: {
    color: "#a3339e",
    margin: "10px",
    backgroundColor: "#f5f5f5",
    border: 0,
    borderRadius: "15px",
    fontSize: "20px",
    width: "25px",
    outline: "none",
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export default function Product({
  handleProductCheck,
  handleIncrement,
  handleDecrement,
  product,
  checked,
  handleAdditionalCheck,
  handlerAllAdittionalCheck
}) {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Card className={classes.root}>
        <CardContent>
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
                checked={checked.includes(product)}
                onChange={event => handleProductCheck(event, product)}
                color="primary"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>
                to:{" "}
                <b>
                  <span className={classes.productName}>{product.name}</span>
                </b>
              </Typography>
              <Typography className={classes.productData}>
                {productDate(product)}
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
              <button
                className={classes.productButtonCount}
                onClick={() => handleDecrement(product)}
              >
                -
              </button>
              {` ${product.count} `}
              <button
                className={classes.productButtonCount}
                onClick={() => handleIncrement(product)}
              >
                +
              </button>
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
                {`$ ${getPrice(product.price)}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <ProductAdditionalListDialog
                checked={checked}
                product={product}
                handleAdditionalCheck={handleAdditionalCheck}
                handlerAllAdittionalCheck={handlerAllAdittionalCheck}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
