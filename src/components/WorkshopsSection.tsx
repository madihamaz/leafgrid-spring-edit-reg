import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import workshopPottery from "@/assets/workshop-pottery.jpg";
import workshopBouquet from "@/assets/workshop-bouquet.jpg";
import workshopTerrarium from "@/assets/workshop-terrarium.jpg";
import workshopPotPainting from "@/assets/workshop-potpainting.jpg";
import workshopGlass from "@/assets/workshop-glass.jpg";

export const workshops = [
  {
    id: "pottery",
    name: "Pottery Making",
    image: workshopPottery,
    description: "Shape clay on the wheel and discover the meditative art of pottery. Take home your own handmade piece.",
  },
  {
    id: "bouquet",
    name: "Bouquet Making",
    image: workshopBouquet,
    description: "Arrange seasonal blooms into a stunning bouquet. Learn the art of floral design with fresh flowers.",
  },
  {
    id: "terrarium",
    name: "Terrarium Building",
    image: workshopTerrarium,
    description: "Layer soil, moss, and succulents inside glass to create your own miniature ecosystem.",
  },
  {
    id: "pot-painting",
    name: "Pot Painting",
    image: workshopPotPainting,
    description: "Paint botanical designs on terracotta pots. No experience needed — just your imagination.",
  },
  {
    id: "glass-painting",
    name: "Glass Painting",
    image: workshopGlass,
    description: "Create translucent art on glass with vibrant colors inspired by nature and stained glass traditions.",
  },
];

const WorkshopsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="workshops" className="py-24">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">The Workshops</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Five Ways to <span className="italic text-gradient-leaf">Create</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Pick as many as you love. All beginner-friendly, all materials included.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-glow transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={w.image}
                  alt={w.name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-display text-xl font-semibold">{w.name}</h3>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                    Beginner-friendly
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{w.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/register"
            className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Register & Choose Your Workshops
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkshopsSection;
