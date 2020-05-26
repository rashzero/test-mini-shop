import React from "react";
import { connect } from "react-redux";
import ProgressCentered from "../components/ProgressCentered";
import { withStyles } from "@material-ui/core/styles";
import Product from "../components/Product";
import HeaderPanel from "../components/HeaderPanel";
import Button from "@material-ui/core/Button";
import { addCheckedProductsAction } from "../actions";
import { getPrice, fetch } from "../utils";

const styles = theme => ({
  button: {
    width: "350px",
    height: "70px",
    margin: "30px auto",
    backgroundColor: "#a3339e",
    color: "#ffffff",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#a3339e"
    }
  },
  root: {
    backgroundColor: "#f5f5f5"
  }
});

class Products extends React.Component {
  state = {
    products: [],
    checked: []
  };

  componentDidMount() {
    return fetch(`/products`)
      .then(respones => respones.json())
      .then(this.refactorProducts)
      .then(products => {
        this.setState({
          products
        });
      });
  }

  refactorProducts = products => {
    return products.map(product => ({
      ...product,
      count: 1,
      checkedAdditional: []
    }));
  };

  get totalPrice() {
    let total = 0;
    this.state.checked.forEach(product => {
      total += getPrice(product.price) * product.count;
      product.checkedAdditional.forEach(productAddional => {
        total += getPrice(productAddional.price);
      });
    });
    return total.toFixed(2);
  }

  handlerAllProductsCheck = () => {
    if (!this.state.checked.length) {
      this.setState({
        checked: this.state.products
      });
    } else {
      this.setState({
        checked: []
      });
    }
  };

  handlerAllAdittionalCheck = product => {
    let { checked } = { ...this.state };
    const editProduct = checked.find(({ _id }) => _id === product._id);
    if (!editProduct) {
      return;
    }
    if (editProduct.checkedAdditional.length === 0) {
      editProduct.checkedAdditional = product.additional;
    } else {
      editProduct.checkedAdditional = [];
    }
    this.setState({ checked });
  };

  handlerClickBuy = () => {
    if (!this.state.checked.length) {
      return;
    }
    this.props.addCheckedProductsAction(this.state.checked);
    this.props.history.push("/done");
  };

  handleProductCheck = (event, product) => {
    let { checked } = { ...this.state };
    if (event.target.checked) {
      checked.push(product);
    } else {
      checked = checked.filter(({ _id }) => _id !== product._id);
    }
    this.setState({ checked });
  };

  handleAdditionalCheck = (event, product, additional) => {
    const { checked } = { ...this.state };
    const editProduct = checked.find(({ _id }) => _id === product._id);
    if (!editProduct) {
      return;
    }
    if (event.target.checked) {
      editProduct.checkedAdditional.push(additional);
    } else {
      editProduct.checkedAdditional = editProduct.checkedAdditional.filter(
        ({ _id }) => _id !== additional._id
      );
    }
    this.setState({ checked });
  };

  handleIncrement = product => {
    const { products } = { ...this.state };
    const editPruduct = products.find(({ _id }) => _id === product._id);
    editPruduct.count++;
    this.setState({ products });
  };

  handleDecrement = product => {
    if (product.count === 1) return;
    const { products } = { ...this.state };
    const editPruduct = products.find(({ _id }) => _id === product._id);
    editPruduct.count--;
    this.setState({ products });
  };

  render() {
    const { classes } = this.props;

    if (this.state.products.length === 0) {
      return <ProgressCentered />;
    }

    return (
      <div className={classes.root}>
        <HeaderPanel
          totalPrice={this.totalPrice}
          handlerAllProductsCheck={this.handlerAllProductsCheck}
          checked={this.state.checked}
          productsLength={this.state.products.length}
        />
        <div>
          {this.state.products.map(product => (
            <Product
              checked={this.state.checked}
              product={product}
              key={product._id}
              handleProductCheck={this.handleProductCheck}
              handleIncrement={this.handleIncrement}
              handleDecrement={this.handleDecrement}
              hendlerClick={this.hendlerClick}
              handleAdditionalCheck={this.handleAdditionalCheck}
              handlerAllAdittionalCheck={this.handlerAllAdittionalCheck}
            />
          ))}
        </div>
        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handlerClickBuy}
        >
          Buy
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  checkedProducts: state.checkedProducts
});

const mapDispatchToProps = dispatch => ({
  addCheckedProductsAction: checked =>
    dispatch(addCheckedProductsAction(checked))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Products));
