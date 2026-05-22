import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import { adminApi } from '@/services/adminApi';
import { extractErrorMessage } from '@/services/api';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const AdminSettingsPage = (): JSX.Element => {
  const { user } = useAuth();
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirm: '' });
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (pw.newPassword !== pw.confirm) {
      toast.error('New password and confirmation do not match');
      return;
    }
    setSaving(true);
    try {
      await adminApi.changePassword(pw.currentPassword, pw.newPassword);
      toast.success('Password updated');
      setPw({ currentPassword: '', newPassword: '', confirm: '' });
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Settings" subtitle="Account and site settings." />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <h2 className="font-display text-lg text-stone-900 mb-3">Account</h2>
          <dl className="text-sm space-y-2">
            <div className="flex justify-between">
              <dt className="text-stone-500">Name</dt>
              <dd className="font-medium">{user?.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Email</dt>
              <dd className="font-medium">{user?.email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-stone-500">Role</dt>
              <dd className="font-medium capitalize">{user?.role?.replace('_', ' ')}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-white p-6 rounded-lg border border-stone-200">
          <h2 className="font-display text-lg text-stone-900 mb-3">Change Password</h2>
          <form onSubmit={onSubmit} className="space-y-3">
            <Input
              label="Current password"
              type="password"
              value={pw.currentPassword}
              onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })}
              required
            />
            <Input
              label="New password"
              type="password"
              value={pw.newPassword}
              onChange={(e) => setPw({ ...pw, newPassword: e.target.value })}
              required
              hint="Minimum 6 characters"
            />
            <Input
              label="Confirm new password"
              type="password"
              value={pw.confirm}
              onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
              required
            />
            <Button type="submit" disabled={saving}>
              {saving ? 'Updating...' : 'Update password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
