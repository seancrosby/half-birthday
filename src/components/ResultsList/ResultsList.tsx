import React from 'react';
import styles from './ResultsList.module.css';

interface ResultsListProps {
  show: boolean;
  children: React.ReactNode;
}

export const ResultsList: React.FC<ResultsListProps> = ({ show, children }) => {
  return (
    <div className={`${styles.results} ${show ? styles.show : ''}`}>
      {children}
    </div>
  );
};
