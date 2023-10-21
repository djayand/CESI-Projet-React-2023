import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';
import {Kitchen} from '../../../types/kitchen';

import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";

import styles from './AdminKitchen.module.css';
import {useAuth} from "../../../contexts/auth.context";
import {User} from "../../../types/user";

Modal.setAppElement('#root');

const AdminKitchen: React.FC = () => {
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

    const [kitchens, setKitchens] = useState<Kitchen[]>([]);
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);
    const [editingKitchen, setEditingKitchen] = useState<Kitchen | null>(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_API_MS_KITCHENS + `/kitchens`)
            .then(response => setKitchens(response.data))
            .catch(error => console.error('Error fetching the kitchens:', error));
    }, []);

    const handleDelete = (id: string) => {
        axios.delete(process.env.REACT_APP_URL_API_MS_KITCHENS + `/kitchens/${id}`)
            .then(response => {
                setKitchens(kitchens.filter(kitchen => kitchen.id !== id));
            })
            .catch(error => console.error('Error deleting the kitchen:', error));
    };

    const handleEdit = (kitchen: Kitchen) => {
        setEditingKitchen(kitchen);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setEditingKitchen(null);
    };

    const submitEdit = (event: React.FormEvent) => {
        event.preventDefault();
        if (editingKitchen) {
            axios.patch(process.env.REACT_APP_URL_API_MS_KITCHENS + `/kitchens/${editingKitchen.id}`, editingKitchen)
                .then(response => {
                    console.log(response)
                    setKitchens(kitchens.map(kitchen => kitchen.id === editingKitchen.id ? response.data : kitchen));
                    closeModal();
                })
                .catch(error => console.error('Error updating the kitchen:', error));
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
                        <th>Description</th>
                        <th>Address</th>
                        <th>Opening Hours</th>
                        <th>Closing Hours</th>
                        <th>Cuisine Type</th>
                        <th>Payment Options</th>
                        <th>Special Options</th>
                        <th>Contact Info</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {kitchens.map(kitchen => (
                        <tr key={kitchen.id}>
                            <td>{kitchen.name}</td>
                            <td>{kitchen.description}</td>
                            <td>{kitchen.address}</td>
                            <td>{kitchen.openingHours.open}</td>
                            <td>{kitchen.openingHours.close}</td>
                            <td>{kitchen.cuisineType}</td>
                            <td>{kitchen.paymentOptions}</td>
                            <td>{kitchen.specialOptions}</td>
                            <td>{kitchen.contactInfo}</td>
                            <td>
                                <button className="editButton" onClick={() => handleEdit(kitchen)}>Edit</button>
                                <button className="deleteButton" onClick={() => handleDelete(kitchen.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {editingKitchen && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Edit Kitchen"
                    >
                        <h2>Edit Kitchen</h2>
                        <form onSubmit={submitEdit}>
                            <label>
                                Name
                                <input
                                    type="text"
                                    value={editingKitchen.name}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        name: event.target.value
                                    })}
                                />
                            </label>

                            <label>
                                Description
                                <input
                                    type="text"
                                    value={editingKitchen.description}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        description: event.target.value
                                    })}
                                />
                            </label>

                            <label>
                                Address
                                <input
                                    type="text"
                                    value={editingKitchen.address}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        address: event.target.value
                                    })}
                                />
                            </label>

                            <label>
                                Opening Hours
                                <input
                                    type="time"
                                    value={editingKitchen.openingHours.open}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        openingHours: {
                                            open: event.target.value,
                                            close: editingKitchen?.openingHours.close
                                        }
                                    })}
                                />
                            </label>

                            <label>
                                Closing Hours
                                <input
                                    type="time"
                                    value={editingKitchen.openingHours.close}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        openingHours: {
                                            open: editingKitchen?.openingHours.open,
                                            close: event.target.value
                                        }
                                    })}
                                />
                            </label>

                            <label>
                                Cuisine Type
                                <input
                                    type="text"
                                    value={editingKitchen.cuisineType}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        cuisineType: event.target.value
                                    })}
                                />
                            </label>

                            <label>
                                Payment Options
                                <input
                                    type="text"
                                    value={editingKitchen.paymentOptions}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        paymentOptions: event.target.value
                                    })}
                                />
                            </label>

                            <label>
                                Special Options
                                <input
                                    type="text"
                                    value={editingKitchen.specialOptions}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        specialOptions: event.target.value
                                    })}
                                />
                            </label>

                            <label>
                                Contact Info
                                <input
                                    type="text"
                                    value={editingKitchen.contactInfo}
                                    onChange={(event) => setEditingKitchen({
                                        ...editingKitchen,
                                        contactInfo: event.target.value
                                    })}
                                />
                            </label>

                            <button type="submit">Submit</button>
                        </form>
                    </Modal>
                )}
            </div>
            <button className={styles.button} onClick={() => navigate('/restaurant/create')}>
                Create a restaurant
            </button>
            <Footer/>
        </div>
    );
};

export default AdminKitchen;
