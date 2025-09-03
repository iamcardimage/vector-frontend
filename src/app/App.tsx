import { AppRouter } from './providers/router';

export const App: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <AppRouter />
      </div>
    </>
  );
};
