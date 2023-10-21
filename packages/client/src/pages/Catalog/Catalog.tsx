import React, {useState, useEffect} from 'react';
import KitchenCatalog from '../../components/KitchenCatalog/KitchenCatalog';
import MenuCatalog from '../../components/MenuCatalog/MenuCatalog';
import {getKitchens} from '../../services/kitchens';
import {Kitchen as KitchenType} from '../../types/kitchen';

import './Catalog.module.css';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {User} from "../../types/user";
import {useAuth} from "../../contexts/auth.context";
import {useNavigate} from "react-router-dom";

const Catalog: React.FC = () => {
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

    const [kitchens, setKitchens] = useState<KitchenType[]>([]);

    useEffect(() => {
        getKitchens().then(setKitchens);
    }, []);

    return (
        <div>
            <Header user={user as unknown as User}/>
            <div className="catalogue-container">
                {kitchens.map(kitchen => (
                    <div key={kitchen.id}>
                        <KitchenCatalog kitchen={kitchen}/>
                        <MenuCatalog kitchenId={kitchen.id} onAddToCart={() => {
                        }}/>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    );
};

export default Catalog;