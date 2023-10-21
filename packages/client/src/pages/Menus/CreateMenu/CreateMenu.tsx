import React, {useEffect, useState, useRef} from 'react';
import {createMenu} from '../../../services/menus';
import {getArticles} from "../../../services/articles";
import {getKitchens} from "../../../services/kitchens";

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import {Article} from "../../../types/article"
import {Kitchen} from "../../../types/kitchen"

import styles from "./CreateMenu.module.css";
import {User} from "../../../types/user";
import {useAuth} from "../../../contexts/auth.context";
import {useNavigate} from "react-router-dom";

const CreateMenu: React.FC = () => {
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

    const [articles, setArticles] = useState<Article[]>([]);
    const [kitchens, setKitchens] = useState<Kitchen[]>([]);
    const [selectedKitchen, setSelectedKitchen] = useState<string>('');
    const [articleIds, setArticleIds] = useState<string[]>([]);
    const [selectsCount, setSelectsCount] = useState<number>(1);

    useEffect(() => {
        const fetchArticles = async () => {
            const fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
        };

        const fetchKitchens = async () => {
            const fetchedKitchens = await getKitchens();
            setKitchens(fetchedKitchens);
        };

        fetchArticles();
        fetchKitchens();
    }, []);

    const handleArticleSelect = (id: string, index: number) => {
        let newArticleIds = [...articleIds];
        newArticleIds[index] = id;
        setArticleIds(newArticleIds);
    }

    const handleSubmit = async () => {
        if (!selectedKitchen) {
            console.error('No kitchen selected');
            return;
        }

        if (articleIds.includes('')) {
            console.error('An article is not selected');
            return;
        }

        try {
            const menuData = {
                name: nameRef.current ? nameRef.current.value : '',
                articleIds: articleIds.filter(id => id !== ''),
                kitchenId: selectedKitchen
            };

            const newMenu = await createMenu(menuData);
            console.log('Successfully added new menu:', newMenu);
            setArticleIds([]);
            setSelectsCount(1);
            setSelectedKitchen('');
        } catch (error) {
            console.error('Failed to add new menu:', error);
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
                        Kitchen:
                        <select value={selectedKitchen} onChange={(e) => setSelectedKitchen(e.target.value)}>
                            <option value="">Select a kitchen</option>
                            {kitchens.map(kitchen => (
                                <option key={kitchen.id} value={kitchen.id}>
                                    {kitchen.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    {/* Render article selects based on selectsCount state */}
                    {[...Array(selectsCount)].map((_, index) => (
                        <label className={styles.label} key={index}>
                            Article {index + 1}:
                            <select value={articleIds[index] || ''}
                                    onChange={(e) => handleArticleSelect(e.target.value, index)}>
                                {/* Remove articles selected before */}
                                <option value="">Select an article</option>
                                {articles.filter(article => !articleIds.includes(article.id)).map(article => (
                                    <option key={article.id} value={article.id}>
                                        {article.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ))}
                    <button type="button" onClick={() => {
                        setSelectsCount(selectsCount + 1);
                        setArticleIds([...articleIds, '']);
                    }}>Add another article
                    </button>
                    <button type="submit" className={styles.button}>Add Menu</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default CreateMenu;
