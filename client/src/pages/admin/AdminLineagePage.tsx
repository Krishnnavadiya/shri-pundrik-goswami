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
import { Loader } from '@/components/common/Loader';
import type { LineagePerson } from '@/types';

const empty = {
  name: '',
  title: '',
  position: '',
  lineageType: 'primary' as 'primary' | 'branch',
  portrait: '',
  bio: '',
  birthYear: '',
  passingYear: '',
  sortOrder: 0,
  language: 'en',
  status: 'published' as 'draft' | 'published',
};

const AdminLineagePage = (): JSX.Element => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<LineagePerson | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'lineage'],
    queryFn: adminApi.listLineage,
  });

  const close = (): void => {
    setOpen(false);
    setEditing(null);
    setForm(empty);
  };

  const save = useMutation({
    mutationFn: async (): Promise<void> => {
      if (editing) await adminApi.updateLineage(editing._id, form);
      else await adminApi.createLineage(form);
    },
    onSuccess: () => {
      toast.success(editing ? 'Lineage entry updated' : 'Lineage entry created');
      qc.invalidateQueries({ queryKey: ['admin', 'lineage'] });
      close();
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminApi.deleteLineage(id),
    onSuccess: () => {
      toast.success('Entry deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'lineage'] });
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Lineage / Parampara"
        subtitle="Manage the lineage entries shown on the public Lineage page."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" /> New Entry
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : !data || data.length === 0 ? (
          <p className="p-10 text-center text-stone-500 text-sm">No entries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Order</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((p) => (
                <tr key={p._id} className="hover:bg-stone-50">
                  <td className="p-3 font-medium text-stone-800">{p.name}</td>
                  <td className="p-3 text-stone-600">{p.title || '—'}</td>
                  <td className="p-3 text-stone-600">{p.sortOrder}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditing(p);
                        setForm({
                          name: p.name,
                          title: p.title || '',
                          position: p.position || '',
                          lineageType: p.lineageType,
                          portrait: p.portrait || '',
                          bio: p.bio || '',
                          birthYear: p.birthYear || '',
                          passingYear: p.passingYear || '',
                          sortOrder: p.sortOrder,
                          language: p.language,
                          status: 'published',
                        });
                        setOpen(true);
                      }}
                      className="text-saffron-700 hover:text-saffron-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirm('Delete this entry?') && del.mutate(p._id)}
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

      <Modal open={open} onClose={close} title={editing ? 'Edit Entry' : 'New Entry'} size="lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="space-y-4"
        >
          <Input
            label="Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Input
              label="Position / Role"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Birth year"
              value={form.birthYear}
              onChange={(e) => setForm({ ...form, birthYear: e.target.value })}
            />
            <Input
              label="Passing year"
              value={form.passingYear}
              onChange={(e) => setForm({ ...form, passingYear: e.target.value })}
            />
            <Input
              label="Sort order"
              type="number"
              value={form.sortOrder}
              onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
            />
          </div>
          <Input
            label="Portrait image URL"
            value={form.portrait}
            onChange={(e) => setForm({ ...form, portrait: e.target.value })}
          />
          <Textarea
            label="Bio"
            rows={4}
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
          <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
            <Button type="button" variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" disabled={save.isPending}>
              {save.isPending ? 'Saving...' : editing ? 'Save changes' : 'Create entry'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminLineagePage;
