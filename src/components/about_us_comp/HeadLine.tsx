import React from 'react';
import { useTranslations } from 'next-intl';

interface GridImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  className: string;
}

const Headline: React.FC = () => {
  const t = useTranslations('AboutUs');

  const gridImagesData: GridImage[] = [
    {
      id: 1,
      src: '/path/to/top-left-img.jpg',
      alt: t('teamGrid.0.alt'),
      title: t('teamGrid.0.title'),
      className: 'col-start-1 col-end-3 row-start-1 row-end-3',
    },
    {
      id: 2,
      src: '/path/to/top-right-img.jpg',
      alt: t('teamGrid.1.alt'),
      title: t('teamGrid.1.title'),
      className: 'col-start-3 row-start-1 row-end-3',
    },
    {
      id: 3,
      src: '/path/to/center-img.jpg',
      alt: t('teamGrid.2.alt'),
      title: t('teamGrid.2.title'),
      className: 'col-start-2 row-start-2 z-10',
    },
    {
      id: 4,
      src: '/path/to/bottom-left-img.jpg',
      alt: t('teamGrid.3.alt'),
      title: t('teamGrid.3.title'),
      className: 'col-start-1 row-start-3',
    },
    {
      id: 5,
      src: '/path/to/bottom-right-img.jpg',
      alt: t('teamGrid.4.alt'),
      title: t('teamGrid.4.title'),
      className: 'col-start-2 col-end-4 row-start-3',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-gray-900 p-8 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <header className="relative pt-8 pb-12">
  <span className="absolute left-0 top-0 text-sm font-semibold text-gray-600">
    {t('establishment')}
  </span>
  <h1 className="text-center text-4xl md:text-6xl font-black tracking-tight leading-tight text-gray-900">
    {t('companyName')}
  </h1>
</header>

        {/* Top Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="absolute inset-0 bg-gray-400 rounded-3xl translate-x-4 translate-y-4 -z-0 opacity-50"></div>
            <div className="relative z-10 w-full h-96 bg-gray-200 border-2 border-dashed border-gray-300 rounded-3xl flex items-center justify-center text-gray-400 font-medium">
              <span>{t('imagePlaceholder')}</span>
            </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <p className="font-semibold text-gray-700 text-lg md:text-xl leading-relaxed">
              {t('intro')}
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{t('brandValues.title')}</h2>

              <div className="space-y-5">
                <div>
                  <span className="inline-block bg-white px-5 py-2 text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    {t('brandValues.freshness.title')}
                  </span>
                  <p className="mt-2 text-base font-medium text-gray-600 leading-relaxed">
                    {t('brandValues.freshness.description')}
                  </p>
                </div>

                <div>
                  <span className="inline-block bg-white px-5 py-2 text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    {t('brandValues.balance.title')}
                  </span>
                  <p className="mt-2 text-base font-medium text-gray-600 leading-relaxed">
                    {t('brandValues.balance.description')}
                  </p>
                </div>

                <div>
                  <span className="inline-block bg-white px-5 py-2 text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    {t('brandValues.joy.title')}
                  </span>
                  <p className="mt-2 text-base font-medium text-gray-600 leading-relaxed">
                    {t('brandValues.joy.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider / History Header */}
        <div className="flex items-center justify-center space-x-4 py-10">
          <div className="w-14 h-14 bg-green-600 rounded-full border-3 border-yellow-400 flex items-center justify-center text-sm text-white font-bold shadow-lg">
            {t('history.logoPlaceholder')}
          </div>
          <h2 className="text-4xl font-bold text-gray-900">{t('history.title')}</h2>
        </div>

        {/* Bottom Content Grid with 5-Image Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <span className="text-green-600 text-2xl mt-1">?</span>
              <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                {t('history.p1')}
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-green-600 text-2xl mt-1">?</span>
              <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                {t('history.p2')}
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-green-600 text-2xl mt-1">?</span>
              <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                {t('history.p3')}
              </p>
            </div>
          </div>

          {/* 5-Image Graphic Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-md aspect-square grid grid-cols-3 grid-rows-3 gap-3">
              {gridImagesData.map((img) => {
                const baseClass = "relative overflow-hidden rounded-2xl border border-gray-200 shadow-md group bg-gray-100 transition-all duration-300 hover:shadow-xl";
                return (
                  <div key={img.id} className={`${baseClass} ${img.className}`}>
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-semibold text-center">{img.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Headline;