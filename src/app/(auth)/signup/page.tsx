import H1 from '@/components/h1';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <H1 className='text-center mb-5'>Sign up</H1>
      <p className='text-center'>
        New registrations for Insight
        <span className='font-semibold'>Intel</span> are currently closed.
      </p>

      <p className='text-center mt-8'>
        <Link href='/' className='font-medium'>
          Back to home
        </Link>
      </p>
      <p className='mt-6 text-sm text-center text-zinc-500'>
        Already have an account?{' '}
        <LoginLink className='font-medium'>Log in</LoginLink>
      </p>
    </main>
  );
}
