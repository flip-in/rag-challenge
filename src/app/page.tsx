import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='bg-[#5DC9A8] min-h-screen flex flex-col xl:flex-row items-center justify-center gap-10'>
      <div>
        <h1 className='text-5xl font-semibold my-6 max-w-[500px]'>
          Write smarter with{' '}
          <span className='font-extrabold'>an AI assistant</span>. InsightIntel
          gives you the tools to write better articles.
        </h1>
        <p className='text-2xl font-medium max-w-[600px]'>
          Use InsightIntel to use AI to generate writing prompts, citing sources
          in your articles, and more.
        </p>
        <div className='mt-10 space-x-3'>
          <Button asChild>
            <Link href='/app/dashboard'>Get started</Link>
          </Button>
          <Button asChild variant={'secondary'}>
            <Link href={'/login'}>Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
