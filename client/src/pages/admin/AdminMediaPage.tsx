import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '@/services/adminApi';
import { extractErrorMessage } from '@/services/api';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Modal } from '@/components/admin/Modal';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Loader } from '@/components/common/Loader';
import type { MediaItem, MediaType } from '@/types';

const empty = {
  title: '',
  type: 'pdf' as MediaType,
  url: '',
  coverImage: '',
  author: 'Shri Pundrik Goswami',
  language: 'en',
  description: '',
  category: '',
  downloadable: true,
  sortOrder: 0,
  status: 'published' as 'draft' | 'published',
};

const AdminMediaPage = (): JSX.Element => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [form, setForm] = useState(empty);
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'media'],
    queryFn: () => adminApi.listMedia({}),
  });

  const close = (): void => {
    setOpen(false);
    setEditing(null);
    setForm(empty);
  };

  const save = useMutation({
    mutationFn: async (): Promise<void> => {
      if (editing) await adminApi.updateMedia(editing._id, form);
      else await adminApi.createMedia(form);
    },
    onSuccess: () => {
      toast.success(editing ? 'Media updated' : 'Media created');
      qc.invalidateQueries({ queryKey: ['admin', 'media'] });
      close();
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const del = useMutation({
    mutationFn: (id: string) => adminApi.deleteMedia(id),
    onSuccess: () => {
      toast.success('Media deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'media'] });
    },
  });

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await adminApi.uploadFile(file);
      setForm((f) => ({ ...f, url: result.url }));
      toast.success('File uploaded');
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Media Library"
        subtitle="Manage books, PDFs, audio, video, and newsletters."
        action={
          <Button onClick={() => setOpen(true)}>
            <Plus className="w-4 h-4" /> New Media
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : !data || data.length === 0 ? (
          <p className="p-10 text-center text-stone-500 text-sm">No media yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.map((item) => (
                <tr key={item._id} className="hover:bg-stone-50">
                  <td className="p-3">
                    <p className="font-medium text-stone-800 line-clamp-1">{item.title}</p>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-saffron-700 hover:underline truncate block max-w-xs"
                      >
                        {item.url}
                      </a>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-xs uppercase">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3 text-stone-600">{item.category || '—'}</td>
                  <td className="p-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditing(item);
                        setForm({
                          title: item.title,
                          type: item.type,
                          url: item.url || '',
                          coverImage: item.coverImage || '',
                          author: item.author || '',
                          language: item.language,
                          description: item.description || '',
                          category: item.category || '',
                          downloadable: item.downloadable,
                          sortOrder: 0,
                          status: item.status,
                        });
                        setOpen(true);
                      }}
                      className="text-saffron-700 hover:text-saffron-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirm('Delete this media item?') && del.mutate(item._id)}
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

      <Modal open={open} onClose={close} title={editing ? 'Edit Media' : 'New Media'} size="lg">
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
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Type *</label>
              <select
                className="input"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as MediaType })}
              >
                <option value="pdf">PDF / Book</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="newsletter">Newsletter</option>
                <option value="image">Image</option>
              </select>
            </div>
            <Input
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <Input
              label="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <Input
            label="URL"
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="https://..."
            hint="Or upload a file below."
          />
          <div className="flex items-center gap-3">
            <input ref={fileInput} type="file" onChange={onFile} className="hidden" />
            <Button
              type="button"
              variant="secondary"
              onClick={() => fileInput.current?.click()}
              disabled={uploading}
            >
              <Upload className="w-4 h-4" /> {uploading ? 'Uploading...' : 'Upload file'}
            </Button>
          </div>
          <Input
            label="Cover image URL"
            value={form.coverImage}
            onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
          />
          <Textarea
            label="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="grid sm:grid-cols-3 gap-4 items-end">
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                checked={form.downloadable}
                onChange={(e) => setForm({ ...form, downloadable: e.target.checked })}
                className="h-4 w-4"
              />
              Allow download
            </label>
            <Input
              label="Language"
              value={form.language}
              onChange={(e) => setForm({ ...form, language: e.target.value })}
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
              {save.isPending ? 'Saving...' : editing ? 'Save changes' : 'Create item'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminMediaPage;
