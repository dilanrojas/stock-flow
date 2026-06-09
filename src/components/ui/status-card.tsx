import type { StatusCardProps } from '../../../lib/types/status-card';
import styles from './status-card.module.css';

export default function StatusCard({ title, data, icon: Icon, state }: StatusCardProps) {
  return (
    <article
      className={styles.card}
      style={{ '--card-accent': `var(--${state})` } as React.CSSProperties}
    >
      <header className={styles.cardHeader}>
        <h1>{title}</h1>
        <span className={styles.icon}>
          <Icon size={24} />
        </span>
      </header>
      <p className={styles.data}>{data}</p>
    </article>
  );
}
