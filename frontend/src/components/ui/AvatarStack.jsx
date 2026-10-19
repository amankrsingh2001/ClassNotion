// Overlapping avatars with a "+1K" bubble (as on the reference course cards).
const FALLBACK = [
  "/assets/Images/aboutus1.webp",
  "/assets/Images/aboutus2.webp",
  "/assets/Images/aboutus3.webp",
];

const AvatarStack = ({ images = FALLBACK, count, size = 28, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    {images.slice(0, 3).map((src, i) => (
      <img
        key={i}
        src={src}
        alt=""
        style={{ width: size, height: size, marginLeft: i ? -size / 3 : 0 }}
        className="rounded-full object-cover ring-2 ring-night/80"
      />
    ))}
    {count && (
      <span
        style={{ height: size, minWidth: size, marginLeft: -size / 3 }}
        className="grid place-items-center px-1.5 rounded-full bg-white text-night text-[10px] font-bold ring-2 ring-night/80"
      >
        {count}
      </span>
    )}
  </div>
);

export default AvatarStack;
