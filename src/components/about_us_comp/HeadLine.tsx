import React from 'react';
import { getImagePath } from './imageAssets';
import type { AboutMessages } from "@/i18n/message-types";

interface GridImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  className: string;
}

const Headline: React.FC<{ messages: AboutMessages["headline"] }> = ({ messages }) => {

  const gridImagesData: GridImage[] = [
    {
      id: 1,
      src: getImagePath('') || '/path/to/top-left-img.jpg',
      alt: messages.grid[0].alt,
      title: messages.grid[0].title,
      className: 'col-start-1 col-end-3 row-start-1 row-end-3',
    },
    {
      id: 2,
      src: getImagePath('') || '/path/to/top-right-img.jpg',
      alt: messages.grid[1].alt,
      title: messages.grid[1].title,
      className: 'col-start-3 row-start-1 row-end-3',
    },
    {
      id: 3,
      src: getImagePath('') || '/path/to/center-img.jpg',
      alt: messages.grid[2].alt,
      title: messages.grid[2].title,
      className: 'col-start-2 row-start-2 z-10',
    },
    {
      id: 4,
      src: getImagePath('') || '/path/to/bottom-left-img.jpg',
      alt: messages.grid[3].alt,
      title: messages.grid[3].title,
      className: 'col-start-1 row-start-3',
    },
    {
      id: 5,
      src: getImagePath('') || '/path/to/bottom-right-img.jpg',
      alt: messages.grid[4].alt,
      title: messages.grid[4].title,
      className: 'col-start-2 col-end-4 row-start-3',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-gray-900 p-4 sm:p-6 md:p-8 lg:p-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
        
        {/* Header Section */}
        <header className="relative pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-12">
  <span className="absolute left-0 top-0 text-xs sm:text-sm font-semibold text-gray-600">
    {messages.established}
  </span>
  <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black tracking-tight leading-tight text-gray-900">
    {messages.company}
  </h1>
</header>

        {/* Top Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative flex justify-center order-2 lg:order-1 w-full">
            <div className="absolute inset-0 bg-gray-400 rounded-3xl translate-x-2 sm:translate-x-3 md:translate-x-4 translate-y-2 sm:translate-y-3 md:translate-y-4 -z-0 opacity-50"></div>
            <img
              src={getImagePath('wellness-cookies-hero') || ''}
              alt={messages.heroAlt}
              className="relative z-10 w-full h-64 sm:h-80 md:h-96 object-cover rounded-3xl border-2 border-gray-300"
            />
          </div>
          <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
            <p className="font-semibold text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              {messages.intro}
            </p>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{messages.valuesTitle}</h2>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <span className="inline-block bg-white px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    {messages.values[0].title}
                  </span>
                  <p className="mt-2 text-sm sm:text-base font-medium text-gray-600 leading-relaxed">
                    {messages.values[0].description}
                  </p>
                </div>

                <div>
                  <span className="inline-block bg-white px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    {messages.values[1].title}
                  </span>
                  <p className="mt-2 text-sm sm:text-base font-medium text-gray-600 leading-relaxed">
                    {messages.values[1].description}
                  </p>
                </div>

                <div>
                  <span className="inline-block bg-white px-4 sm:px-5 py-2 text-sm sm:text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    {messages.values[2].title}
                  </span>
                  <p className="mt-2 text-sm sm:text-base font-medium text-gray-600 leading-relaxed">
                    {messages.values[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider / History Header */}
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 py-6 sm:py-8 md:py-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-green-600 rounded-full border-3 border-yellow-400 flex items-center justify-center text-xs sm:text-sm text-white font-bold shadow-lg">
            <img
              src={getImagePath('brand-logo') || ''}
              alt={messages.heroAlt}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{messages.historyTitle}</h2>
        </div>

        {/* Bottom Content Grid with 5-Image Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <span className="text-green-600 text-xl sm:text-2xl mt-1 shrink-0">?</span>
              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                {messages.history[0]}
              </p>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <span className="text-green-600 text-xl sm:text-2xl mt-1 shrink-0">?</span>
              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                {messages.history[1]}
              </p>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <span className="text-green-600 text-xl sm:text-2xl mt-1 shrink-0">?</span>
              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                {messages.history[2]}
              </p>
            </div>
          </div>

          {/* 5-Image Graphic Container */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square grid grid-cols-3 grid-rows-3 gap-2 sm:gap-3">
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
