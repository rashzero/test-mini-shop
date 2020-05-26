import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getPriceWithAdditional } from "../utils";
import ProductAdditionalItem from "./ProductAdditionalItem";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    backgroundColor: "#a3339e"
  },
  title: {
    marginLeft: theme.spacing(5),
    flex: 1
  },
  productData: {
    color: "#c2c2c2"
  },
  button: {
    width: "350px",
    height: "70px",
    margin: "auto",
    backgroundColor: "#a3339e",
    color: "#ffffff",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#a3339e"
    }
  },
  totalPrice: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3),
    backgroundColor: "#e6e6e6",
    fontSize: 36
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductAdditionalDialog({
  product,
  handleAdditionalCheck,
  checked,
  handlerAllAdittionalCheck
}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <ArrowForwardIcon />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Checkbox
              checked={
                product.checkedAdditional.length === product.additional.length
              }
              onChange={() => handlerAllAdittionalCheck(product)}
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
              indeterminate={
                product.checkedAdditional.length > 0 &&
                product.checkedAdditional.length < product.additional.length
                  ? true
                  : false
              }
            />
          </Toolbar>
        </AppBar>
        <Grid container className={classes.totalPrice}>
          <Grid item xs={5} container alignItems="center" justify="center">
            <Paper className={classes.paper}>
              {`$ ${getPriceWithAdditional(product)}`}
            </Paper>
          </Grid>
          <Grid item xs={7} container alignItems="center">
            <Typography
              variant="h6"
              component="h6"
              className={classes.productData}
            >
              Lorem ipsum
              <br />
              lorem ipsumLOrem lorem
            </Typography>
          </Grid>
        </Grid>
        <List>
          {product.additional.map(additionalProduct => (
            <ProductAdditionalItem
              key={additionalProduct._id}
              additionalProduct={additionalProduct}
              checkedAdditional={product.checkedAdditional}
              handleAdditionalCheck={handleAdditionalCheck}
              product={product}
            />
          ))}
        </List>
        <Grid container>
          <Grid item xs={11} container direction="column" alignItems="flex-end">
            <Typography variant="h6" component="h6">
              Total
            </Typography>
            <Typography variant="h4" component="h4">
              <b>{`$ ${getPriceWithAdditional(product)}`}</b>
            </Typography>
          </Grid>
        </Grid>
        <Button
          variant="outlined"
          onClick={handleClose}
          className={classes.button}
        >
          Confirm
        </Button>
      </Dialog>
    </div>
  );
}
