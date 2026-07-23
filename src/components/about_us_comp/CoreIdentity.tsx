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
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-16 text-black tracking-tight">
          {t("title")}
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {coreIdentityItems.map((item) => {
            const headingText = t(item.headingKey);
            const descriptionText = t(item.descriptionKey);
            const hasContent = headingText || descriptionText;

            return (
              <div key={item.id} className="relative pt-6 pb-6">
                {/* 
                  Outer card container wrapped with dark background shadow-tab 
                  matching the style shown in the previous component design.
                */}
                <div className="relative bg-[#e6e4dc] rounded-3xl shadow-xl pt-12 pb-12 px-6 flex flex-col items-center text-center">
                  
                  {/* Top Green Banner/Header Tab */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#16b300] rounded-2xl shadow-md flex items-center justify-center z-20">
                    <h3 className="text-white font-extrabold text-xl tracking-wide">
                      {t(item.titleKey)}
                    </h3>
                  </div>

                  {/* Content Area */}
                  {hasContent ? (
                    <div className="flex flex-col space-y-4 z-10 mt-2">
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
                    <div className="h-32 z-10" />
                  )}

                  {/* Bottom Green Floating Badge Tab */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-36 h-10 bg-[#16b300] rounded-2xl shadow-lg z-20" />
                  
                  {/* Dark Accent Underlay Shape Behind Bottom Badge */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-44 h-16 bg-[#3a434c] rounded-3xl -z-10 shadow-md" />
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