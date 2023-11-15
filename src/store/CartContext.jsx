import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    console.log("into reducer:", action.item);
    // ...update the state to add item
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id == action.item.id;
    });

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const updatedItem = updatedItems[existingCartItemIndex];
      console.log(updatedItem.quantity);
      updatedItem.quantity = updatedItem.quantity + 1;
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    // ...remove an item from the state
    const existingCartItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });

    const updatedItems = [...state.items];
    const existingCartItem = updatedItems[existingCartItemIndex];
    console.log("exisating cart item quantity", existingCartItem);

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type==="CLEAR_CART"){
    return {...state, items:[]};
  }
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }
  function removeItem(id) {
    console.log("id of the item to be removed", id);
    console.log(cart.items);
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }
  function clearCart(){
    dispatchCartAction({type:"CLEAR_CART"})
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
