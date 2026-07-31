type CertificationBlockProps = {
  title?: string;
};

export default function CertificationBlock({ title = "Certification" }: CertificationBlockProps) {
  return (
    <div className="relative aspect-[185/145] w-full">
      <svg
        viewBox="0 0 185 145"
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Green Background */}
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
        {/* Inner Card */}
        <rect x="13" y="18" width="158" height="98" rx="14" fill="#A87474" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center px-3 text-center text-sm font-semibold text-white">
        {title}
      </div>
    </div>
  );
}
