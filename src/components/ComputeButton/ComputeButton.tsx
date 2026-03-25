import React from 'react';
import styles from './ComputeButton.module.css';

interface ComputeButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export const ComputeButton: React.FC<ComputeButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button className={styles.computeBtn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
