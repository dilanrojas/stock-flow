type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger' | 'caution';

export interface ButtonCustomProps {
  variant?: ButtonVariant;
  disabled?: boolean;
}
