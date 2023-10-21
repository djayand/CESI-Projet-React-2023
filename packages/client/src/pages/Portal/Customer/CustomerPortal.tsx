import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from './CustomerPortal.module.css';

import {useAuth} from '../../../contexts/auth.context';
import {User} from "../../../types/user";
import useRedirectToPortal from "../../../utils/useRedirectToPortal";

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
    }, []);

    return (
        <div>
            <div>
                <Header user={user as unknown as User}/>
            </div>

            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>Bienvenue sur Ces'Eats</h1>
                </div>
                <div className={styles.slider}>
                    <div className={styles.enfant}>
                        <a>Burger King</a>
                        <a>207 Rue de Loutrovsky</a>
                        <a>Burger</a>
                    </div>
                    <div className={styles.enfant}>
                        <a>KFC</a>
                        <a>147 Allée Caloir</a>
                        <a>Poulet</a>
                    </div>
                    <button className={styles.menuButton} onClick={() => {
                        navigate("/catalog")
                    }}>
                        Catalogue
                    </button>
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default CustomerPortal;
