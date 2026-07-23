import React from 'react';
import { useTranslations } from 'next-intl';

interface LocationItem {
  id: number;
  nameKey: string;
  active?: boolean;
}

const locations: LocationItem[] = [
  { id: 1, nameKey: 'locations.grandhantharHospital1', active: true },
  { id: 2, nameKey: 'locations.shweOhhPharmacy', active: true },
  { id: 3, nameKey: 'locations.koHanTinPharmacy' },
  { id: 4, nameKey: 'locations.marketPlace' },
  { id: 5, nameKey: 'locations.citymart' },
  { id: 6, nameKey: 'locations.grandhantharHospital2' },
  { id: 7, nameKey: 'locations.grandhantharHospital3' },
  { id: 8, nameKey: 'locations.grandhantharHospital4' },
  { id: 9, nameKey: 'locations.grandhantharHospital5' },
];

export const WhereCanBuy: React.FC = () => {
  const t = useTranslations('AboutUs.WhereCanBuy');

  return (
    <div className="bg-[#f8f6ef] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 sm:mb-16">
          {t("title")}
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
          {locations.map((item) => {
            const active = item.active;

            return (
              <div key={item.id} className="relative mt-4">
                {/* Main Card Shape with Top Tab Bump */}
                <div
                  className={`
                    relative
                    h-35
                    rounded-3xl
                    shadow-lg
                    px-4
                    flex
                    items-center
                    justify-center
                    text-center
                    pt-1
                    ${
                      active
                        ? "bg-[#16b300] text-black font-extrabold"
                        : "bg-[#dedede] text-black font-bold"
                    }
                  `}
                >
                  {/* Top-right custom tab bump overlay */}
                  <div 
                    className={`
                      absolute 
                      -top-8
                      right-8
                      w-18
                      h-18
                      rounded-full
                      ${active ? "bg-[#16b300]" : "bg-[#dedede]"}
                    `}
                  />

                  {/* Top-right brown circle element */}
                  <div className="absolute -top-6 right-10 w-14 h-14 bg-[#825355] rounded-full z-10" />

                  {/* Location Title */}
                  <p className="font-extrabold text-base leading-tight z-10">
                    {t(item.nameKey)}
                  </p>

                  {/* Bottom-left overlapping dark badge tab */}
                  <div className="absolute -bottom-4 left-4 w-14 h-20 bg-[#4a4246] rounded-t-2xl rounded-b-xl shadow-lg flex flex-col items-center pt-2 z-20">
                    {/* Inner circle with ID */}
                    <div className="w-10 h-10 bg-[#825355] rounded-full border-2 border-[#e6d5d5] flex items-center justify-center shadow-inner">
                      <span className="text-white font-bold text-sm">{item.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Footer Note Box */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-[#dcdcdc] rounded-2xl px-6 py-4 flex items-center shadow-sm mt-4">
            <span className="text-red-500 text-lg mr-3 flex-shrink-0">◆</span>
            <p className="text-sm font-semibold leading-5 text-gray-800">
              {t("footerNote")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereCanBuy;