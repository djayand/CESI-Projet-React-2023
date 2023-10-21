import React from 'react';
import { Kitchen as KitchenType } from '../../types/kitchen';

import styles from './KitchenCatalog.module.css';

type KitchenProps = {
    kitchen: KitchenType;
};

const KitchenCatalog: React.FC<KitchenProps> = ({ kitchen }) => {
    return (
        <div className={styles['kitchen-card']}>
            <div className={styles['kitchen-info']}>
                <span className={styles['kitchen-name']}>{kitchen.name}</span>
                <span className={styles['kitchen-type']}>{kitchen.cuisineType}</span>
                <span className={styles['kitchen-hours']}>{kitchen.openingHours.open} - {kitchen.openingHours.close}</span>
            </div>
        </div>
    );
};

export default KitchenCatalog;