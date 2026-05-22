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
import { formatDate } from '@/utils/format';
import type { EventItem } from '@/types';

const empty = {
  title: '',
  slug: '',
  description: '',
  body: '',
  category: '',
  startDate: '',
  endDate: '',
  location: '',
  image: '',
  registrationUrl: '',
  language: 'en',
  status: 'published' as 'draft' | 'published',
};

type FormState = typeof empty;

const toLocal = (iso?: string): string => (iso ? new Date(iso).toISOString().slice(0, 16) : '');

const AdminEventsPage = (): JSX.Element => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [form, setForm] = useState<FormState>(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'events'],
    queryFn: () => adminApi.listEvents({ limit: 200 }),
  });

  const close = (): void => {
    setOpen(false);
    setEditing(null);
    setForm(empty);
  };

  const save = useMutation({
    mutationFn: async (): Promise<void> => {
      const payload: Partial<EventItem> = {
        ...form,
        startDate: form.startDate ? new Date(form.startDate).toISOString() : '',
        endDate: form.endDate ? new Date(form.endDate).toISOString() : undefined,
      };
      if (editing) await adminApi.updateEvent(editing._id, payload);
      else await adminApi.createEvent(payload);
    },
    onSuccess: () => {
      toast.success(editing ? 'Event updated' : 'Event created');
      qc.invalidateQueries({ queryKey: ['admin', 'events'] });
      close();
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminApi.deleteEvent(id),
    onSuccess: () => {
      toast.success('Event deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'events'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const events = (data?.data || []) as EventItem[];

  return (
    <div>
      <AdminPageHeader
        title="Events"
        subtitle="Manage upcoming sankirtans, festivals, and programs."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" /> New Event
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : events.length === 0 ? (
          <p className="p-10 text-center text-stone-500 text-sm">No events yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Start</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-stone-50">
                  <td className="p-3">
                    <p className="font-medium text-stone-800">{event.title}</p>
                    <p className="text-xs text-stone-500">{event.location}</p>
                  </td>
                  <td className="p-3 text-stone-600">{event.category || '—'}</td>
                  <td className="p-3 text-stone-600">{formatDate(event.startDate)}</td>
                  <td className="p-3">
                    <StatusBadge status={event.status} />
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditing(event);
                        setForm({
                          title: event.title,
                          slug: event.slug,
                          description: event.description || '',
                          body: event.body || '',
                          category: event.category || '',
                          startDate: toLocal(event.startDate),
                          endDate: toLocal(event.endDate),
                          location: event.location || '',
                          image: event.image || '',
                          registrationUrl: event.registrationUrl || '',
                          language: event.language,
                          status: event.status,
                        });
                        setOpen(true);
                      }}
                      className="text-saffron-700 hover:text-saffron-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirm('Delete this event?') && del.mutate(event._id)}
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

      <Modal open={open} onClose={close} title={editing ? 'Edit Event' : 'New Event'} size="xl">
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
              label="Slug (auto if blank)"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
            <Input
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Start date / time *</label>
              <input
                type="datetime-local"
                className="input"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="label">End date / time</label>
              <input
                type="datetime-local"
                className="input"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
              />
            </div>
          </div>
          <Input
            label="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <Textarea
            label="Description"
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <Textarea
            label="Body (HTML allowed)"
            rows={6}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Hero image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <Input
              label="Registration URL"
              value={form.registrationUrl}
              onChange={(e) => setForm({ ...form, registrationUrl: e.target.value })}
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
              {save.isPending ? 'Saving...' : editing ? 'Save changes' : 'Create event'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminEventsPage;
