import React, {useEffect, useRef} from 'react';
import axios from 'axios';

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from "./CreateKitchen.module.css"
import {useAuth} from "../../../contexts/auth.context";
import {useNavigate} from "react-router-dom";
import {User} from "../../../types/user";

const CreateKitchen: React.FC = () => {
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

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const openingHoursRef = useRef<HTMLInputElement>(null);
    const closingHoursRef = useRef<HTMLInputElement>(null);
    const cuisineTypeRef = useRef<HTMLInputElement>(null);
    const paymentOptionsRef = useRef<HTMLInputElement>(null);
    const specialOptionsRef = useRef<HTMLInputElement>(null);
    const contactInfoRef = useRef<HTMLInputElement>(null);

    async function addKitchen(kitchen: any) {
        try {
            const response = await axios.post(process.env.REACT_APP_URL_API_MS_KITCHENS + `/kitchens`, kitchen);
            return response.data;
        } catch (error) {
            console.error('Failed to add kitchen:', error);
            throw error;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const kitchenData = {
                name: nameRef.current ? nameRef.current.value : '',
                description: descriptionRef.current ? descriptionRef.current.value : '',
                address: addressRef.current ? addressRef.current.value : '',
                openingHours: {
                    open: openingHoursRef.current ? openingHoursRef.current.value : '',
                    close: closingHoursRef.current ? closingHoursRef.current.value : ''
                },
                cuisineType: cuisineTypeRef.current ? cuisineTypeRef.current.value : '',
                paymentOptions: paymentOptionsRef.current ? paymentOptionsRef.current.value : '',
                specialOptions: specialOptionsRef.current ? specialOptionsRef.current.value : '',
                contactInfo: contactInfoRef.current ? contactInfoRef.current.value : '',
            };

            const newKitchen = await addKitchen(kitchenData);
            console.log('Successfully added new kitchen:', newKitchen);
        } catch (error) {
            console.error('Failed to add new kitchen:', error);
        }
    };

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className={styles["form-container"]}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Name:
                        <input
                            type="text"
                            ref={nameRef}
                            className={styles.input}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Description:
                        <input
                            type="text"
                            ref={descriptionRef}
                            className={styles.input}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Address:
                        <input
                            type="text"
                            ref={addressRef}
                            className={styles.input}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Opening Hours:
                        <input
                            type="time"
                            ref={openingHoursRef}
                            className={styles.input}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Closing Hours:
                        <input
                            type="time"
                            ref={closingHoursRef}
                            className={styles.input}
                            required
                        />
                    </label>
                    <label className={styles.label}>
                        Cuisine Type:
                        <input
                            type="text"
                            ref={cuisineTypeRef}
                            className={styles.input}
                            required
                        />
                    </label>

                    <label className={styles.label}>
                        Payment Options:
                        <input
                            type="text"
                            ref={paymentOptionsRef}
                            className={styles.input}
                            required
                        />
                    </label>

                    <label className={styles.label}>
                        Special Options:
                        <input
                            type="text"
                            ref={specialOptionsRef}
                            className={styles.input}
                            required
                        />
                    </label>

                    <label className={styles.label}>
                        Contact Info:
                        <input
                            type="text"
                            ref={contactInfoRef}
                            className={styles.input}
                            required
                        />
                    </label>

                    <button type="submit" className={styles.button}>Add Kitchen</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default CreateKitchen;