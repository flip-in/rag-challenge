import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) {
    redirect('/api/auth/login');
  }
  return (
    <>
      <BackgroundPattern />
      <div className='flex flex-col min-h-screen max-w-[1050px] mx-auto px-4'>
        <AppHeader />
        {children}
        {/* <Footer /> */}
      </div>
    </>
  );
}
