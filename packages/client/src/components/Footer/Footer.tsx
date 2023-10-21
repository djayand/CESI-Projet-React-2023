import React from 'react';
import styles from './Footer.module.css';

import { FaFacebook, FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className={styles.container}>
            <div className={styles.logo}>
                © 2023 Ces'Eat
            </div>
            <div className={styles.links}>
            </div>
            <div className={styles.socials}>
                <a href="https://www.facebook.com/porsche/?locale=fr_FR" target="_blank" rel="noreferrer">
                    <FaFacebook className={styles.socialIcon} />
                </a>
                <a href="https://www.instagram.com/porsche/" target="_blank" rel="noreferrer">
                    <FaInstagram className={styles.socialIcon} />
                </a>
                <a href="https://www.tiktok.com/@porsche?lang=fr" target="_blank" rel="noreferrer">
                    <FaTiktok className={styles.socialIcon} />
                </a>
                <a href="https://www.linkedin.com/company/porsche-ag/" target="_blank" rel="noreferrer">
                    <FaLinkedin className={styles.socialIcon} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;