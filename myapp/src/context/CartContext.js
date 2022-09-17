import React, {createContext, useContext, useReducer, useEffect} from 'react';
const CartContext = createContext();
const cartreducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      return {
        ...state,
        cart: [...state.cart, {...action.payload, qty: 1}],
      };
    }
    case 'REMOVE_TO_CART':{
      return {
        ...state,
        cart: state.cart.filter((c) => c.id !== action.payload.id),
      }
    }
    case 'INITIAL':
      return action.payload;
    default:
      return state;
  }
};
const initialvalue = {
  fetchData: [],
  cart: [],
};

export default function CartProvider({children}) {
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'INITIAL',
          payload: {
            ...initialvalue,
            fetchData: data,
          },
        });
      })
      .catch(error => console.error(error));
  }, []);
  const [state, dispatch] = useReducer(cartreducer, initialvalue);
  return (
    <CartContext.Provider value={{state, dispatch}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => {
  return useContext(CartContext);
};
