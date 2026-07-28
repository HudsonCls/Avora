import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useAppLock } from '@/context/AppLockContext';
import { LockScreen } from '@/components/LockScreen';
import { Spinner } from '@/components/ui';
import LoginPage from '@/pages/LoginPage';
import { Onboarding } from '@/components/Onboarding';
import { lazy, Suspense, type ReactNode } from 'react';

const TermsPage = lazy(() => import('@/pages/LegalPages').then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('@/pages/LegalPages').then((m) => ({ default: m.PrivacyPage })));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const TransactionsPage = lazy(() => import('@/pages/TransactionsPage'));
const SearchPage = lazy(() => import('@/pages/SearchPage'));
const ChatPage = lazy(() => import('@/pages/ChatPage'));
const BudgetsPage = lazy(() => import('@/pages/BudgetsPage'));
const CategoriesPage = lazy(() => import('@/pages/CategoriesPage'));
const AccountsPage = lazy(() => import('@/pages/AccountsPage'));
const AlertsPage = lazy(() => import('@/pages/AlertsPage'));

function PageFallback() {
  return <div className="grid h-screen place-items-center"><Spinner /></div>;
}

function Protected({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <PageFallback />;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  const { user } = useAuth();
  const { locked } = useAppLock();
  return (
    <>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />
          <Route path="/termos" element={<TermsPage />} />
          <Route path="/privacidade" element={<PrivacyPage />} />
          <Route path="/" element={<Protected><DashboardPage /></Protected>} />
          <Route path="/transacoes" element={<Protected><TransactionsPage /></Protected>} />
          <Route path="/busca" element={<Protected><SearchPage /></Protected>} />
          <Route path="/orcamentos" element={<Protected><BudgetsPage /></Protected>} />
          <Route path="/chat" element={<Protected><ChatPage /></Protected>} />
          <Route path="/categorias" element={<Protected><CategoriesPage /></Protected>} />
          <Route path="/contas" element={<Protected><AccountsPage /></Protected>} />
          <Route path="/alertas" element={<Protected><AlertsPage /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      {user && <Onboarding />}
      {user && locked && <LockScreen />}
    </>
  );
}
