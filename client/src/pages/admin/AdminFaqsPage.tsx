import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '@/services/adminApi';
import { extractErrorMessage } from '@/services/api';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Modal } from '@/components/admin/Modal';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Loader } from '@/components/common/Loader';
import type { Faq } from '@/types';

const empty = {
  question: '',
  answer: '',
  category: '',
  language: 'en',
  sortOrder: 0,
  status: 'published' as 'draft' | 'published',
};

const AdminFaqsPage = (): JSX.Element => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'faqs'],
    queryFn: adminApi.listFaqs,
  });

  const close = (): void => {
    setOpen(false);
    setEditing(null);
    setForm(empty);
  };

  const save = useMutation({
    mutationFn: async (): Promise<void> => {
      if (editing) await adminApi.updateFaq(editing._id, form);
      else await adminApi.createFaq(form);
    },
    onSuccess: () => {
      toast.success(editing ? 'FAQ updated' : 'FAQ created');
      qc.invalidateQueries({ queryKey: ['admin', 'faqs'] });
      close();
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminApi.deleteFaq(id),
    onSuccess: () => {
      toast.success('FAQ deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'faqs'] });
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="FAQs"
        subtitle="Frequently asked questions for the public site."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" /> New FAQ
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : !data || data.length === 0 ? (
          <p className="p-10 text-center text-stone-500 text-sm">No FAQs yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left p-3">Question</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Order</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((faq) => (
                <tr key={faq._id} className="hover:bg-stone-50">
                  <td className="p-3 max-w-md">
                    <p className="font-medium text-stone-800 line-clamp-2">{faq.question}</p>
                  </td>
                  <td className="p-3 text-stone-600">{faq.category || '—'}</td>
                  <td className="p-3 text-stone-600">{faq.sortOrder}</td>
                  <td className="p-3">
                    <StatusBadge status={faq.status} />
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditing(faq);
                        setForm({
                          question: faq.question,
                          answer: faq.answer,
                          category: faq.category || '',
                          language: faq.language,
                          sortOrder: faq.sortOrder,
                          status: faq.status,
                        });
                        setOpen(true);
                      }}
                      className="text-saffron-700 hover:text-saffron-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirm('Delete this FAQ?') && del.mutate(faq._id)}
                      className="text-maroon-700 hover:text-maroon-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={open} onClose={close} title={editing ? 'Edit FAQ' : 'New FAQ'} size="lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="space-y-4"
        >
          <Textarea
            label="Question *"
            rows={2}
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
          />
          <Textarea
            label="Answer * (HTML allowed)"
            rows={6}
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            required
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <Input
              label="Sort order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            />
            <div>
              <label className="label">Status</label>
              <select
                className="input"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as 'draft' | 'published' })}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
            <Button type="button" variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? 'Saving...' : editing ? 'Save changes' : 'Create FAQ'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminFaqsPage;
