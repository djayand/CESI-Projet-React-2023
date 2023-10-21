import React, {useEffect} from 'react';
import styles from './UserSettings.module.css';

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import {User} from "../../../types/user";
import {useAuth} from "../../../contexts/auth.context";
import {useNavigate} from "react-router-dom";

const UserSettings: React.FC = () => {
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const handleDelete = () => {
    };

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className={styles.container}>
                <label className={styles.title}>Paramètre du compte</label>
                <form onSubmit={handleSubmit} className={styles.test}>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>First Name:</label>
                        <input type="text" name="firstName" onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input type="text" name="lastName" onChange={handleChange}/>
                    </div>
                    <button type="submit" className={styles.submit}>Save Changes</button>
                    <button onClick={handleDelete} className={styles.delete}>Delete Account</button>
                </form>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default UserSettings;
