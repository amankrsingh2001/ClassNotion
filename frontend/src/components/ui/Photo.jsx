// Photo with the reference's plum/magenta duotone treatment + bottom fade for overlaid text.
const Photo = ({ src, alt = "", className = "", fade = true, tint = true, children, imgClassName = "" }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <img src={src} alt={alt} loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`} />
    {tint && <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(143,107,242,.35),rgba(226,95,168,.45))] mix-blend-multiply" />}
    {tint && <div className="absolute inset-0 bg-pink-wash mix-blend-screen opacity-60" />}
    {fade && <div className="absolute inset-0 bg-photo-fade" />}
    {children && <div className="relative h-full">{children}</div>}
  </div>
);

export default Photo;
