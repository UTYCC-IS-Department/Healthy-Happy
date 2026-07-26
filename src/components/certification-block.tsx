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
        {/* Outer Green Shape */}
        <path
          d="
          M18 6
          H156
          C171 6 179 14 179 29
          V106
          C179 122 170 129 155 129
          H111
          C107 129 104 130 101 133
          L91 141
          C89 143 86 143 84 141
          L74 133
          C71 130 68 129 64 129
          H18
          C9 129 6 122 6 114
          V21
          C6 12 9 6 18 6
          Z
          "
          fill="#57D100"
        />

        {/* Inner Card */}
        {/* Inner Card */}
        <rect x="16" y="18" width="153" height="98" rx="14" fill="#A87474" />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm font-semibold text-white">
        {title}
      </div>
    </div>
  );
}
