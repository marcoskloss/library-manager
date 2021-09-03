import { ButtonHTMLAttributes } from 'react';
import styles from './styles.module.css';

interface IButonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  variant?: 'main' | 'secondary';
}

export function Button({ title, variant = 'main', ...rest }: IButonProps) {
  return (
    <button 
      className={
        `${variant === 'main' ? styles.main : styles.secondary}
        ${styles.button}`
      } 
      {...rest}
    >
      { title }
    </button>
  );
}