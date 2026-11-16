import Image from "next/image";

type CertificationBlockProps = {
  CertificationImage?: string;
};

export default function CertificationBlock({ CertificationImage }: CertificationBlockProps) {
  return (
    <div className="relative aspect-[185/145] w-full">
      <svg
        viewBox="0 0 185 145"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#57D100"
          d="
          M22 10
          H160
          C171 10 178 17 178 28
          V122
          C178 136 170 144 156 144
          H144
          C134 144 126 141 119 136
          L105 126
          C100 123 95 122 88 122
          H22
          C11 122 4 115 4 104
          V28
          C4 17 11 10 22 10
          Z"
        />

        <rect x="13" y="18" width="158" height="98" rx="14" fill="#A87474" />
      </svg>

      {CertificationImage && (
        <div className="absolute left-[7.03%] top-[12.4%] h-[67.6%] w-[85.4%] overflow-hidden rounded-[14px]">
          <Image src={CertificationImage} alt="Certification" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
