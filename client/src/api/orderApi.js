import API from "./axios";


// CREATE ORDER
export const createOrder = async (
  orderData
) => {

  const response = await API.post(
    "/orders",
    orderData
  );

  return response.data;
};


// CREATE RAZORPAY ORDER
export const createRazorpayOrder =
  async (amount) => {

    const response = await API.post(
      "/orders/create-razorpay-order",
      { amount }
    );

    return response.data;
};


// VERIFY PAYMENT
export const verifyPayment = async (
  paymentData
) => {

  const response = await API.post(
    "/orders/verify-payment",
    paymentData
  );

  return response.data;
};