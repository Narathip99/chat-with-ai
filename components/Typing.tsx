import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TypingProps {
  typing: boolean;
}

const Typing = ({ typing }: TypingProps) => {
  return (
    <>
      {typing ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-[300px]" />
            <Skeleton className="h-6 w-[400px]" />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Typing;
