export const addToCart = (product) => (dispatch) => {
  dispatch({
    type: 'ADD_TO_CART',
    payload: product,
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: id,
  });
};

export const removeFullProductFromCart = (id) => (dispatch) => {
  dispatch({
    type: 'REMOVE_FULL_PRODUCT_FROM_CART',
    payload: id,
  });
};
