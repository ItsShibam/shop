export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculating items price
  state.itemsPrice = state.cartItems.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);

  // Calculating shipping price (if items price over $100 than 0 otherwise $10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculating tax price (15% tax)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculating total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
