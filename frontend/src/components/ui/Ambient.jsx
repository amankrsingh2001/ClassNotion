// Fixed, blurred aurora blobs behind the whole app (the plum/magenta glow of the reference).
const Ambient = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-night">
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-plum/50 blur-[140px]" />
    <div className="absolute top-[30%] -left-40 w-[520px] h-[520px] rounded-full bg-magenta/20 blur-[140px] animate-drift" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet/20 blur-[160px] animate-drift [animation-delay:-6s]" />
  </div>
);

export default Ambient;
