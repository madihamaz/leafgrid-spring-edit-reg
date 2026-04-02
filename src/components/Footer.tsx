import { Instagram, Phone, MapPin } from "lucide-react";
import leafgridLogo from "@/assets/leafgrid-logo.png";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container">
      <div className="grid sm:grid-cols-3 gap-8 mb-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img src={leafgridLogo} alt="LeafGrid" className="w-7 h-7" />
            <span className="font-display text-lg font-semibold">LeafGrid</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Bringing people closer to nature through creativity. One workshop at a time.
          </p>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-display font-semibold mb-3">Connect With Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href="https://www.instagram.com/thespring.edit/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @leafgrid.in
              </a>
            </li>
            <li>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Hyderabad, India
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#about" className="hover:text-primary transition-colors">About</a>
            </li>
            <li>
              <a href="#workshops" className="hover:text-primary transition-colors">Workshops</a>
            </li>
            <li>
              <a href="/register" className="hover:text-primary transition-colors">Register</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/60">
        <p>&copy; {new Date().getFullYear()} LeafGrid. All rights reserved.</p>
        <p>
          Powered by{" "}
          <a
            href="https://leafgrid.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            leafgrid.in
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
