import ContentBlock from '@/components/content-block';
import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

export default async function Page() {
  return (
    <main>
      <ContentBlock className='h-[60vh] mt-20 flex items-center justify-center'>
        <LogoutLink>
          <Button>Log out</Button>
        </LogoutLink>
      </ContentBlock>
    </main>
  );
}
