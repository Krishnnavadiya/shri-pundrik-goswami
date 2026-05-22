import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { publicApi } from '@/services/publicApi';
import { extractErrorMessage } from '@/services/api';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5, 'Please share a brief message'),
  routeTo: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const email = import.meta.env.VITE_CONTACT_EMAIL || 'info@example.com';
const phone = import.meta.env.VITE_CONTACT_PHONE || '+91-00000-00000';

const ContactPage = (): JSX.Element => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues): Promise<void> => {
    try {
      await publicApi.submitContact(data);
      toast.success('Your message has been sent.');
      setSubmitted(true);
      reset();
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  return (
    <>
      <Seo title="Contact" description="Get in touch with Shri Pundrik Goswami and the team." />
      <PageHero
        eyebrow="Connect"
        title="Get in Touch"
        subtitle="For inquiries, program invitations, or seva support — we would love to hear from you."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-wide grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-cream-200 shadow-soft">
              <MapPin className="w-6 h-6 text-saffron-700 mb-3" />
              <h3 className="font-display text-lg text-saffron-900 mb-1">Visit Us</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Shri Pundrik Goswami Temple
                <br />
                Address line one
                <br />
                City, State, Country
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-saffron-700 hover:underline inline-flex items-center gap-1 mt-2"
              >
                Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg border border-cream-200 shadow-soft">
              <Phone className="w-6 h-6 text-saffron-700 mb-3" />
              <h3 className="font-display text-lg text-saffron-900 mb-1">Phone / WhatsApp</h3>
              <a href={`tel:${phone}`} className="text-sm text-stone-700 hover:text-saffron-700">
                {phone}
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg border border-cream-200 shadow-soft">
              <Mail className="w-6 h-6 text-saffron-700 mb-3" />
              <h3 className="font-display text-lg text-saffron-900 mb-1">Email</h3>
              <a href={`mailto:${email}`} className="text-sm text-stone-700 hover:text-saffron-700">
                {email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-lg border border-cream-200 shadow-soft">
            <h2 className="font-display text-2xl text-saffron-900 mb-2">Send a Message</h2>
            <p className="text-sm text-stone-600 mb-6">
              We respond personally to every inquiry. Please share a few details.
            </p>

            {submitted ? (
              <div className="bg-saffron-50 border border-saffron-200 text-saffron-900 p-6 rounded-md text-center">
                <p className="font-display text-lg mb-1">Hare Krishna!</p>
                <p className="text-sm">Your message has been received. We will reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Name *"
                    {...register('name')}
                    error={errors.name?.message}
                  />
                  <Input
                    label="Email *"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />
                  <Input label="Subject" {...register('subject')} />
                </div>
                <Textarea
                  label="Message *"
                  rows={6}
                  {...register('message')}
                  error={errors.message?.message}
                />
                <Button type="submit" disabled={isSubmitting} size="lg">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
