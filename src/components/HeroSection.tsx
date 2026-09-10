import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import springEditLogo from "@/assets/spring-edit-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Creative workshop setup" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <motion.img
        src={springEditLogo}
        alt="The Spring Edit 2.0"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="hidden md:block absolute top-8 lg:top-10 right-4 lg:right-12 w-28 lg:w-40 xl:w-48 opacity-90 pointer-events-none select-none"
      />

      <div className="relative container flex flex-col items-center justify-between text-center px-4 min-h-[70vh] md:min-h-[80vh] py-16">
        <div className="flex flex-col items-center">
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
            className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto font-light"
          >
            Bringing people closer to nature through creativity
          </motion.p>
        </div>

        <div className="flex flex-col items-center gap-8 pb-4 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground"
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
      </div>
    </section>
  );
};

export default HeroSection;
