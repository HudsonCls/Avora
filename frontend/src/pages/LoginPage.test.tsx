import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from './LoginPage';
import { useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

function renderLogin() {
  return render(
    <ThemeProvider>
      <LoginPage />
    </ThemeProvider>,
  );
}

describe('LoginPage', () => {
  const login = vi.fn();
  const register = vi.fn();

  beforeEach(() => {
    login.mockReset();
    register.mockReset();
    vi.mocked(useAuth).mockReturnValue({
      login,
      register,
      logout: vi.fn(),
      user: null,
      loading: false,
      setUser: vi.fn(),
    });
  });

  it('vem preenchida com as credenciais de demo atuais (Avora, não FinControl)', () => {
    renderLogin();
    expect(screen.getByLabelText('E-mail')).toHaveValue('demo@avora.dev');
    expect(screen.getByLabelText('Senha')).toHaveValue('demo1234');
    expect(screen.getByText('Demo: demo@avora.dev / demo1234')).toBeInTheDocument();
  });

  it('faz login com as credenciais informadas', async () => {
    login.mockResolvedValue(undefined);
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByText('Entrar', { selector: 'button[type="submit"]' }));

    await waitFor(() => expect(login).toHaveBeenCalledWith('demo@avora.dev', 'demo1234'));
  });

  it('mostra a mensagem de erro da API quando o login falha', async () => {
    login.mockRejectedValue({
      isAxiosError: true,
      response: { data: { error: { message: 'Credenciais inválidas' } } },
    });
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByText('Entrar', { selector: 'button[type="submit"]' }));

    expect(await screen.findByText('Credenciais inválidas')).toBeInTheDocument();
  });

  it('alterna para "Criar conta" e mostra o campo Nome', async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole('button', { name: 'Criar conta' }));

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
  });
});
