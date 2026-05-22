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
import type { Article } from '@/types';

const emptyForm = {
  title: '',
  slug: '',
  summary: '',
  body: '',
  category: '',
  tags: '',
  language: 'en',
  heroImage: '',
  authorName: 'Shri Pundrik Goswami',
  status: 'published' as 'draft' | 'published',
};

type FormState = typeof emptyForm;

const AdminArticlesPage = (): JSX.Element => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Article | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'articles'],
    queryFn: () => adminApi.listArticles({ limit: 100 }),
  });

  const closeModal = (): void => {
    setOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const openCreate = (): void => {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  };

  const openEdit = (article: Article): void => {
    setEditing(article);
    setForm({
      title: article.title,
      slug: article.slug,
      summary: article.summary || '',
      body: article.body,
      category: article.category || '',
      tags: (article.tags || []).join(', '),
      language: article.language,
      heroImage: article.heroImage || '',
      authorName: article.authorName || '',
      status: article.status,
    });
    setOpen(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      const payload = {
        ...form,
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (editing) {
        await adminApi.updateArticle(editing._id, payload);
      } else {
        await adminApi.createArticle(payload);
      }
    },
    onSuccess: () => {
      toast.success(editing ? 'Article updated' : 'Article created');
      qc.invalidateQueries({ queryKey: ['admin', 'articles'] });
      closeModal();
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteArticle(id),
    onSuccess: () => {
      toast.success('Article deleted');
      qc.invalidateQueries({ queryKey: ['admin', 'articles'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const articles = (data?.data || []) as Article[];

  return (
    <div>
      <AdminPageHeader
        title="Articles"
        subtitle="Create and manage published articles."
        action={
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4" /> New Article
          </Button>
        }
      />

      <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
        {isLoading ? (
          <Loader />
        ) : articles.length === 0 ? (
          <p className="p-10 text-center text-stone-500 text-sm">No articles yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-stone-50 text-stone-600 text-xs uppercase tracking-widest">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Published</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {articles.map((article) => (
                <tr key={article._id} className="hover:bg-stone-50">
                  <td className="p-3">
                    <p className="font-medium text-stone-800">{article.title}</p>
                    <p className="text-xs text-stone-500">/articles/{article.slug}</p>
                  </td>
                  <td className="p-3 text-stone-600">{article.category || '—'}</td>
                  <td className="p-3">
                    <StatusBadge status={article.status} />
                  </td>
                  <td className="p-3 text-stone-600">{formatDate(article.publishedAt)}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(article)}
                      className="inline-flex items-center gap-1 text-sm text-saffron-700 hover:text-saffron-900"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Delete this article?')) deleteMutation.mutate(article._id);
                      }}
                      className="inline-flex items-center gap-1 text-sm text-maroon-700 hover:text-maroon-900"
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

      <Modal open={open} onClose={closeModal} title={editing ? 'Edit Article' : 'New Article'} size="xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate();
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
              placeholder="lowercase-with-hyphens"
            />
            <Input
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <Input
            label="Tags (comma separated)"
            value={form.tags}
            onChange={(e) => setForm({ ...form, tags: e.target.value })}
          />
          <Input
            label="Hero image URL"
            value={form.heroImage}
            onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
          />
          <Textarea
            label="Summary"
            rows={2}
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
          />
          <Textarea
            label="Body (HTML allowed)"
            rows={10}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Author"
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
            />
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
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? 'Saving...' : editing ? 'Save changes' : 'Create article'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminArticlesPage;
