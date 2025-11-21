import { BadgeCheck, Clock3, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: BadgeCheck,
    title: 'Premium Quality',
    description: 'Authentic fragrances from world-renowned perfume houses',
  },
  {
    icon: Clock3,
    title: 'Fast Delivery',
    description: 'Express shipping available for your convenience',
  },
  {
    icon: ShieldCheck,
    title: 'Satisfaction Guaranteed',
    description: '30-day return policy for your peace of mind',
  },
];

export default function Features() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white px-6 py-8 text-center shadow-[0_20px_50px_-40px_rgba(0,0,0,0.4)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-48px_rgba(0,0,0,0.45)]"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-black">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
