import React, {useState} from 'react';
import Modal from 'react-modal';
import {IoCart, IoAdd, IoRemove, IoClose} from "react-icons/io5";
import useCart from '../../utils/useCart';
import styles from './Cart.module.css';

Modal.setAppElement('#root');

const Cart: React.FC = () => {
    const {cartItems, addItemToCart, removeItemFromCart, clearCart} = useCart();
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button onClick={toggleModal} className={styles['cart-button']}>
                <IoCart className={styles['cart-logo']}/>
            </button>
            <Modal
                isOpen={isOpen}
                onRequestClose={toggleModal}
                className={styles['cart-modal']}
                overlayClassName={styles['cart-overlay']}
            >
                <button onClick={toggleModal} className={styles['cart-close-button']}>
                    <IoClose/>
                </button>
                <h2>Votre panier</h2>
                {cartItems.length === 0 ? (
                    <p>Votre panier est vide.</p>
                ) : (
                    <ul className={styles['cart-items']}>
                        {cartItems.map((item:any) => (
                            <li key={item.menuId} className={styles['cart-item']}>
                                <h3>{item.name}</h3>
                                <p>Quantité : {item.quantity}</p>
                                <div className={styles['cart-item-controls']}>
                                    <button onClick={() => addItemToCart(item.menuId)}
                                            className={styles['cart-item-control']}>
                                        <IoAdd/>
                                    </button>
                                    <button onClick={() => removeItemFromCart(item.menuId)}
                                            className={styles['cart-item-control']}>
                                        <IoRemove/>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={clearCart} className={styles['cart-clear']}>Vider le panier</button>
            </Modal>
        </div>
    );
};

export default Cart;
