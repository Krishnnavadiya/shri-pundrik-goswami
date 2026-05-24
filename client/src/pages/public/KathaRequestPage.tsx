import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { KathaRequestForm } from '@/components/common/KathaRequestForm';

const KathaRequestPage = (): JSX.Element => (
  <>
    <Seo
      title="Request Katha by Shri Pundrik Goswami Ji"
      description="Submit a request to invite Shri Pundrik Goswami Ji for Katha, Pravachan, Sankirtan, or a devotional program."
    />
    <PageHero
      eyebrow="Program Invitation"
      title="Request Katha by Shri Pundrik Goswami Ji"
      subtitle="For Katha, Pravachan, Sankirtan, spiritual gatherings, or online sessions — please share your program details and the official team will respond."
      small
    />
    <section className="py-16 bg-cream-50">
      <div className="container-wide grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-cream-200 shadow-soft">
            <h2 className="font-display text-xl text-saffron-900 mb-3">What you can request</h2>
            <ul className="space-y-2 text-sm text-stone-700 font-serif leading-relaxed">
              <li>• Katha and pravachan on devotional scripture</li>
              <li>• Harinam sankirtan and spiritual gatherings</li>
              <li>• Temple, mandal, or community programs</li>
              <li>• Online sessions for devotees worldwide</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-saffron-800 to-maroon-900 text-cream-50 p-6 rounded-lg">
            <p className="font-display text-lg text-gold-300 mb-2">Please note</p>
            <p className="font-serif text-sm leading-relaxed text-cream-100/90">
              This form is a request only. Final confirmation, scheduling, and travel arrangements
              are handled personally by the official team after reviewing your submission.
            </p>
          </div>
        </div>
        <div className="lg:col-span-3 bg-white p-6 sm:p-8 rounded-lg border border-cream-200 shadow-soft">
          <h2 className="font-display text-2xl text-saffron-900 mb-2">Request Form</h2>
          <p className="text-sm text-stone-600 mb-6">
            Fields marked with * are required. We will contact you using the phone or email provided.
          </p>
          <KathaRequestForm />
        </div>
      </div>
    </section>
  </>
);

export default KathaRequestPage;
