import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/react";

const CardSkeleton = () => {
  return (
    <Card className="space-y-3 p-4 mb-5" radius="lg">
      <Skeleton className="w-full h-72 md:w-48 md:h-72 rounded-lg">
        <div className="h-full md:h-72 w-full md:w-48 bg-default-300 rounded-lg"></div>
      </Skeleton>
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4">
          <div className="h-6 bg-default-200 rounded-lg"></div>
        </Skeleton>
        <Skeleton className="h-6 w-1/2">
          <div className="h-6 bg-default-200 rounded-lg"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

export default CardSkeleton;
