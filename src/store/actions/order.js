import * as actions from "./actions";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actions.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actions.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actions.PURCHASE_ORDER_START,
  };
};

export const purchaseBurger = (orderData, token) => {
  return {
    type: actions.PURCHASE_BURGER,
    orderData: orderData,
    token: token
  }
};

export const purchaseInit = () => {
  return {
    type: actions.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actions.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actions.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actions.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return {
    type: actions.FETCH_ORDERS,
    token: token,
    userId: userId
  }
};
