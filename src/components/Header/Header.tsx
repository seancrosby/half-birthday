import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  logo: string;
  subtitle: string;
}

export const Header: React.FC<HeaderProps> = ({ logo, subtitle }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>{logo}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </header>
  );
};
