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
import type { Project } from '@/types';

const empty = {
  title: '',
  slug: '',
  mission: '',
  body: '',
  activities: '',
  gallery: '',
  heroImage: '',
  ctaLabel: 'Support This Seva',
  ctaUrl: '/contact',
  language: 'en',
  sortOrder: 0,
  status: 'published' as 'draft' | 'published',
};

const AdminProjectsPage = (): JSX.Element => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'projects'],
    queryFn: adminApi.listProjects,
  });

  const close = (): void => {
    setOpen(false);
    setEditing(null);
    setForm(empty);
  };

  const save = useMutation({
    mutationFn: async (): Promise<void> => {
      const payload: Partial<Project> = {
        ...form,
        activities: form.activities.split('\n').map((s) => s.trim()).filter(Boolean),
        gallery: form.gallery.split('\n').map((s) => s.trim()).filter(Boolean),
      };
      if (editing) await adminApi.updateProject(editing._id, payload);
      else await adminApi.createProject(payload);
    },
    onSuccess: () => {
      toast.success(editing ? 'Project updated' : 'Project created');
      qc.invalidateQueries({ queryKey: ['admin', 'projects'] });
      close();
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminApi.deleteProject(id),
    onSuccess: () => {
      toast.success('Project deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'projects'] });
    },
  });

  return (
    <div>
      <AdminPageHeader
        title="Projects"
        subtitle="Devotional and community service projects."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" /> New Project
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : !data || data.length === 0 ? (
          <p className="p-10 text-center text-stone-500 text-sm">No projects yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Slug</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((p) => (
                <tr key={p._id} className="hover:bg-stone-50">
                  <td className="p-3">
                    <p className="font-medium text-stone-800">{p.title}</p>
                    <p className="text-xs text-stone-500 line-clamp-1">{p.mission}</p>
                  </td>
                  <td className="p-3 text-stone-600">/{p.slug}</td>
                  <td className="p-3">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditing(p);
                        setForm({
                          title: p.title,
                          slug: p.slug,
                          mission: p.mission || '',
                          body: p.body || '',
                          activities: (p.activities || []).join('\n'),
                          gallery: (p.gallery || []).join('\n'),
                          heroImage: p.heroImage || '',
                          ctaLabel: p.ctaLabel || '',
                          ctaUrl: p.ctaUrl || '',
                          language: p.language,
                          sortOrder: 0,
                          status: p.status,
                        });
                        setOpen(true);
                      }}
                      className="text-saffron-700 hover:text-saffron-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirm('Delete this project?') && del.mutate(p._id)}
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

      <Modal open={open} onClose={close} title={editing ? 'Edit Project' : 'New Project'} size="xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            save.mutate();
          }}
          className="space-y-4"
        >
          <Input
            label="Title *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
            <Input
              label="Hero image URL"
              value={form.heroImage}
              onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
            />
          </div>
          <Textarea
            label="Mission"
            rows={2}
            value={form.mission}
            onChange={(e) => setForm({ ...form, mission: e.target.value })}
          />
          <Textarea
            label="Body (HTML allowed)"
            rows={6}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <Textarea
              label="Activities (one per line)"
              rows={4}
              value={form.activities}
              onChange={(e) => setForm({ ...form, activities: e.target.value })}
            />
            <Textarea
              label="Gallery image URLs (one per line)"
              rows={4}
              value={form.gallery}
              onChange={(e) => setForm({ ...form, gallery: e.target.value })}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="CTA label"
              value={form.ctaLabel}
              onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })}
            />
            <Input
              label="CTA URL"
              value={form.ctaUrl}
              onChange={(e) => setForm({ ...form, ctaUrl: e.target.value })}
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
              {save.isPending ? 'Saving...' : editing ? 'Save changes' : 'Create project'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminProjectsPage;
