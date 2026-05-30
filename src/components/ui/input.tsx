import type { ComponentProps } from "react"

export type InputProps = ComponentProps<'input'>;

import styles from './input.module.css';

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className={styles.input}
    />
  )
}
