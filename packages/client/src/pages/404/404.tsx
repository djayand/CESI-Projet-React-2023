import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from './404.module.css'

import qcq from '../../assets/img/404.png'
import {useAuth} from "../../contexts/auth.context";

const Page404: React.FC = () => {
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

    function goHome() {
        navigate('/')
    }

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.mess}>
                    <a>404</a>
                    <br/>
                    <a>Vous ne passerez pas</a>
                    <br/>
                    <a>!!!!!!!</a>
                </div>
                <div className={styles.pic}>
                    <img src={qcq} onClick={goHome}/>
                </div>
            </div>
        </div>
    );
};

export default Page404;
