import type { ComponentProps } from "react"

export type ButtonProps = ComponentProps<'button'>;

import styles from './button.module.css';

export default function Button({ ...props }: ButtonProps) {
  return (
    <button {...props} className={styles.button}></button>
  )
}
