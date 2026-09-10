import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import heroVideo from "@/assets/spring-edit-hero.mp4";
import springEditLogo from "@/assets/spring-edit-logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative container flex flex-col items-center text-center px-4 py-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary text-glow-leaf font-body text-sm sm:text-base tracking-[0.3em] uppercase mb-2"
        >
          A LeafGrid Experience
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-6 -mt-6 sm:-mt-8 md:-mt-10 lg:-mt-12"
        >
          <img
            src={springEditLogo}
            alt="The Spring Edit 2.0 by LeafGrid"
            className="h-auto w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] xl:w-[520px]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-2xl max-w-xl mx-auto font-light mb-8 md:mb-10"
        >
          Bringing people closer to nature through creativity
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 text-base md:text-lg text-muted-foreground mb-8 md:mb-10"
        >
          <span className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            9–11 October 2026
          </span>
          <span className="hidden sm:block text-border">•</span>
          <span className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Grand Food Fest, Gachibowli Stadium, Hyderabad
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/register"
            className="inline-block px-10 py-5 rounded-full bg-primary text-primary-foreground font-medium text-lg md:text-xl hover:opacity-90 transition-all animate-pulse-glow"
          >
            Grab Your Spot
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
