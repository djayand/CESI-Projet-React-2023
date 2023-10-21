import React, {useEffect, useRef} from 'react';

import {createArticle} from '../../../services/articles'

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from "./CreateArticle.module.css"
import {useAuth} from "../../../contexts/auth.context";
import {useNavigate} from "react-router-dom";
import {User} from "../../../types/user";

const CreateArticle: React.FC = () => {
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
    const priceRef = useRef<HTMLInputElement>(null);

    async function addArticle(article: any) {
        try {
            return await createArticle(article);
        } catch (error) {
            console.error('Failed to add article:', error);
            throw error;
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const articleData = {
                name: nameRef.current ? nameRef.current.value : '',
                description: descriptionRef.current ? descriptionRef.current.value : '',
                price: priceRef.current ? priceRef.current.value : '',
            };

            const newArticle = await addArticle(articleData);
            console.log('Successfully added new article:', newArticle);
        } catch (error) {
            console.error('Failed to add new article:', error);
        }
    };

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className={styles["form-container"]}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.label}>
                        Title:
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
                        Price:
                        <input
                            type=""
                            ref={priceRef}
                            className={styles.input}
                            required
                        />
                    </label>

                    <button type="submit" className={styles.button}>Add Article</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default CreateArticle;