import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppLockProvider, useAppLock } from './AppLockContext';

vi.mock('@/lib/native', () => ({
  biometricsAvailable: vi.fn().mockResolvedValue(false),
  authenticateBiometric: vi.fn().mockResolvedValue(false),
}));

function Harness() {
  const { pinEnabled, locked, unlock, enablePin, disablePin, lock } = useAppLock();
  return (
    <div>
      <span data-testid="pinEnabled">{String(pinEnabled)}</span>
      <span data-testid="locked">{String(locked)}</span>
      <button onClick={() => enablePin('1234')}>enable</button>
      <button onClick={() => disablePin()}>disable</button>
      <button onClick={() => lock()}>lock</button>
      <button data-testid="unlock-correct" onClick={() => unlock('1234')}>unlock-correct</button>
      <button data-testid="unlock-wrong" onClick={() => unlock('0000')}>unlock-wrong</button>
    </div>
  );
}

function renderHarness() {
  return render(
    <AppLockProvider>
      <Harness />
    </AppLockProvider>,
  );
}

describe('AppLockContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('começa sem PIN habilitado e destravado', () => {
    renderHarness();
    expect(screen.getByTestId('pinEnabled')).toHaveTextContent('false');
    expect(screen.getByTestId('locked')).toHaveTextContent('false');
  });

  it('habilita o PIN, tranca e destranca com o PIN correto', async () => {
    const user = userEvent.setup();
    renderHarness();

    await user.click(screen.getByText('enable'));
    expect(screen.getByTestId('pinEnabled')).toHaveTextContent('true');
    expect(localStorage.getItem('fincontrol_pin')).not.toBeNull();

    await user.click(screen.getByText('lock'));
    expect(screen.getByTestId('locked')).toHaveTextContent('true');

    await user.click(screen.getByTestId('unlock-correct'));
    expect(screen.getByTestId('locked')).toHaveTextContent('false');
  });

  it('rejeita PIN incorreto e mantém a tela travada', async () => {
    const user = userEvent.setup();
    renderHarness();

    await user.click(screen.getByText('enable'));
    await user.click(screen.getByText('lock'));
    await user.click(screen.getByTestId('unlock-wrong'));

    expect(screen.getByTestId('locked')).toHaveTextContent('true');
  });

  it('desabilita o PIN e destranca, removendo o hash salvo', async () => {
    const user = userEvent.setup();
    renderHarness();

    await user.click(screen.getByText('enable'));
    await user.click(screen.getByText('lock'));
    await user.click(screen.getByText('disable'));

    expect(screen.getByTestId('pinEnabled')).toHaveTextContent('false');
    expect(screen.getByTestId('locked')).toHaveTextContent('false');
    expect(localStorage.getItem('fincontrol_pin')).toBeNull();
  });

  it('reabre travado quando já existe um PIN salvo (comportamento tipo app de banco)', async () => {
    const user = userEvent.setup();
    const { unmount } = renderHarness();
    await user.click(screen.getByText('enable'));
    unmount();

    renderHarness();
    expect(screen.getByTestId('pinEnabled')).toHaveTextContent('true');
    expect(screen.getByTestId('locked')).toHaveTextContent('true');
  });
});
