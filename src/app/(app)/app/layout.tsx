import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';
import SourceContextProvider from '@/contexts/source-context-provider';
import prisma from '@/lib/db';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <BackgroundPattern />
      <div className='flex flex-col min-h-screen max-w-[1050px] mx-auto px-4'>
        <AppHeader />
        <SourceContextProvider>{children}</SourceContextProvider>
        {/* <Footer /> */}
      </div>
    </>
  );
}
