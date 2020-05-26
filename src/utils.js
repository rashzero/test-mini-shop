import products from "./products.json";

export function fetch() {
  return new Promise(resolve => {
    const response = {
      json: () => Promise.resolve(products)
    };
    setTimeout(() => resolve(response), 2500);
  });
}

export function getPrice(str) {
  return Number(str.replace("$", ""));
}

export function productDate(product) {
  const productDate = new Date(product.date);
  const options = {
    year: 'numeric',
    month: 'long',
  };
  return productDate.toLocaleString("en-US", options)
} 

export function getPriceWithAdditional(product) {
  let priceResult = getPrice(product.price) * product.count;
  product.checkedAdditional.forEach(additionalProduct => {
    priceResult += getPrice(additionalProduct.price);
  });
  return priceResult.toFixed(2);
}
