import type { ReactNode, SVGProps } from 'react';

// You can get more icons from: https://heroicons.com/
// Follow the example of the Xmark icon.

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string;
};

const BaseIcon = ({
  size = 18,
  title,
  children,
  ...props
}: IconProps & { children: ReactNode }) => {
  return (
    <svg
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      width={size}
      height={size}
      aria-hidden={true}
      {...props}
    >
      {children}
    </svg>
  );
};

export function Xmark(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18 18 6M6 6l12 12'
      />
    </BaseIcon>
  );
}
