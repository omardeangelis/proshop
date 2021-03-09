export const totalPrice = (array) => {
  return array.reduce((total, item) => total + item.qty * item.price, 0);
};
