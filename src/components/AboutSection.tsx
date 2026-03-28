import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Users, Sprout } from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Nature-Inspired",
    description: "Every workshop connects you to the earth — through soil, petals, glass, and clay.",
  },
  {
    icon: Palette,
    title: "Choose Any 2",
    description: "Pick any two workshops that spark your curiosity. All materials included.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Come with friends, family, or solo. Leave with memories and handmade creations.",
  },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-gradient-earth">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">About the Event</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Where Creativity Meets <span className="italic text-gradient-leaf">Nature</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            The Spring Edit is a day of slowing down, getting your hands dirty, and making something
            beautiful. Five workshops, one venue, and a community that believes in the joy of creating together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-glow transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
