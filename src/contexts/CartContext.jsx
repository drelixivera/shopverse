import { createContext, useContext, useReducer, useEffect } from 'react';
// The Cart Context - provides cart state to all components
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity = 1 } = action.payload;
      
      // Check if product already exists in cart
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        
        return {
          ...state,
          items: updatedItems
        };
      }

      // Product doesn't exist - add new item
      return {
        ...state,
        items: [...state.items, { ...product, quantity }]
      };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      // If quantity is 0, remove the item
      if (quantity === 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== id)
        };
      }

      // Update quantity of specific item
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: updatedItems
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

//context provider
export function CartProvider({ children }) {
  const initialState = {
    items: JSON.parse(localStorage.getItem('cart') || '[]')
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = state.items.reduce(
    (sum, item) => sum + (item.price * item.quantity), 0
  );

  const addItem = (product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // The value object that will be available to all consumers
  const value = {
    items: state.items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}