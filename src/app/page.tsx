import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

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
            <RegisterLink>Get Started</RegisterLink>
          </Button>
          <Button asChild variant={'secondary'}>
            <LoginLink>Sign in</LoginLink>
          </Button>
        </div>
      </div>
    </main>
  );
}
