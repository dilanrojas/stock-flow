import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: 'var(--accent)',
        background: 'var(--bg)',
        text: 'var(--text)',
        textSecondary: 'var(--text-secondary)',
        textTertiary: 'var(--text-tertiary)',
        borderInput: 'var(--border-input)',
        white: 'var(--white)',
        black: 'var(--black)',
        lightGray: 'var(--light-gray)',
      },
      borderRadius: {
        sm: 'var(--rounded)',
        md: 'var(--rounded-md)',
        lg: 'var(--rounded-lg)',
      },
    },
  },
} satisfies Config;
