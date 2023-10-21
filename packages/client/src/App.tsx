import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import {AuthProvider} from './contexts/auth.context';
import {CartProvider} from "./contexts/cart.context";

import CustomerPortal from './pages/Portal/Customer/CustomerPortal';
import DeveloperPortal from "./pages/Portal/Developer/DeveloperPortal";
import DriverPortal from "./pages/Portal/Driver/DriverPortal";
import OwnerPortal from "./pages/Portal/Owner/OwnerPortal";
import SalesPortal from "./pages/Portal/Sales/SalesPortal";
import TechnicalPortal from "./pages/Portal/Technical/TechnicalPortal";

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import UserSettings from "./pages/Settings/User/UserSettings";

import Catalog from './pages/Catalog/Catalog';

import AdminKitchen from "./pages/Kitchens/AdminKitchen/AdminKitchen";
import CreateKitchen from "./pages/Kitchens/CreateKitchen/CreateKitchen";

import AdminMenu from "./pages/Menus/AdminMenu/AdminMenu";
import CreateMenu from "./pages/Menus/CreateMenu/CreateMenu";

import CreateArticle from "./pages/Articles/CreateArticle/CreateArticle";
import AdminArticle from "./pages/Articles/AdminArticle/AdminArticle";

import Page404 from './pages/404/404';

const App: React.FC = () => (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <Routes>

                        <Route path="/" element={<Navigate to="/customer" replace/>}/>

                        <Route path="customer" element={<CustomerPortal/>}/>
                        <Route path="developer" element={<DeveloperPortal/>}/>
                        <Route path="driver" element={<DriverPortal/>}/>
                        <Route path="owner" element={<OwnerPortal/>}/>
                        <Route path="sales" element={<SalesPortal/>}/>
                        <Route path="technical" element={<TechnicalPortal/>}/>

                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="settings" element={<UserSettings/>}/>

                        <Route path="catalog" element={<Catalog/>}/>

                        <Route path="restaurant/admin" element={<AdminKitchen/>}/>
                        <Route path="restaurant/create" element={<CreateKitchen/>}/>

                        <Route path="menus/admin" element={<AdminMenu/>}/>
                        <Route path="menus/create" element={<CreateMenu/>}/>

                        <Route path="articles/admin" element={<AdminArticle/>}/>
                        <Route path="articles/create" element={<CreateArticle/>}/>

                        <Route path="*" element={<Page404/>}/>

                    </Routes>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );

export default App;