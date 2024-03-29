import { cn } from '@/lib/utils';

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        `h-4 w-[550px] rounded-md bg-neutral-400 animate-pulse`,
        className
      )}
    />
  );
}
