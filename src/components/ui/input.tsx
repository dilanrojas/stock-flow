import type { ComponentProps } from 'react';
import type { CustomInputProps } from '../../../lib/types/input';

export type InputProps = ComponentProps<'input'> & CustomInputProps;

import styles from './input.module.css';

export default function Input({ disabled, error, ...props }: InputProps) {
  return (
    <input
      {...props}
      data-disabled={disabled}
      data-error={error}
      className={styles.input}
    />
  );
}
