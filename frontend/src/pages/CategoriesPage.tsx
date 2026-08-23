import { useState, type FormEvent } from 'react';
import { Plus, Trash2, Palette } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Card, Button, Badge, Spinner, Modal, Field, Input } from '@/components/ui';
import { Money } from '@/components/Money';
import { categoryIcon } from '@/lib/icons';
import { apiError } from '@/lib/api';
import { useCategories, useCreateCategory, useDeleteCategory } from '@/lib/queries';

// Paleta ampliada: tons financeiros (verde de crescimento, dourado de patrimônio,
// azul-marinho e teal de confiança/bancos, vermelho de alerta de gasto) combinados
// com cores mais neutras/variadas para qualquer pessoa achar a sua favorita.
const COLORS = [
  '#16a34a', // verde — crescimento/dinheiro
  '#0f766e', // teal — estabilidade
  '#2563eb', // azul — confiança/bancos
  '#1e3a8a', // azul-marinho
  '#7c3aed', // roxo
  '#db2777', // pink
  '#f59e0b', // âmbar — patrimônio
  '#ca8a04', // dourado
  '#dc2626', // vermelho — alerta de gasto
  '#0891b2', // ciano
  '#65a30d', // verde-oliva
  '#4338ca', // índigo
  '#78716c', // marrom/pedra
  '#6b7280', // cinza neutro
];

function NewCategoryModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const create = useCreateCategory();
  const [form, setForm] = useState({ name: '', type: 'EXPENSE', color: COLORS[0], monthlyLimit: '' });
  const [error, setError] = useState('');
  const isPresetColor = COLORS.includes(form.color);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await create.mutateAsync({
        name: form.name,
        type: form.type,
        color: form.color,
        monthlyLimit: form.monthlyLimit ? Number(form.monthlyLimit.replace(',', '.')) : undefined,
      });
      onClose();
      setForm({ name: '', type: 'EXPENSE', color: COLORS[0], monthlyLimit: '' });
    } catch (err) {
      setError(apiError(err));
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Nova categoria">
      <form onSubmit={submit} className="space-y-3">
        <Field label="Nome">
          <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tipo">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-brand dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="EXPENSE">Despesa</option>
              <option value="INCOME">Receita</option>
            </select>
          </Field>
          <Field label="Limite mensal (opcional)">
            <Input
              value={form.monthlyLimit}
              onChange={(e) => setForm({ ...form, monthlyLimit: e.target.value })}
              inputMode="decimal"
              placeholder="0,00"
            />
          </Field>
        </div>
        <Field label="Cor">
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setForm({ ...form, color: c })}
                className={`h-7 w-7 rounded-full ${form.color === c ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900' : ''}`}
                style={{ background: c }}
                aria-label={c}
              />
            ))}
            <div className="relative h-7 w-7">
              <input
                type="color"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                className="absolute inset-0 h-7 w-7 cursor-pointer opacity-0"
                aria-label="Escolher cor personalizada"
                title="Escolher cor personalizada"
              />
              <div
                className={`pointer-events-none flex h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 ${!isPresetColor ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900' : ''}`}
                style={isPresetColor ? undefined : { background: form.color, borderStyle: 'solid' }}
              >
                {isPresetColor && <Palette size={13} className="text-slate-400 dark:text-slate-500" />}
              </div>
            </div>
          </div>
        </Field>
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" loading={create.isPending}>
            Criar
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default function CategoriesPage() {
  const categories = useCategories();
  const del = useDeleteCategory();
  const [modal, setModal] = useState(false);

  return (
    <Layout
      title="Categorias"
      actions={
        <Button variant="primary" onClick={() => setModal(true)}>
          <Plus size={16} /> Nova categoria
        </Button>
      }
    >
      {categories.isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.data?.map((c) => {
            const Icon = categoryIcon(c.name);
            return (
              <Card key={c.id} className="flex items-center gap-3 p-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: `${c.color}1a` }}
                >
                  <Icon size={18} style={{ color: c.color }} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {c.name}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <Badge color={c.type === 'INCOME' ? '#16a34a' : '#64748b'}>
                      {c.type === 'INCOME' ? 'Receita' : 'Despesa'}
                    </Badge>
                    {c.monthlyLimit != null && (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        limite <Money value={c.monthlyLimit} />
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => del.mutate(c.id)}
                  className="text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400"
                  aria-label="Excluir"
                >
                  <Trash2 size={15} />
                </button>
              </Card>
            );
          })}
        </div>
      )}
      <NewCategoryModal open={modal} onClose={() => setModal(false)} />
    </Layout>
  );
}
