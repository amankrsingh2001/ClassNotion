// Glass story card: icon-circle header, soft glow blob, heading + paragraphs.
// `textColor` kept for API compatibility (extra classes on the heading).
const AboutCard = ({
  heading,
  description1,
  description2,
  textColor = "",
  icon: Icon,
  eyebrow,
  glow = "bg-magenta/30",
  className = "",
}) => {
  return (
    <div className={`glass card-hover relative overflow-hidden flex flex-col gap-5 p-6 md:p-8 h-full ${className}`}>
      <span aria-hidden="true" className={`pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl ${glow}`} />
      <div className="relative flex items-center gap-3">
        {Icon && (
          <span className="icon-circle">
            <Icon className="text-lg" />
          </span>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      </div>
      <h2 className={`relative h-display text-3xl md:text-4xl text-white ${textColor}`}>{heading}</h2>
      <div className="relative flex flex-col gap-3 text-white/60 leading-relaxed">
        <p>{description1}</p>
        {description2 !== "" && description2 !== undefined && <p>{description2}</p>}
      </div>
    </div>
  );
};

export default AboutCard;
