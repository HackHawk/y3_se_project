import { Skeleton } from "@nextui-org/react";
import { Card } from "@nextui-org/react";

const CardSkeleton = () => {
  return (
    <Card className="max-w-6xl space-y-5 p-4 mb-5" radius="lg">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-24 h-32">
          <div className="h-32 w-24 bg-default-300 rounded-lg"></div>
        </Skeleton>
        <div className="flex-1 space-y-2">
          <Skeleton className="h-10">
            <div className="h-10 bg-default-200 rounded-lg"></div>
          </Skeleton>
          <Skeleton className="h-10">
            <div className="h-10 bg-default-200 rounded-lg"></div>
          </Skeleton>
          <Skeleton className="h-10">
            <div className="h-10 bg-default-300 rounded-lg"></div>
          </Skeleton>
        </div>
      </div>
    </Card>
  );
};

export default CardSkeleton;
