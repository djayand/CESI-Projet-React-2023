import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';

import {Article} from '../../../types/article';
import {getArticles, updateArticle, deleteArticle} from '../../../services/articles'

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from './AdminArticle.module.css';
import {useAuth} from "../../../contexts/auth.context";
import {User} from "../../../types/user";

Modal.setAppElement('#root');

const AdminArticle: React.FC = () => {
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

    const [articles, setArticles] = useState<Article[]>([]);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch (error) {
                console.error(`Error getting articles: ${error}`);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteArticle(id);
            setArticles(articles.filter(article => article.id !== id));
        } catch (error) {
            console.error(`Error deleting the article: ${error}`);
        }
    };

    const handleEdit = (article: Article) => {
        setEditingArticle(article);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditingArticle(null);
    };

    const submitEdit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (editingArticle) {
            try {
                const updatedArticle = await updateArticle(editingArticle.id, editingArticle);
                console.log(updatedArticle);
                setArticles(articles.map(article => article.id === editingArticle.id ? updatedArticle : article));
                closeModal();
            } catch (error) {
                console.error(`Error updating the article: ${error}`);
            }
        }
    };

    if (!articles) {
        return <div>Loading articles...</div>;
    }

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className={styles.container}>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {articles.map(article => (
                        <tr key={article.id}>
                            <td>{article.name}</td>
                            <td>{article.description}</td>
                            <td>{article.price}</td>
                            <td>
                                <button className="editButton" onClick={() => handleEdit(article)}>Edit</button>
                                <button className="deleteButton" onClick={() => handleDelete(article.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {editingArticle && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Edit Article"
                    >
                        <h2>Edit Article</h2>
                        <form onSubmit={submitEdit}>
                            <label>
                                Name
                                <input
                                    type="text"
                                    value={editingArticle.name}
                                    onChange={(event) => setEditingArticle({
                                        ...editingArticle,
                                        name: event.target.value
                                    })}
                                />
                            </label>

                            <label>
                                Description
                                <input
                                    type="text"
                                    value={editingArticle.description}
                                    onChange={(event) => setEditingArticle({
                                        ...editingArticle,
                                        description: event.target.value
                                    })}
                                />
                            </label>

                            <label>
                                Address
                                <input
                                    type="text"
                                    value={editingArticle.price}
                                    onChange={(event) => setEditingArticle({
                                        ...editingArticle,
                                        price: +event.target.value
                                    })}
                                />
                            </label>

                            <button type="submit">Submit</button>
                        </form>
                    </Modal>
                )}
            </div>
            <button className={styles.button} onClick={() => navigate('/articles/create')}>
                Create an article
            </button>
            <Footer/>
        </div>
    );
};

export default AdminArticle;
