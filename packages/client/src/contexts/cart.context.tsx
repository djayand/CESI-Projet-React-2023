import React, { createContext, useReducer } from 'react';

interface CartItem {
    menuId: string;
    name: string;
    articlesIds: string[];
    quantity: number;
}

interface CartState {
    cartItems: CartItem[];
}

interface CartContextProps {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
}

type CartAction =
    | { type: 'ADD_ITEM'; item: CartItem }
    | { type: 'REMOVE_ITEM'; menuId: string }
    | { type: 'UPDATE_ITEM_QUANTITY'; menuId: string; quantity: number }
    | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            return { ...state, cartItems: [...state.cartItems, action.item] };
        case 'REMOVE_ITEM':
            return { ...state, cartItems: state.cartItems.filter(item => item.menuId !== action.menuId) };
        case 'UPDATE_ITEM_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.menuId === action.menuId ? { ...item, quantity: action.quantity } : item,
                ),
            };
        case 'CLEAR_CART':
            return { ...state, cartItems: [] };
        default:
            return state;
    }
};

const CartContext = createContext({} as CartContextProps);

const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
