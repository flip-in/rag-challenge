import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components';

export default function AuthForm({ type }: { type: 'signup' | 'signin' }) {
  return (
    <form className=''>
      <div className='space-y-1'>
        <Label htmlFor='email'>Email</Label>
        <Input id='email' type='email' />
      </div>
      <div className='space-y-1 mb-4 mt-2'>
        <Label htmlFor='password'>Password</Label>
        <Input id='password' type='password' />
      </div>
      {type === 'signup' ? (
        <RegisterLink>
          <Button type='submit'>Sign up</Button>
        </RegisterLink>
      ) : (
        <LoginLink>
          <Button type='submit'>Log in</Button>
        </LoginLink>
      )}
    </form>
  );
}
