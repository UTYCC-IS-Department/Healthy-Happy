import React from 'react';
import { useTranslations } from 'next-intl';

interface CoreIdentityItem {
  id: string;
  titleKey: string;
  headingKey: string;
  descriptionKey: string;
}

const coreIdentityItems: CoreIdentityItem[] = [
  {
    id: 'mission',
    titleKey: 'mission.title',
    headingKey: 'mission.heading',
    descriptionKey: 'mission.description',
  },
  {
    id: 'vision',
    titleKey: 'vision.title',
    headingKey: 'vision.heading',
    descriptionKey: 'vision.description',
  },
  {
    id: 'motto',
    titleKey: 'motto.title',
    headingKey: 'motto.heading',
    descriptionKey: 'motto.description',
  },
];

export const CoreIdentity: React.FC = () => {
  const t = useTranslations('AboutUs.CoreIdentity');

  return (
    <div className="bg-[#f8f6ef] py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-20 text-black tracking-tight">
          {t("title")}
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 justify-items-center items-stretch">
          {coreIdentityItems.map((item) => {
            const headingText = t(item.headingKey);
            const descriptionText = t(item.descriptionKey);
            const hasContent = headingText || descriptionText;

            return (
              <div key={item.id} className="relative pt-6 pb-12 flex justify-center w-full">
                
                {/* 
                  Responsive container wrapper: 
                  - w-full max-w-sm on mobile so it never overflows small screens
                  - md:w-md to lock the standard width on medium/desktop screens
                */}
                <div className="relative w-full max-w-sm md:w-md">

                  {/* Bottom Elements Positioned Behind Container */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none z-0">
                    {/* Extra Dark Blue Background Box Under All */}
                    <div className="w-[105%] h-65 bg-[#2c353e] rounded-b-4xl shadow-md translate-y-35" />
                    {/* Dark Accent Underlay Shape */}
                    <div className="w-48 h-16 bg-[#3a434c] rounded-3xl shadow-md -translate-y-16" />
                    {/* Bottom Green Floating Badge Tab */}
                    <div className="w-48 h-20 bg-[#16b300] rounded-4xl shadow-lg translate-y-5" />
                  </div>

                  {/* Main Card Container */}
                  <div className="relative w-full h-full bg-[#e6e4dc] rounded-4xl shadow-xl pt-25 pb-12 px-6 flex flex-col justify-between items-center text-center z-10">
                    
                    {/* Top Green Banner/Header Tab */}
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#16b300] rounded-t-4xl rounded-b-none shadow-md flex items-center justify-center z-20">
                      <h3 className="text-white font-extrabold text-xl tracking-wide">
                        {t(item.titleKey)}
                      </h3>
                    </div>

                    {/* Content Area */}
                    {hasContent ? (
                      <div className="flex flex-col space-y-4 z-10 mt-2 my-auto">
                        {headingText && (
                          <h4 className="font-extrabold text-black text-lg leading-snug">
                            {headingText}
                          </h4>
                        )}
                        {descriptionText && (
                          <p className="text-gray-800 text-sm font-medium leading-relaxed">
                            {descriptionText}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="my-auto h-32 z-10" />
                    )}

                    {/* Spacer */}
                    <div className="w-full h-2" />
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CoreIdentity;