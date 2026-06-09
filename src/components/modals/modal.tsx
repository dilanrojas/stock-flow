import { Xmark } from '../../assets/icons';
import { useUI } from '../../contexts/ui-context';
import Button from '../ui/button';
import styles from './modal.module.css';

interface Props {
  title: string;
  children: React.ReactNode;
  action: (formData: FormData) => boolean;
}

export default function Modal({ title, children, action }: Props) {
  const { closeModal } = useUI();

  const handleSubmit = (formData: FormData) => {
    if (action(formData)) {
      closeModal();
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <article className={`${styles.modal} wrapper`}>
        <header className={styles.modalHeader}>
          <h1>{title}</h1>
          <button
            type='button'
            className={styles.closeButton}
            onClick={closeModal}
          >
            <span>
              <Xmark size={20} />
            </span>
          </button>
        </header>
        <form
          autoComplete='off'
          action={handleSubmit}
        >
          <div className={styles.modalContent}>{children}</div>
          <footer className={styles.modalFooter}>
            <Button
              type='button'
              variant='secondary'
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button type='submit'>Guardar</Button>
          </footer>
        </form>
      </article>
    </div>
  );
}
