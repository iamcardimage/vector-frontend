import { Outlet } from 'react-router-dom';
import { TopNav } from '@/widgets/top-nav';
import { Container } from '@/shared/Container/Container';

export const PrivateLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNav />
      <main className="flex-1 py-6">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};