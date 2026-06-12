import type { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'> & ButtonCustomProps;

import type { ButtonCustomProps } from '../../../lib/types/button';
import styles from './button.module.css';

export default function Button({ variant = 'primary', disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={styles.button}
      data-variant={variant}
      disabled={disabled}
    ></button>
  );
}
