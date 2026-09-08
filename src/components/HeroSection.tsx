import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import springEditLogo from "@/assets/spring-edit-logo.png.asset.json";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />

      <div className="relative container text-center py-32 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-8"
        >
          A LeafGrid Experience
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <img
            src={springEditLogo.url}
            alt="The Spring Edit 2.0 by LeafGrid"
            className="w-[280px] sm:w-[360px] md:w-[480px] lg:w-[560px] h-auto"
          />
        </motion.div>

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
