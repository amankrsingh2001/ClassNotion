// Consistent page/section header: eyebrow, title, optional subtitle and right-side actions.
const SectionHeader = ({ eyebrow, title, subtitle, actions, className = "", center = false }) => (
  <div className={`flex flex-col gap-5 ${center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"} ${className}`}>
    <div className={center ? "max-w-2xl" : "max-w-3xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="h-display text-3xl sm:text-4xl md:text-5xl text-foreground">{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg text-foreground/55">{subtitle}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
  </div>
);

export default SectionHeader;
