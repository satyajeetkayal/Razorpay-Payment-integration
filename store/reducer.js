import {ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART} from './actionType';

const initialState = {
  basket: [],
  total: 0,
  amount: 0,
  title: '',
  image: '',
};

export const getBasketTotal = basket => {
  basket?.reduce((amount, payload) => payload.price + amount, 0);
};

const cartReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        basket: [...state.basket, action.payload],
        total: state.total + action.payload.price,
        amount: state.amount + action.payload.amount,
        title: action.payload.title,
        image: action.payload.image,
      };

    case REMOVE_FROM_CART:
      const index = state.basket.findIndex(
        basketItem => basketItem.id === action.payload.id,
      );

      let newbasket = [...state.basket];

      if (index >= 0) {
        newbasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as its not in basket`,
        );
      }

      return {
        ...state,
        basket: newbasket,
        total: state.total - action.payload.price,
        amount: state.amount - action.payload.amount,
      };

    case EMPTY_CART:
      return {
        ...state,
        basket: [],
        total: 0,
      };
  }
  return state;
};

export default cartReducer;
