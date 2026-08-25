import { useState, type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  List,
  Search,
  Target,
  MessageCircle,
  Tag,
  Wallet,
  Bell,
  LogOut,
  Smartphone,
  Menu,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import { useAuth } from '@/context/AuthContext';
import { useAlerts } from '@/lib/queries';
import { ProfileModal } from '@/components/ProfileModal';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PrivacyToggle } from '@/components/PrivacyToggle';
import { AvoraMark } from '@/components/AvoraMark';
import { AvatarFace } from '@/lib/avatars';
import { Modal, Button } from '@/components/ui';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/transacoes', label: 'Transações', icon: List },
  { to: '/busca', label: 'Busca', icon: Search },
  { to: '/orcamentos', label: 'Orçamentos', icon: Target },
  { to: '/chat', label: 'Chat WhatsApp', icon: MessageCircle },
  { to: '/categorias', label: 'Categorias', icon: Tag },
  { to: '/contas', label: 'Contas', icon: Wallet },
  { to: '/alertas', label: 'Alertas', icon: Bell },
];

function Sidebar({ mobileOpen, onCloseMobile }: { mobileOpen: boolean; onCloseMobile: () => void }) {
  const { user, logout } = useAuth();
  const { data: alerts } = useAlerts();
  const unread = alerts?.filter((a) => !a.read).length ?? 0;
  const initial = user?.name?.charAt(0).toUpperCase() ?? 'U';
  const [profileOpen, setProfileOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  return (
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-40 flex w-full flex-shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out dark:border-slate-800 dark:bg-[#0d1b16] md:static md:z-auto md:w-72 md:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className="flex items-center gap-2.5 px-4 py-5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-avora-deep text-avora-green">
          <AvoraMark className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">Avora</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">hub financeiro</div>
        </div>
        <button
          onClick={onCloseMobile}
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 md:hidden"
          aria-label="Fechar menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-2">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              clsx(
                'relative flex items-center gap-2.5 rounded-lg py-2 pl-3 pr-3 text-sm transition-colors',
                isActive
                  ? 'bg-brand-50 font-medium text-brand dark:bg-avora-green/10 dark:text-avora-mist'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-slate-100',
              )
            }
          >
            {({ isActive }) =>
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-brand dark:bg-avora-green" />
                )}
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {label === 'Alertas' && unread > 0 && (
                  <span className="rounded-full bg-red-500 px-1.5 text-[10px] font-medium text-white">
                    {unread}
                  </span>
                )}
              </>
            }
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-3 dark:border-white/5">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setProfileOpen(true)}
            className="flex flex-1 items-center gap-2.5 overflow-hidden rounded-lg p-1 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
            title="Editar perfil / WhatsApp"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand text-sm font-medium text-white">
              <AvatarFace avatarId={user?.avatarId} size={32} fallback={initial} />
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-1 truncate text-xs font-medium text-slate-700 dark:text-slate-200">
                {user?.name}
                <Smartphone
                  size={11}
                  className={user?.phone ? 'text-brand' : 'text-slate-300 dark:text-slate-600'}
                  aria-label={user?.phone ? 'WhatsApp vinculado' : 'WhatsApp não vinculado'}
                />
              </div>
              <div className="truncate text-[10px] text-slate-400 dark:text-slate-500">{user?.email}</div>
            </div>
          </button>
          <button
            onClick={() => setLogoutConfirmOpen(true)}
            className="flex-shrink-0 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400"
            aria-label="Sair"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />

      <Modal open={logoutConfirmOpen} onClose={() => setLogoutConfirmOpen(false)} title="Sair da conta">
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Tem certeza que deseja se desconectar?
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setLogoutConfirmOpen(false)}>
              Não
            </Button>
            <Button variant="danger" onClick={logout}>
              Sim
            </Button>
          </div>
        </div>
      </Modal>
    </aside>
  );
}

export function Layout({
  title,
  actions,
  children,
}: {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#0b1120]">
      {mobileNavOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}
      <Sidebar mobileOpen={mobileNavOpen} onCloseMobile={() => setMobileNavOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex flex-col gap-2 border-b border-slate-200 bg-white px-4 py-3 dark:border-white/5 dark:bg-[#0d1b16] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-3.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 md:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>
            <h1 className="truncate text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {actions}
            <div className="flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <PrivacyToggle bare />
              <div className="w-px bg-slate-200 dark:bg-slate-700" />
              <ThemeToggle bare />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
