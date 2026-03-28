import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, Clock, Sparkles } from "lucide-react";

const CommunitySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-gradient-earth">
      <div className="container" ref={ref}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary text-sm tracking-[0.2em] uppercase mb-3">The Experience</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              More Than a Workshop.
              <br />
              <span className="italic text-gradient-leaf">A Memory.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              The Spring Edit isn't just about learning a skill — it's about spending a beautiful day
              surrounded by creativity, nature, and people who love making things with their hands.
              Bring a friend, bring your family, or come solo and make new ones.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Heart, text: "Perfect for friends, couples, and families" },
                { icon: Clock, text: "A full day of creative immersion" },
                { icon: Sparkles, text: "Take home everything you make" },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl bg-card border border-border p-8 md:p-10">
              <p className="font-display text-2xl italic text-foreground mb-4 leading-relaxed">
                "There's something healing about getting your hands dirty — shaping clay,
                arranging flowers, painting glass. It reminds you to slow down."
              </p>
              <p className="text-muted-foreground text-sm">— The LeafGrid Philosophy</p>
            </div>

            {/* Urgency card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-6 rounded-2xl bg-primary/10 border border-primary/20 p-6 text-center"
            >
              <p className="text-primary font-display text-xl font-semibold mb-1">Limited to 200 Spots</p>
              <p className="text-muted-foreground text-sm">
                Once they're gone, they're gone. Secure your place now.
              </p>
              <Link
                to="/register"
                className="inline-block mt-4 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Grab Your Spot
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Add-on mention */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center p-6 rounded-2xl border border-border bg-card/50"
        >
          <p className="text-muted-foreground">
            🌿 Want more? Additional workshops can be booked on the spot — <span className="text-foreground">₹300 each</span>, subject to availability.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
