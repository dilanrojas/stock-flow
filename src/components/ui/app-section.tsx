export default function AppSection({ children }: { children: React.ReactNode }) {
  return <section className='flex flex-col gap-6 p-6 h-screen overflow-auto'>{children}</section>;
}
