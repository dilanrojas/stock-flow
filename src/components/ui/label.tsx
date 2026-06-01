import type { ComponentProps } from 'react';
import styles from './label.module.css';

type LabelProps = ComponentProps<'label'> & {
  children: React.ReactNode;
  htmlFor: string;
};

export default function Label({ children, htmlFor, ...props }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={styles.label}
      {...props}
    >
      {children}
    </label>
  );
}
