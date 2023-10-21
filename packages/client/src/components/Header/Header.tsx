import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from '../../types/user';
import useCart from '../../utils/useCart';
import Cart from '../Cart/Cart';

import './Header.css';

export interface HeaderProps {
    user?: User;
}

const Navbar: React.FC<HeaderProps> = ({user}: HeaderProps) => {
    const {cartItems} = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleCartButtonClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    function goHome() {
        navigate('/customer')
    }

    return (
        <nav className='navbar'>
            <h1 onClick={goHome} className='logo'>Ces'Eat</h1>
            <div onClick={toggle} className='menu-icon'>
                {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </div>
            <nav className={isOpen ? 'nav-links active' : 'nav-links'}>
                <div className='nav-item'>
                    <p>{user?.email}</p>
                    <p>{user?.role}</p>
                    {user ?
                        <a href='/articles/admin' className='nav-link'>Admin Article</a> : <></>}
                    {user ?
                        <a href='/menus/admin' className='nav-link'>Admin Menu</a> : <></>}
                    {user ?
                        <a href='/restaurant/admin' className='nav-link'>Admin Kitchen</a> : <></>}
                    {user ?
                        <a href='/customer' className='nav-link'>Portail</a> : <></>}
                    {user ? <a href='/logout' className='nav-link'>Logout</a> :
                        <a href='/login' className='nav-link'>Login</a>}
                    <a href='/register' className='nav-link'>Register</a>
                    {user ?
                        <a href='/settings' className='nav-link'>Settings</a> : <></>}

                    <button onClick={handleCartButtonClick} className='nav-link'>
                        {cartItems.length >= 0 && <span>({cartItems.length})</span>}
                        <Cart/>
                    </button>

                </div>
            </nav>
        </nav>
    );
};

export default Navbar;
