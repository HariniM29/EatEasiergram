import Axios from 'axios';
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_CLEAR,
  ORDER_SET_TYPE,
  ORDER_SET_PAYMENT_TYPE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_QUEUE_LIST_REQUEST,
  ORDER_QUEUE_LIST_SUCCESS,
  ORDER_QUEUE_LIST_FAIL,
  SCREEN_SET_WIDTH,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from './constants';
 // Replace with your backend URL


const initialState = {
  widthScreen: false,
  orderList: { loading: true },
  queueList: { loading: true },
 
  categoryList: { 
    loading: true,
   // Initially an empty array or your default categories
  
    errorProducts:true,
  
    
    categories: [ {
      category: 'Beverages',
      name: 'Coca-Cola',
      calorie: 120,
      price: 1,
      image: '/images/t-mcdonalds-Coca-Cola-Classic-Small.jpg',
    },
    {
      category: 'Beverages',
      name: 'Vanill Shake',
      price: 1.5,
      calorie: 360,
      image: '/images/t-mcdonalds-Vanilla-McCafe-Shake-Medium.jpg',
    },
    {
      category: 'Beverages',
      name: 'Hot Chocolate',
      price: 2,
      calorie: 170,
      image: '/images/t-mcdonalds-McCafe-Hot-Chocolate-Medium.jpg',
    },
    {
      category: 'Breakfast',
      name: 'Bacon & Biscuit',
      price: 1.9,
      calorie: 90,
      image:
        '/images/t-mcdonalds-Bacon-Egg-Cheese-Biscuit-Regular-Size-Biscuit.jpg',
    },
    {
      category: 'Breakfast',
      name: 'Blueberry Muffin',
      price: 1.5,
      calorie: 120,
      image: '/images/t-blueberry-muffin.jpg',
    },
    {
      category: 'Breakfast',
      name: 'Big Breakfast',
      price: 3,
      calorie: 430,
      image: '/images/s-mcdonalds-Big-Breakfast-Regular-Size-Biscuit.jpg',
    },
    {
      category: 'Burgers',
      name: 'Big Mac',
      price: 1.9,
      calorie: 200,
      image: '/images/t-mcdonalds-Big-Mac.jpg',
    },
    {
      category: 'Burgers',
      name: 'Hamburger',
      price: 1.5,
      calorie: 410,
      image: '/images/t-mcdonalds-Hamburger.jpg',
    },
    {
      category: 'Burgers',
      name: 'McDouble',
      price: 3,
      calorie: 320,
      image: '/images/t-mcdonalds-McDouble.jpg',
    }], // Initially an empty array or your default categories
    error: null,
    },
    productList: { products:[{
      category: 'Burgers',
      name: 'McDouble',
      price: 3,
      calorie: 320,
      image: '/images/t-mcdonalds-McDouble.jpg',
    }]},
  order: {
    orderItems: [],
    orderType: 'Eat in',
    paymentType: 'Pay here',
    taxPrice: 0,
    totalPrice: 0,
    itemsCount: 0,
 
  },
  orderCreate: { loading: true,error:null },
  
};
export const listCategories = async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });

  try {
    
    const { data } = await Axios.get('/api/categories');
    return dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.message,
    });
  }
};
export const listProducts = async (dispatch, categoryName = '') => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    // Assuming you have a list of products for the given category name
    const productsForCategory = initialState.categoryList.categories.filter(
      (item) => item.category === categoryName
    )[0]?.products || [];

    return dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: {
        products: productsForCategory,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.message,
    });
  }
};


export const createOrder = async (dispatch, order) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const { data } = await Axios.post('/api/orders', order);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
      
    });
   
  } catch (error) {
    console.error('Error creating order:', error);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response?.data || 'Failed to create order',
    });
  }
};


export const setOrderType = async (dispatch, orderType) => {
  return dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType,
  });
};
export const setPaymentType = async (dispatch, paymentType) => {
  return dispatch({
    type: ORDER_SET_PAYMENT_TYPE,
    payload: paymentType,
  });
};
export const clearOrder = async (dispatch) => {
  return dispatch({
    type: ORDER_CLEAR,
  });
};

export const addToOrder = async (dispatch, item) => {
  return dispatch({
    type: ORDER_ADD_ITEM,
    payload: item,
  });
};
export const removeFromOrder = async (dispatch, item) => {
  return dispatch({
    type: ORDER_REMOVE_ITEM,
    payload: item,
  });
};

export const listQueue = async (dispatch) => {
  dispatch({ type: ORDER_QUEUE_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`/api/orders/queue`);
    dispatch({ type: SCREEN_SET_WIDTH });
    return dispatch({
      type: ORDER_QUEUE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    return dispatch({
      type: ORDER_QUEUE_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listOrders = async (dispatch) => {
  dispatch({ type: ORDER_LIST_REQUEST });
  try {
    const { data } = await Axios.get(`/api/orders`);
    dispatch({ type: SCREEN_SET_WIDTH });
    return dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
    return dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.message,
    });
  }
};

