import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn, Lock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Seo } from '@/components/common/Seo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { extractErrorMessage } from '@/services/api';

const schema = z.object({
  email: z.string().email('Valid email required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type Form = z.infer<typeof schema>;

const AdminLoginPage = (): JSX.Element => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/admin/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Form): Promise<void> => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  return (
    <>
      <Seo title="Admin Login" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-900 to-maroon-900 p-4">
        <div className="w-full max-w-md bg-cream-50 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-saffron-700 text-cream-50 flex items-center justify-center font-display text-3xl font-bold shadow-md">
              ॐ
            </div>
            <h1 className="font-display text-2xl text-saffron-900">Admin Sign In</h1>
            <p className="text-sm text-stone-600 mt-1">Shri Pundrik Goswami · Dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={errors.password?.message}
            />
            <Button type="submit" disabled={isSubmitting} fullWidth size="lg">
              {isSubmitting ? (
                'Signing in...'
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In
                </>
              )}
            </Button>
          </form>

          <p className="text-xs text-stone-500 text-center mt-6 inline-flex items-center justify-center gap-1 w-full">
            <Lock className="w-3 h-3" /> Secure JWT authentication
          </p>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
