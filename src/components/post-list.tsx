import { Post } from '@prisma/client';
import styles from '@/components/ui/dialog.module.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import parse from 'html-react-parser';

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className='bg-white border-b border-light'>
      {posts.map((post) => {
        return (
          <li key={post.id} className='flex w-full'>
            <Dialog>
              <DialogTrigger className='text-left w-full'>
                <PostListItem post={post} />
              </DialogTrigger>

              <DialogContent
                className={cn(
                  'max-h-screen md:max-h-[70vh] scrollbar overflow-y-scroll md:overflow-y-auto max-w-full md:max-w-[70%] ',
                  styles
                )}
              >
                <DialogHeader>
                  <DialogTitle>{post.title}</DialogTitle>
                  <DialogDescription asChild>
                    <p>{post.author}</p>
                  </DialogDescription>
                </DialogHeader>
                <div className={styles.postContent}>
                  {post.content && parse(post.content)}
                </div>
              </DialogContent>
            </Dialog>
          </li>
        );
      })}
    </ul>
  );
}

function PostListItem({ post }: { post: Post }) {
  return (
    <div key={post.id} className=' p-4 border-b border-light hover:bg-zinc-100'>
      <h2 className='text-md'>{post.title}</h2>
      <p className='text-sm'>{post.author}</p>
    </div>
  );
}
