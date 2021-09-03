import { InputHTMLAttributes } from 'react';
import { IFieldError } from '../../data/errors';
import styles from './styles.module.css';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: IFieldError;
  required?: boolean;
}

export function Input({ 
  name, 
  label, 
  error, 
  required = false, 
  ...rest
}: IInputProps) {
  return (
    <div className={styles.inputBox}>
      <label 
        htmlFor={name}
        className={required ? styles.required : ''}
      >
        { label }
      </label>

      <input name={name} id={name} {...rest} />
      { error && <span className={styles.error}>{ error.message }</span> }
    </div>
  );
}
