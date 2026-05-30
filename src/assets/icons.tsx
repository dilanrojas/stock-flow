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
  stroke = '1.5',
  ...props
}: IconProps & { children: ReactNode }) => {
  return (
    <svg
      role='img'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={stroke}
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

export function Stack(props: IconProps) {
  return (
    <BaseIcon {...props} stroke='1.8'>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"
      />
    </BaseIcon>
  )
}

export function ArrowRight(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </BaseIcon>
  )
}

export function Envelope(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </BaseIcon>
  )
}
