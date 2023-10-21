// MenuCatalog.tsx
import React, { useEffect, useState } from 'react';
import { getMenuByKitchenId } from '../../services/menus';
import { getArticlesByIds } from '../../services/articles';
import { Menu as MenuType } from '../../types/menu';
import { Article as ArticleType } from '../../types/article';
import styles from './MenuCatalog.module.css';

type MenuProps = {
    kitchenId: string;
    onAddToCart: (menu: MenuType) => void;
};

const MenuCatalog: React.FC<MenuProps> = ({ kitchenId, onAddToCart }) => {
    const [menus, setMenus] = useState<MenuType[]>([]);
    const [articles, setArticles] = useState<ArticleType[]>([]);

    useEffect(() => {
        getMenuByKitchenId(kitchenId).then(setMenus);
    }, [kitchenId]);

    useEffect(() => {
        const articleIds = menus.flatMap(menu => menu.articleIds);
        getArticlesByIds(articleIds).then(setArticles);
    }, [menus]);

    const getArticleDetails = (id: string) => articles.find(article => article.id === id);

    return (
        <div className={styles['menu-catalog']}>
            {menus.map(menu => {
                const menuArticles = menu.articleIds.map(getArticleDetails).filter(Boolean) as ArticleType[];
                const totalPrice = menuArticles.reduce((sum, article) => sum + Number(article.price), 0);

                return (
                    <div key={menu.id} className={styles['menu-card']}>
                        <span className={styles['menu-name']}>{menu.name}</span>
                        <div className={styles['article-ids']}>
                            <strong className={styles['articles-title']}>Articles:</strong>
                            {menuArticles.map((article, index) => (
                                <div key={index} className={styles['article-info']}>{article.name} - {article.price}€</div>
                            ))}
                        </div>
                        <div className={styles['total-price']}>
                            <strong>Total Price:</strong> {totalPrice.toFixed(2)}€
                        </div>
                        <button className={styles['add-to-cart']} onClick={() => onAddToCart(menu)}>
                            Add to cart
                        </button>
                    </div>
                );
            })}
        </div>
    );
};

export default MenuCatalog;
