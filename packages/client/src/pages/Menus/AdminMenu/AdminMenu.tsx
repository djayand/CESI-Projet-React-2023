import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Modal from 'react-modal';
import {Menu} from '../../../types/menu';
import {Article} from '../../../types/article';

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import {getMenus, deleteMenu, updateMenu} from '../../../services/menus';
import {getArticles} from '../../../services/articles';

import styles from './AdminMenu.module.css';
import {User} from "../../../types/user";
import {useAuth} from "../../../contexts/auth.context";

Modal.setAppElement('#root');

const AdminMenu: React.FC = () => {
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

    const [menus, setMenus] = useState<Menu[]>([]);
    const [articles, setArticles] = useState<Article[]>([]);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [editingMenu, setEditingMenu] = useState<Menu | null>(null);

    // Fetch all menus and articles at the beginning
    useEffect(() => {
        const fetchMenus = async () => {
            const fetchedMenus = await getMenus();
            const fetchedArticles = await getArticles();
            setMenus(fetchedMenus);
            setArticles(fetchedArticles);
        };

        fetchMenus();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteMenu(id);
            setMenus(menus.filter(menu => menu.id !== id));
        } catch (error) {
            console.error('Failed to delete the menu:', error);
        }
    };

    const handleEdit = (menu: Menu) => {
        setEditingMenu(menu);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditingMenu(null);
    };

    const submitEdit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editingMenu) {
            // Get the selected articles from the form
            const form = event.currentTarget;
            const articleSelect = form.elements.namedItem('articles') as HTMLSelectElement;
            const selectedArticleIds = Array.from(articleSelect.selectedOptions).map(option => option.value);

            const updatedMenuData = {
                ...editingMenu,
                articleIds: selectedArticleIds,
            };

            try {
                const updatedMenu = await updateMenu(updatedMenuData);
                setMenus(menus.map(menu => menu.id === editingMenu.id ? updatedMenu : menu));
                closeModal();
            } catch (error) {
                console.error('Failed to update the menu:', error);
            }
        }
    };

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className={styles.container}>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {menus.map(menu => (
                        <tr key={menu.id}>
                            <td>{menu.name}</td>
                            <td>
                                <button className={styles.editButton} onClick={() => handleEdit(menu)}>Edit</button>
                                <button className={styles.deleteButton} onClick={() => handleDelete(menu.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {editingMenu && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Edit Menu"
                    >
                        <h2>Edit Menu</h2>
                        <form onSubmit={submitEdit}>
                            <label>
                                Name
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editingMenu.name}
                                />
                            </label>
                            <label>
                                Articles
                                <select multiple name="articles" value={editingMenu.articleIds}>
                                    {articles.map(article => (
                                        <option
                                            key={article.id}
                                            value={article.id}
                                        >
                                            {article.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <button type="submit">Submit</button>
                        </form>
                    </Modal>
                )}
            </div>
            <button className={styles.button} onClick={() => navigate('/menus/create')}>
                Create a menu
            </button>
            <Footer/>
        </div>
    );
};

export default AdminMenu;
