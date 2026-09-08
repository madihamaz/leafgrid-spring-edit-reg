import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import springEditLogo from "@/assets/spring-edit-logo.png.asset.json";
import heroVideo from "@/assets/spring-edit-hero.mp4.asset.json";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={heroVideo.url} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-background/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />

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
            className="h-auto w-[220px] sm:w-[270px] md:w-[320px] lg:w-[380px]"
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
