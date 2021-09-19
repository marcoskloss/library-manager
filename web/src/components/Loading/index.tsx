import styles from './styles.module.css';

export function Loading() {
  return (
    <div className={styles.container}>
      <span className={styles.text}>
        Loading
      </span>
    </div>
  );
}