const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        // If the item already exists, increase the quantity
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id
              ? { ...x, quantity: x.quantity + 1 } // Increase quantity
              : x
          ),
        };
      } else {
        // If it's a new item, add it to the cart with quantity 1
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      const itemToRemove = state.cartItems.find((x) => x.id === action.payload);

      if (itemToRemove.quantity > 1) {
        // If more than one item is in the cart, decrease the quantity
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === action.payload ? { ...x, quantity: x.quantity - 1 } : x
          ),
        };
      } else {
        // If only one item is in the cart, remove it
        return {
          ...state,
          cartItems: state.cartItems.filter((x) => x.id !== action.payload),
        };
      }

    case "REMOVE_FULL_PRODUCT_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };

    default:
      return state;
  }
};
