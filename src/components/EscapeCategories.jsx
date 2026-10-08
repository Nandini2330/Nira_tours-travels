import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EscapeCategories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'beach',
      title: 'Beach Escape',
      subtitle: 'Turquoise waters & coastal sunsets',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'mountain',
      title: 'Mountain Adventure',
      subtitle: 'Alpine peaks & snow slopes',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'heritage',
      title: 'Royal Heritage',
      subtitle: 'Palaces, forts & ancient culture',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'nature',
      title: 'Nature Retreat',
      subtitle: 'Emerald forests & backwaters',
      image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'luxury',
      title: 'Luxury Escape',
      subtitle: 'Overwater villas & private concierge',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'romance',
      title: 'Romantic Getaway',
      subtitle: 'Scenic retreats for couples',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
    }
  ];

  return (
    <section className="py-16 bg-[#F8F4EC] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#087F8C] uppercase">
              Curated Escapes
            </span>
            <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#174A3A] mt-1">
              How do you want to travel?
            </h2>
          </div>
          <p className="text-slate-600 text-xs font-normal max-w-sm">
            Choose your journey by experience and style.
          </p>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/destinations?category=${cat.id}`)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* IMAGE */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E3327]/85 via-[#0E3327]/20 to-transparent transition-opacity" />

              {/* CONTENT */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end z-10 space-y-1">
                <h3 className="font-sans text-xl font-bold text-white group-hover:text-[#E7A92B] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-200 text-xs font-normal">
                  {cat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
