import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Creative workshop setup" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative container text-center py-32 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6"
        >
          A LeafGrid Experience
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          The Spring <span className="text-gradient-leaf italic">Edit</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-8 font-light"
        >
          Bringing people closer to nature through creativity
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground mb-10"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-primary" />
            14 May 2026
          </span>
          <span className="hidden sm:block text-border">•</span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            Imli Sarai, Hyderabad
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/register"
            className="inline-block px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:opacity-90 transition-all animate-pulse-glow"
          >
            Grab Your Spot
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
