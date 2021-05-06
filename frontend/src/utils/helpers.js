export const totalPrice = (array) => {
  return array.reduce((total, item) => total + item.qty * item.price, 0);
};

export const formatPrice = (number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(
    number
  );

export const paginator = (array) => {
  const itemPerPage = 6;
  const pages = Math.ceil(array.length / itemPerPage);
  const newArray = Array.from({ length: pages }, (el, index) => {
    let start = index * itemPerPage;
    let items = itemPerPage + index * itemPerPage;
    return array.slice(start, items);
  });
  return newArray;
};
