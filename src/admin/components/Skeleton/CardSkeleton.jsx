import { Skeleton } from '@nextui-org/react';
import { Card } from '@nextui-org/react';

const CardSkeleton = () => {
  return (
    <Card className='mb-5 space-y-3 p-4' radius='lg'>
      <Skeleton className='h-72 w-full rounded-lg md:h-72 md:w-48'>
        <div className='h-full w-full rounded-lg bg-default-300 md:h-72 md:w-48'></div>
      </Skeleton>
      <div className='space-y-2'>
        <Skeleton className='h-6 w-3/4'>
          <div className='h-6 rounded-lg bg-default-200'></div>
        </Skeleton>
        <Skeleton className='h-6 w-1/2'>
          <div className='h-6 rounded-lg bg-default-200'></div>
        </Skeleton>
      </div>
    </Card>
  );
};

export default CardSkeleton;
