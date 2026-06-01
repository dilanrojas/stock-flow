import { useNavigate } from 'react-router-dom';
import { ArrowOut } from '../../assets/icons';
import styles from './logout-button.module.css';

export default function LogoutButton() {
  const navigate = useNavigate();

  return (
    <button
      type='button'
      data-aria='caution'
      className={styles.logout}
      onClick={() => navigate('/')}
    >
      <span>
        <ArrowOut stroke='2' />
      </span>
      <span>Log Out</span>
    </button>
  );
}
