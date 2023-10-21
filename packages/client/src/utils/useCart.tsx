import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

// Définition de l'interface de l'article de menu
interface CartItem {
    menuId: string;
    name: string;
    articlesIds: string[];
    quantity: number;
}

// Les fonctions pour manipuler le panier
const useCart = () => {
    const { state, dispatch } = useContext(CartContext);

    const addItemToCart = (item: CartItem) => {
        dispatch({ type: 'ADD_ITEM', item });
    };

    const removeItemFromCart = (menuId: string) => {
        dispatch({ type: 'REMOVE_ITEM', menuId });
    };

    const updateItemQuantity = (menuId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_ITEM_QUANTITY', menuId, quantity });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return { cartItems: state.cartItems, addItemToCart, removeItemFromCart, updateItemQuantity, clearCart };
};

export default useCart;
