export const DisplayPrice = (price) => {
  return new Intl.NumberFormat("ar-TN", {
    style: "currency",
    currency: "TND",
  }).format(price);
};
