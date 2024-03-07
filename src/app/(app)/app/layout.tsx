import AppHeader from '@/components/app-header';
import BackgroundPattern from '@/components/background-pattern';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <BackgroundPattern />
      <div className='flex flex-col md:min-h-screen max-w-[1250px] mx-auto px-4'>
        <AppHeader />
        {children}
      </div>
    </>
  );
}
