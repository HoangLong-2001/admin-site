export default function priceFormat(price) {
    return price.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  }
  