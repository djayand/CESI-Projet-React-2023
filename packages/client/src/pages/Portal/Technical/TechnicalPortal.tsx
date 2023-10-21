import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from './TechnicalPortal.module.css';
import {User} from "../../../types/user";
import {useAuth} from "../../../contexts/auth.context";

const TechnicalPortal: React.FC = () => {
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

    const handleButtonClick = () => {
        navigate('/technical');
    };

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className={styles.portal}>
                <div>
                    Technical panel
                </div>
                <button className={styles.menuButton} onClick={handleButtonClick}>
                    Settings
                </button>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default TechnicalPortal;