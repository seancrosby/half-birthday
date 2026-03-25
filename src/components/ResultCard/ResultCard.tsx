import React from 'react';
import styles from './ResultCard.module.css';

interface ResultCardProps {
  title: string;
  value: string | null | undefined;
  detail?: string | null;
  tooltip: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, value, detail, tooltip }) => {
  return (
    <div className={styles.resultCard}>
      <h3>{title}</h3>
      <p className={styles.resultValue} data-testid={`${title.toLowerCase()}-value`}>
        {value}
      </p>
      {detail && (
        <p className={styles.resultDetail} data-testid={`${title.toLowerCase()}-detail`}>
          {detail}
        </p>
      )}
      <span className={styles.tooltip}>{tooltip}</span>
    </div>
  );
};
