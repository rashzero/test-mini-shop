import React from "react";
import { connect } from "react-redux";
import done from "../static/Done.JPG";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    minHeight: "100vh"
  },
  button: {
    fontSize: "24px",
    marginLeft: "20px"
  }
});

class SuccessfulPurchase extends React.Component {
  componentDidMount() {
    console.log(this.props.checkedProducts);
  }

  handleClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.root}
      >
        <Grid item xs={3} align="center">
          <img src={done} alt="done" />
          <Button
            className={classes.button}
            color="primary"
            onClick={this.handleClick}
          >
            Done
          </Button>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  checkedProducts: state.checkedProducts
});

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(SuccessfulPurchase)
);
