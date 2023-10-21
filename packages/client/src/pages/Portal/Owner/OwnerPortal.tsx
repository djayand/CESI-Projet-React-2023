import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useRedirectToPortal from '../../../utils/useRedirectToPortal';

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from './OwnerPortal.module.css';

import {useAuth} from '../../../contexts/auth.context';
import {User} from "../../../types/user";

const CustomerPortal: React.FC = () => {
    const {user, initAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loggedUser = await initAuth() as unknown as any
                if (loggedUser.status === 200) {
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };
        fetchUser();
        // useRedirectToPortal();
    }, []);

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className={styles.portal}>
                <div>
                    Manage your restaurant!
                </div>
                <button className={styles.menuButton} onClick={() => navigate('/restaurant/admin')}>
                    My Restaurant
                </button>
                <div>
                    Update your menus!
                </div>
                <button className={styles.menuButton} onClick={() => navigate('/menus/admin')}>
                    My menus
                </button>
                <div>
                    Modify your items!
                </div>
                <button className={styles.menuButton} onClick={() => navigate('/articles/admin')}>
                    My items
                </button>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default CustomerPortal;
