import React from 'react';

interface GridImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  className: string;
}

const Headline: React.FC = () => {

  const gridImagesData: GridImage[] = [
    {
      id: 1,
      src: '/path/to/top-left-img.jpg',
      alt: 'Top Left Team Member',
      title: 'Co-Founder 1',
      className: 'col-start-1 col-end-3 row-start-1 row-end-3',
    },
    {
      id: 2,
      src: '/path/to/top-right-img.jpg',
      alt: 'Top Right Team Member',
      title: 'Nutritionist',
      className: 'col-start-3 row-start-1 row-end-3',
    },
    {
      id: 3,
      src: '/path/to/center-img.jpg',
      alt: 'Center Focus: Founding Story',
      title: 'The Mission',
      className: 'col-start-2 row-start-2 z-10',
    },
    {
      id: 4,
      src: '/path/to/bottom-left-img.jpg',
      alt: 'Bottom Left: Mandalay Office',
      title: 'Operations',
      className: 'col-start-1 row-start-3',
    },
    {
      id: 5,
      src: '/path/to/bottom-right-img.jpg',
      alt: 'Bottom Right Team Member',
      title: 'Co-Founder 2',
      className: 'col-start-2 col-end-4 row-start-3',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F4EB] text-gray-900 p-8 md:p-16 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Section */}
        <header className="relative pt-8 pb-12">
  <span className="absolute left-0 top-0 text-sm font-semibold text-gray-600">
    Est. 2017 in Mandalay, Myanmar
  </span>
  <h1 className="text-center text-4xl md:text-6xl font-black tracking-tight leading-tight text-gray-900">
    Healthy & Happy  Myanmar Co., Ltd.
  </h1>
</header>

        {/* Top Content Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative flex justify-center order-2 lg:order-1">
            <div className="absolute inset-0 bg-gray-400 rounded-3xl translate-x-4 translate-y-4 -z-0 opacity-50"></div>
            <div className="relative z-10 w-full h-96 bg-gray-200 border-2 border-dashed border-gray-300 rounded-3xl flex items-center justify-center text-gray-400 font-medium">
              <span>[ Comic / Nepotism Image Placeholder ]</span>
            </div>
          </div>
          <div className="space-y-8 order-1 lg:order-2">
            <p className="font-semibold text-gray-700 text-lg md:text-xl leading-relaxed">
              The Healthy Plate is dedicated to promoting a wholesome lifestyle centered around fresh ingredients, balanced nutrition, and overall well-being. Our brand identity reflects vitality, health, and happiness through vibrant green aesthetics and clear nutritional categorization.
            </p>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Brand Values</h2>

              <div className="space-y-5">
                <div>
                  <span className="inline-block bg-white px-5 py-2 text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    Freshness
                  </span>
                  <p className="mt-2 text-base font-medium text-gray-600 leading-relaxed">
                    Emphasizing farm-fresh vegetables, fruits, and organic produce
                  </p>
                </div>

                <div>
                  <span className="inline-block bg-white px-5 py-2 text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    Balance
                  </span>
                  <p className="mt-2 text-base font-medium text-gray-600 leading-relaxed">
                    Highlighting whole grains, lean proteins, and wholesome nutrition.
                  </p>
                </div>

                <div>
                  <span className="inline-block bg-white px-5 py-2 text-base font-semibold text-gray-800 rounded-lg shadow-sm">
                    Joy & Vitality
                  </span>
                  <p className="mt-2 text-base font-medium text-gray-600 leading-relaxed">
                    Inspiring a positive, energetic lifestyle summarized by our motto: &quot;Healthy & Happy&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Divider / History Header */}
        <div className="flex items-center justify-center space-x-4 py-10">
          <div className="w-14 h-14 bg-green-600 rounded-full border-3 border-yellow-400 flex items-center justify-center text-sm text-white font-bold shadow-lg">
            [ Logo ]
          </div>
          <h2 className="text-4xl font-bold text-gray-900">Our History</h2>
        </div>

        {/* Bottom Content Grid with 5-Image Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <span className="text-green-600 text-2xl mt-1">?</span>
              <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                Established in 2017 in the vibrant city of Mandalay, Myanmar, Healthy & Happy Myanmar Co., Ltd. was founded by three visionary women entrepreneurs and a pioneering nutritionist.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-green-600 text-2xl mt-1">?</span>
              <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                Our journey began with a deeply personal story. One of our co-founders experienced the heartbreak of losing her father to cancer due to a lack of access to nutritious food. This profound experience ignited a passion to ensure no one else would suffer from preventable health issues due to poor nutrition.
              </p>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-green-600 text-2xl mt-1">?</span>
              <p className="text-base md:text-lg font-medium text-gray-700 leading-relaxed">
                Recognizing the prevalence of diabetes and other health conditions in our community, we committed ourselves to making a difference—one nutritious product at a time.
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
