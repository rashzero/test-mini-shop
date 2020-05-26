import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
  },
  appBar: {
    backgroundColor: "#a3339e"
  }
}));

export default function HeaderPanel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Checkbox
            checked={props.checked.length === props.productsLength}
            onChange={props.handlerAllProductsCheck}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
            indeterminate={
              props.checked.length > 0 &&
              props.checked.length < props.productsLength
                ? true
                : false
            }
          />
          <Typography variant="h4" className={classes.title}>
            {`$ ${props.totalPrice}`}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
