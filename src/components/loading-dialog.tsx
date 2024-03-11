import Loading from '@/app/(app)/app/dashboard/article/[id]/loading';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function LoadingDialog() {
  return (
    <Dialog>
      <DialogContent
        className={
          'max-h-[90vh] min-h-[90vh] md:min-h-[65%] md:max-h-[65%] max-w-full md:max-w-[70vw] 2xl:max-w-[50%] scrollbar overflow-y-scroll md:overflow-y-auto '
        }
      >
        <DialogHeader className='mt-2 mb-6 text-left'>
          <DialogTitle>Loading Title</DialogTitle>
          <DialogDescription asChild>
            <p>some text</p>
          </DialogDescription>
        </DialogHeader>
        <Loading />
      </DialogContent>
    </Dialog>
  );
}
