const Details = [
  {
    count: "5K",
    name: "Active Students",
  },
  {
    count: "10+",
    name: "Mentors",
  },
  {
    count: "200+",
    name: "Courses",
  },
  {
    count: "50+",
    name: "Awards",
  },
];

const AboutDetail = () => {
  return (
    <div className="glass relative overflow-hidden grid grid-cols-2 lg:grid-cols-4">
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 left-1/3 w-80 h-48 rounded-full bg-violet/25 blur-3xl" />
      {Details.map((detail, index) => {
        return (
          <div
            key={index}
            className={`relative px-6 py-8 md:py-10 text-center lg:text-left
              ${index % 2 === 1 ? "border-l border-foreground/[0.07]" : ""}
              ${index >= 2 ? "border-t lg:border-t-0 border-foreground/[0.07]" : ""}
              ${index === 2 ? "lg:border-l" : ""}`}
          >
            <p className="h-display text-4xl md:text-6xl text-foreground">
              {detail.count}
            </p>
            <p className="mt-2 text-sm text-foreground/45">{detail.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AboutDetail;
