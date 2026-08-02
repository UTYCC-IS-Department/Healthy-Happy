// "use client";

// import { useMemo } from "react";

// type Award = {
//   label: string;
// };

// type AwardWheelProps = {
//   awards: Award[];
//   activeAward: number;
//   onSelect: (index: number) => void;
// };

// const SIZE = 640;
// const CENTER_X = 170;
// const CENTER_Y = 320;

// const INNER_RADIUS = 135;
// const OUTER_RADIUS = 360;

// const START_ANGLE = -82;
// const END_ANGLE = 82;

// export default function AwardWheel({ awards, activeAward, onSelect }: AwardWheelProps) {
//   const visible = Math.min(7, awards.length);

//   const wheel = useMemo(() => {
//     const half = Math.floor(visible / 2);

//     return Array.from({ length: visible }, (_, slot) => {
//       const index = (((activeAward - half + slot) % awards.length) + awards.length) % awards.length;

//       const angle = Number(
//         (START_ANGLE + (slot * (END_ANGLE - START_ANGLE)) / (visible - 1)).toFixed(6),
//       );

//       return {
//         ...awards[index],
//         index,
//         angle,
//       };
//     });
//   }, [awards, activeAward, visible]);

//   return (
//     <div className="relative h-[650px] w-[650px]">
//       <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible">
//         <defs>
//           <clipPath id="brownCircleClip">
//             <rect x={CENTER_X - 20} y={CENTER_Y - 140} width="160" height="280" />
//           </clipPath>
//           <filter id="shadow" x="-30%" y="-30%" width="200%" height="200%">
//             <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity=".18" />
//           </filter>

//           <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#8E6B60" />
//             <stop offset="100%" stopColor="#7E5E54" />
//           </linearGradient>
//         </defs>

//         {/* PETALS */}

//         {wheel.map((item) => {
//           const r = (item.angle * Math.PI) / 180;

//           const x = Number((CENTER_X + Math.cos(r) * INNER_RADIUS).toFixed(6));

//           const y = Number((CENTER_Y + Math.sin(r) * INNER_RADIUS).toFixed(6));

//           const rotate = Number(item.angle.toFixed(6));

//           return (
//             <g
//               key={`award-${item.index}`}
//               transform={`translate(${x} ${y}) rotate(${rotate})`}
//               onClick={() => onSelect(item.index)}
//               style={{
//                 cursor: "pointer",
//                 transition: "all .35s ease",
//               }}
//             >
//               <path
//                 d={`
//     M 0 -22
//     Q 0 -30 12 -30
//     L 115 -30
//     Q 135 -30 155 -18
//     L 175 0
//     L 155 18
//     Q 135 30 115 30
//     L 12 30
//     Q 0 30 0 22
//     Z
//   `}
//                 fill={item.index === activeAward ? "url(#activeGradient)" : "#E2E2E2"}
//                 stroke={item.index === activeAward ? "#8E6B60" : "#D0D0D0"}
//                 strokeWidth="1.5"
//                 filter="url(#shadow)"
//               />
//               <text
//                 x="62"
//                 y="0"
//                 textAnchor="middle"
//                 dominantBaseline="middle"
//                 fontSize="14"
//                 fontWeight="600"
//                 fill={item.index === activeAward ? "#ffffff" : "#555555"}
//               >
//                 {item.label}
//               </text>
//             </g>
//           );
//         })}

//         {/* CENTER CIRCLE */}
//         <circle
//           cx={CENTER_X}
//           cy={CENTER_Y}
//           r="135"
//           fill="#655B58"
//           filter="url(#shadow)"
//           clipPath="url(#brownCircleClip)"
//         />
//       </svg>

//       {/* Vertical Title */}
//       <div className=" absolute left-[145px] top-1/2 -translate-y-1/2 flex h-[220px] w-[120px] items-center justify-center pointer-events-none ">
//         {" "}
//         <span
//           className="select-none text-5xl font-bold tracking-wide text-white"
//           style={{ writingMode: "vertical-lr", transform: "rotate(0deg)" }}
//         >
//           {" "}
//           Awards{" "}
//         </span>{" "}
//       </div>
//     </div>
//   );
// }

"use client";

import { useMemo } from "react";

type Award = {
  label: string;
};

type AwardWheelProps = {
  awards: Award[];
  activeAward: number;
  onSelect: (index: number) => void;
};

const SIZE = 640;
const CENTER_X = 170;
const CENTER_Y = 320;

const INNER_RADIUS = 135;
const OUTER_RADIUS = 360;

const START_ANGLE = -82;
const END_ANGLE = 82;

export default function AwardWheel({ awards, activeAward, onSelect }: AwardWheelProps) {
  const visible = Math.min(7, awards.length);

  const wheel = useMemo(() => {
    const half = Math.floor(visible / 2);

    return Array.from({ length: visible }, (_, slot) => {
      const index = (((activeAward - half + slot) % awards.length) + awards.length) % awards.length;

      const angle = Number(
        (START_ANGLE + (slot * (END_ANGLE - START_ANGLE)) / (visible - 1)).toFixed(6),
      );

      return {
        ...awards[index],
        index,
        angle,
      };
    });
  }, [awards, activeAward, visible]);

  return (
    <div className="relative h-[650px] w-[650px]">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full w-full overflow-visible">
        <defs>
          <clipPath id="brownCircleClip">
            <rect x={CENTER_X - 20} y={CENTER_Y - 140} width="160" height="280" />
          </clipPath>
          <filter id="shadow" x="-30%" y="-30%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity=".18" />
          </filter>

          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8E6B60" />
            <stop offset="100%" stopColor="#7E5E54" />
          </linearGradient>
        </defs>

        {/* PETALS */}

        {wheel.map((item) => {
          const r = (item.angle * Math.PI) / 180;

          const START_OFFSET = 115;

          const x = CENTER_X + Math.cos(r) * START_OFFSET;
          const y = CENTER_Y + Math.sin(r) * START_OFFSET;

          const rotate = Number(item.angle.toFixed(6));

          return (
            <g
              key={`award-${item.index}`}
              transform={`translate(${x} ${y}) rotate(${rotate})`}
              onClick={() => onSelect(item.index)}
              style={{
                cursor: "pointer",
                transition: "all .35s ease",
              }}
            >
              <rect
                x={0}
                y={-34}
                width={160}
                height={60}
                rx={10}
                ry={10}
                fill={item.index === activeAward ? "url(#activeGradient)" : "#E6E6E6"}
                stroke={item.index === activeAward ? "#8E6B60" : "#D8D8D8"}
                strokeWidth={1.2}
                filter="url(#shadow)"
              />
              <text
                x="70"
                y="0"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="600"
                fill={item.index === activeAward ? "#ffffff" : "#555555"}
              >
                {item.label}
              </text>
            </g>
          );
        })}

        {/* CENTER CIRCLE */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r="135"
          fill="#655B58"
          filter="url(#shadow)"
          clipPath="url(#brownCircleClip)"
        />
      </svg>

      {/* Vertical Title */}
      <div className=" absolute left-[145px] top-1/2 -translate-y-1/2 flex h-[220px] w-[120px] items-center justify-center pointer-events-none ">
        {" "}
        <span
          className="select-none text-5xl font-bold tracking-wide text-white"
          style={{ writingMode: "vertical-lr", transform: "rotate(0deg)" }}
        >
          {" "}
          Awards{" "}
        </span>{" "}
      </div>
    </div>
  );
}
