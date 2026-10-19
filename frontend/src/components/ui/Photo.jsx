// Photo with the reference's plum/magenta duotone treatment + bottom fade for overlaid text.
const Photo = ({ src, alt = "", className = "", fade = true, tint = true, children, imgClassName = "" }) => (
  <div className={`media-contrast relative overflow-hidden ${className}`}>
    <img src={src} alt={alt} loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`} />
    {tint && <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,.05),rgba(15,23,42,.25))] mix-blend-multiply" />}
    {tint && <div className="absolute inset-0 bg-pink-wash mix-blend-screen opacity-60" />}
    {fade && <div className="absolute inset-0 bg-photo-fade" />}
    {children && <div className="relative h-full">{children}</div>}
  </div>
);

export default Photo;
