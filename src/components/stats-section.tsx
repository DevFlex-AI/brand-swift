const stats = [
  {
    number: "3,000+",
    label: "Platform Features"
  },
  {
    number: "100K+",
    label: "Active Users"
  },
  {
    number: "$500M+",
    label: "Funding Facilitated"
  },
  {
    number: "99.9%",
    label: "User Satisfaction"
  }
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-foreground text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-primary-glow bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;