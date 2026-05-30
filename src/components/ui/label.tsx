import type { ComponentProps } from "react"

export type LabelProps = ComponentProps<'label'>;

import styles from './label.module.css';

export default function Label({ ...props }: LabelProps) {
  return (
    <label {...props} className={styles.label} />
  )
}
