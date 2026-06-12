export default function AppSkeleton() {
  return (
    <div className='space-y-6 p-6'>
      <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='mb-6 flex items-center justify-between gap-4'>
          <div className='h-8 w-2/5 rounded bg-gray-200 animate-pulse' />
          <div className='h-10 w-28 rounded bg-gray-200 animate-pulse' />
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          {Array.from({ length: 4 }).map((_) => (
            <div
              key={crypto.randomUUID()}
              className='space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4'
            >
              <div className='h-5 w-2/3 rounded bg-gray-200 animate-pulse' />
              <div className='h-10 rounded bg-gray-200 animate-pulse' />
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
        <div className='mb-6 flex flex-col gap-3'>
          <div className='h-6 w-1/3 rounded bg-gray-200 animate-pulse' />
          <div className='h-12 w-full rounded bg-gray-200 animate-pulse' />
        </div>

        <div className='space-y-3'>
          {Array.from({ length: 5 }).map((_) => (
            <div
              key={crypto.randomUUID()}
              className='flex items-center gap-4'
            >
              <div className='h-12 w-12 rounded bg-gray-200 animate-pulse' />
              <div className='flex-1 space-y-2'>
                <div className='h-4 w-1/2 rounded bg-gray-200 animate-pulse' />
                <div className='h-4 w-3/4 rounded bg-gray-200 animate-pulse' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
