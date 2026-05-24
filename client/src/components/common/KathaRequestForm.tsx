import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { publicApi } from '@/services/publicApi';
import { extractErrorMessage } from '@/services/api';
import { CompactContact } from '@/components/common/SocialCTAs';
import type { KathaProgramType } from '@/types';

const programTypes: KathaProgramType[] = [
  'Katha',
  'Pravachan',
  'Sankirtan',
  'Spiritual Gathering',
  'Online Session',
  'Other',
];

const schema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  whatsappNumber: z.string().optional(),
  email: z
    .string()
    .email('Please enter a valid email')
    .optional()
    .or(z.literal('')),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  organizationName: z.string().optional(),
  programType: z.enum([
    'Katha',
    'Pravachan',
    'Sankirtan',
    'Spiritual Gathering',
    'Online Session',
    'Other',
  ]),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  alternateDate: z.string().optional(),
  expectedAttendees: z
    .string()
    .optional()
    .refine((v) => !v || /^\d+$/.test(v), { message: 'Enter a valid number' }),
  venueAddress: z.string().min(3, 'Venue address is required'),
  message: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({
      message: 'Please confirm that you understand this is a request only',
    }),
  }),
});

type FormValues = z.infer<typeof schema>;

const SUCCESS_MESSAGE =
  'Thank you. Your Katha request has been submitted successfully. The official team will contact you soon.';

interface KathaRequestFormProps {
  showContactHint?: boolean;
}

export const KathaRequestForm = ({ showContactHint = true }: KathaRequestFormProps): JSX.Element => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { programType: 'Katha' },
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    try {
      const res = await publicApi.submitKathaRequest({
        ...data,
        email: data.email || undefined,
        whatsappNumber: data.whatsappNumber || undefined,
        organizationName: data.organizationName || undefined,
        alternateDate: data.alternateDate || undefined,
        message: data.message || undefined,
        expectedAttendees: data.expectedAttendees ? Number(data.expectedAttendees) : undefined,
        consent: true,
      });
      toast.success(res.message || SUCCESS_MESSAGE);
      setSubmitted(true);
      reset({ programType: 'Katha' });
    } catch (err) {
      toast.error(extractErrorMessage(err));
    }
  };

  if (submitted) {
    return (
      <div className="bg-saffron-50 border border-saffron-200 text-saffron-900 p-8 rounded-lg text-center">
        <p className="font-display text-xl mb-2">Hare Krishna!</p>
        <p className="font-serif text-base leading-relaxed">{SUCCESS_MESSAGE}</p>
        <Button variant="secondary" className="mt-6" onClick={() => setSubmitted(false)}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <div>
      {showContactHint && (
        <div className="mb-6 pb-6 border-b border-cream-200">
          <p className="text-sm text-stone-600 mb-3">
            For urgent inquiries you may also reach the official team directly:
          </p>
          <CompactContact />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="Full Name *" {...register('fullName')} error={errors.fullName?.message} />
          <Input
            label="Phone Number *"
            type="tel"
            {...register('phoneNumber')}
            error={errors.phoneNumber?.message}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="WhatsApp Number"
            type="tel"
            {...register('whatsappNumber')}
            error={errors.whatsappNumber?.message}
          />
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input label="City *" {...register('city')} error={errors.city?.message} />
          <Input label="Country *" {...register('country')} error={errors.country?.message} />
        </div>

        <Input
          label="Organization / Mandal / Temple Name"
          {...register('organizationName')}
          error={errors.organizationName?.message}
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="w-full">
            <label htmlFor="programType" className="block text-sm font-medium text-stone-700 mb-1.5">
              Program Type *
            </label>
            <select
              id="programType"
              className="input w-full"
              {...register('programType')}
            >
              {programTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.programType && (
              <p className="mt-1 text-xs text-maroon-700">{errors.programType.message}</p>
            )}
          </div>
          <Input
            label="Expected Number of Attendees"
            type="number"
            min={0}
            {...register('expectedAttendees')}
            error={errors.expectedAttendees?.message}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Preferred Date *"
            type="date"
            {...register('preferredDate')}
            error={errors.preferredDate?.message}
          />
          <Input
            label="Alternate Date"
            type="date"
            {...register('alternateDate')}
            error={errors.alternateDate?.message}
          />
        </div>

        <Textarea
          label="Venue Address *"
          rows={3}
          {...register('venueAddress')}
          error={errors.venueAddress?.message}
        />

        <Textarea
          label="Additional Message"
          rows={4}
          {...register('message')}
          error={errors.message?.message}
        />

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-1 rounded border-stone-300 text-saffron-700 focus:ring-saffron-500"
            {...register('consent')}
          />
          <span className="text-sm text-stone-700 leading-relaxed">
            I understand that this is a request only and confirmation will be provided by the
            official team. *
          </span>
        </label>
        {errors.consent && <p className="text-xs text-maroon-700 -mt-2">{errors.consent.message}</p>}

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Katha Request'}
        </Button>
      </form>
    </div>
  );
};
