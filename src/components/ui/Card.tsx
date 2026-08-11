'use client';
import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', padding = 'md' }: CardProps) {
  return (
    <div className={`${styles.card} ${styles[padding]} ${className}`}>
      {children}
    </div>
  );
}

export default Card;
