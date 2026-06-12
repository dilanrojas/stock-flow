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
    <BaseIcon
      {...props}
      stroke='1.8'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3'
      />
    </BaseIcon>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
      />
    </BaseIcon>
  );
}

export function Envelope(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
      />
    </BaseIcon>
  );
}

export function Eye(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
      />
    </BaseIcon>
  );
}

export function EyeSlash(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
      />
    </BaseIcon>
  );
}

export function Squares(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'
      />
    </BaseIcon>
  );
}

export function ArchiveBox(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
      />
    </BaseIcon>
  );
}

export function Swatch(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z'
      />
    </BaseIcon>
  );
}

export function Tag(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 6h.008v.008H6V6Z'
      />
    </BaseIcon>
  );
}

export function ShoppingCart(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
      />
    </BaseIcon>
  );
}

export function ArrowsRightLeft(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5'
      />
    </BaseIcon>
  );
}

export function ArrowOut(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15'
      />
    </BaseIcon>
  );
}

export function Plus(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 4.5v15m7.5-7.5h-15'
      />
    </BaseIcon>
  );
}

export function ChartBar(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z'
      />
    </BaseIcon>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.75 19.5 8.25 12l7.5-7.5'
      />
    </BaseIcon>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m8.25 4.5 7.5 7.5-7.5 7.5'
      />
    </BaseIcon>
  );
}

export function ChevronDoubleUp(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m4.5 18.75 7.5-7.5 7.5 7.5'
      />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m4.5 12.75 7.5-7.5 7.5 7.5'
      />
    </BaseIcon>
  );
}

export function ChevronDoubleDown(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5'
      />
    </BaseIcon>
  );
}
