import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import useRedirectToPortal from "../../../utils/useRedirectToPortal";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from './DriverPortal.module.css';
import {User} from "../../../types/user";
import {useAuth} from "../../../contexts/auth.context";

const DriverPortal: React.FC = () => {
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
        navigate('/driver');
    };

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className={styles.portal}>
                <div>
                    Have a see on your orders !
                </div>
                <button className={styles.menuButton} onClick={handleButtonClick}>
                    Orders
                </button>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default DriverPortal;