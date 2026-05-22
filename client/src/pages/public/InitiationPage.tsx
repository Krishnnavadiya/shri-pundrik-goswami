import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { publicApi } from '@/services/publicApi';
import { extractErrorMessage } from '@/services/api';

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(5, 'Please enter a contact number'),
  dob: z.string().optional(),
  address: z.string().optional(),
  message: z.string().max(2000).optional(),
  programTitle: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm your consent to submit' }),
  }),
});

type FormValues = z.infer<typeof schema>;

const InitiationPage = (): JSX.Element => {
  const [submitted, setSubmitted] = useState(false);
  const { data: pageData } = useQuery({
    queryKey: ['page', 'initiation'],
    queryFn: () => publicApi.getPage('initiation'),
    retry: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { programTitle: 'Initiation / Spiritual Guidance' },
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    try {
      await publicApi.submitRegistration(data);
      toast.success('Thank you for your registration.');
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  const defaultBody = `
    <p>Initiation marks a sacred turning in the life of a sadhaka — a formal acceptance into a
    lineage of teachers and a deeper commitment to spiritual discipline.</p>
    <p>Those who wish to seek initiation or personal spiritual guidance from Shri Pundrik Goswami
    may use the form below. Each request is reviewed personally; our team will respond with the
    next steps.</p>
    <h3>What to bring</h3>
    <ul>
      <li>A clean, ironed cloth or simple devotional dress</li>
      <li>A flower offering</li>
      <li>An open heart and willingness to follow the practices</li>
    </ul>
  `;

  return (
    <>
      <Seo
        title="Initiation & Spiritual Guidance"
        description="Begin the path of bhakti through initiation and personal guidance from Shri Pundrik Goswami."
      />
      <PageHero
        eyebrow="Spiritual Guidance"
        title={pageData?.title || 'Initiation & Guidance'}
        subtitle={pageData?.subtitle || 'A sacred beginning on the path of devotion'}
      />
      <section className="py-16 bg-cream-50">
        <div className="container-narrow grid lg:grid-cols-2 gap-12">
          <div
            className="prose-bhakti font-serif text-lg"
            dangerouslySetInnerHTML={{ __html: pageData?.body || defaultBody }}
          />

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-soft border border-cream-200">
            <h2 className="font-display text-2xl text-saffron-900 mb-2">Registration Form</h2>
            <p className="text-sm text-stone-600 mb-6">
              Please share your details below. All requests are reviewed personally.
            </p>

            {submitted ? (
              <div className="bg-saffron-50 border border-saffron-200 text-saffron-900 p-6 rounded-md text-center">
                <p className="font-display text-lg mb-1">Hare Krishna!</p>
                <p className="text-sm">
                  Your registration has been received. We will respond to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Full name *"
                  {...register('name')}
                  error={errors.name?.message}
                  placeholder="Your full name"
                />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Email *"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    placeholder="you@example.com"
                  />
                  <Input
                    label="Phone *"
                    {...register('phone')}
                    error={errors.phone?.message}
                    placeholder="+91 00000 00000"
                  />
                </div>
                <Input
                  label="Date of birth"
                  type="date"
                  {...register('dob')}
                  error={errors.dob?.message}
                />
                <Textarea
                  label="Address"
                  rows={2}
                  {...register('address')}
                  placeholder="City, state, country"
                />
                <Textarea
                  label="Your background and aspiration"
                  rows={4}
                  {...register('message')}
                  placeholder="Briefly share your spiritual background and what draws you to seek initiation."
                />

                <label className="flex items-start gap-3 text-sm text-stone-700">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className="mt-1 h-4 w-4 text-saffron-700 focus:ring-saffron-500"
                  />
                  <span>
                    I consent to my information being stored and used to respond to my inquiry.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-maroon-700">{errors.consent.message}</p>
                )}

                <Button type="submit" disabled={isSubmitting} fullWidth size="lg">
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default InitiationPage;
