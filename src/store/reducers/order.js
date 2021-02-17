import * as actions from "../actions/actions";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => {
  return updateObject(state, {
    purchased: false,
  });
};

const purchaseOrderStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, {
    id: action.orderId,
  });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const fetchedOrdersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};

const fetchedOrdersSuccess = (state, action) => {
  return updateObject(state, {
    orders: action.orders,
    loading: false,
  });
};

const fetchOrdersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.PURCHASE_INIT: return purchaseInit(state, action);
    case actions.PURCHASE_ORDER_START: return purchaseOrderStart(state, action);
    case actions.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
    case actions.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
    case actions.FETCH_ORDERS_START: return fetchedOrdersStart(state, action);
    case actions.FETCH_ORDERS_SUCCESS: return fetchedOrdersSuccess(state, action);      
    case actions.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
