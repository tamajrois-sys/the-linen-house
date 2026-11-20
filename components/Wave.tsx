type WaveProps = {
  color: string; // warna bagian di ATAS gelombang ini
};

export default function Wave({ color }: WaveProps) {
  return (
    <div aria-hidden="true" className="wave-top" style={{ color }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="h-[40px] w-full md:h-[70px]"
      >
        <path
          d="M0 0 H1440 V30 C1200 80 960 0 720 40 C480 80 240 10 0 50 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}