import { Stack } from '../../assets/icons';
import styles from './logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logo}>
      <span><Stack size={24} /></span>
      <span>Stock Flow</span>
    </div>
  )
}
