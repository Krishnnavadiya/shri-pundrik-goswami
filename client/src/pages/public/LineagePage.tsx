import { useQuery } from '@tanstack/react-query';
import { Seo } from '@/components/common/Seo';
import { PageHero } from '@/components/common/PageHero';
import { Loader } from '@/components/common/Loader';
import { publicApi } from '@/services/publicApi';

const LineagePage = (): JSX.Element => {
  const { data, isLoading } = useQuery({
    queryKey: ['lineage'],
    queryFn: publicApi.listLineage,
  });

  return (
    <>
      <Seo title="Lineage / Parampara" description="The unbroken chain of teachers in our tradition." />
      <PageHero
        eyebrow="Parampara"
        title="The Sacred Lineage"
        subtitle="An unbroken chain of teachers reaching back to Shri Chaitanya Mahaprabhu — preserving the inner mood and outer practice of devotion."
      />
      <section className="py-16 bg-cream-50">
        <div className="container-narrow">
          {isLoading ? (
            <Loader label="Loading parampara..." />
          ) : !data || data.length === 0 ? (
            <p className="text-center text-stone-500">Lineage details will be available soon.</p>
          ) : (
            <ol className="relative border-l-2 border-saffron-300 pl-8 space-y-10">
              {data.map((person, idx) => (
                <li key={person._id} className="relative">
                  <span className="absolute -left-[42px] top-1 w-8 h-8 rounded-full bg-saffron-700 text-cream-50 flex items-center justify-center text-sm font-bold ring-4 ring-cream-50">
                    {idx + 1}
                  </span>
                  <div className="flex flex-col sm:flex-row gap-5">
                    {person.portrait && (
                      <img
                        src={person.portrait}
                        alt={person.name}
                        className="w-32 h-32 rounded-lg object-cover bg-cream-100"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-saffron-900">{person.name}</h3>
                      {person.title && (
                        <p className="text-sm uppercase tracking-widest text-gold-700 mt-1">
                          {person.title}
                        </p>
                      )}
                      {(person.birthYear || person.passingYear) && (
                        <p className="text-xs text-stone-500 mt-1">
                          {person.birthYear}
                          {person.birthYear && person.passingYear && ' — '}
                          {person.passingYear}
                        </p>
                      )}
                      {person.bio && (
                        <p className="font-serif text-stone-700 mt-3 leading-relaxed">{person.bio}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
};

export default LineagePage;
