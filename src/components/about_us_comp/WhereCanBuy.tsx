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
                
                {/* Shared Centering Wrapper to lock width and alignment together */}
                <div className="relative w-full max-sm:w-[80%] mx-auto">

                  {/* Background Shadow Badge */}
                  <div className="absolute -bottom-3 left-11 w-10 h-18 bg-[#3a3437] rounded-br-xl shadow-md z-0 pointer-events-none" />

                  {/* Main Card Shape with Top Tab Bump */}
                  <div
                    className={`
                      relative
                      h-40
                      w-full
                      rounded-3xl
                      shadow-lg
                      px-4
                      flex
                      items-center
                      justify-center
                      text-center
                      pt-1
                      z-10
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

                    {/* Bottom-left foreground badge wrapper */}
                    <div className="absolute -bottom-3 left-4 flex flex-col items-center z-20">
                      {/* Main Foreground Badge Tab */}
                      <div className="relative w-15 h-18 bg-[#4a4246] rounded-t-4xl rounded-bl-xl shadow-lg flex flex-col items-center pt-2">
                        {/* Inner circle with ID */}
                        <div className="relative bottom-1 w-12 h-12 bg-[#825355] rounded-full border-4 border-[#e6d5d5] flex items-center justify-center shadow-inner">
                          <span className="text-white font-bold text-2xl">{item.id}</span>
                        </div>
                      </div>
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