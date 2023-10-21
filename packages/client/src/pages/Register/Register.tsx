import React, {useState, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext, useAuth} from '../../contexts/auth.context';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from './Register.module.css'
import {User} from "../../types/user";

const Register: React.FC = () => {
    const navigate = useNavigate();

    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    const {register} = context;

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(data.email, data.password);
            navigate('/customer');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <Header/>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div>
                        <label className={styles.value}>Email</label>
                        <input
                            className={styles.inputs}
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className={styles.value}>Password</label>
                        <input
                            className={styles.inputs}
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    );
};

export default Register;
