import { Leaf, Mail } from "lucide-react";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Leaf className="w-5 h-5 text-primary" />
        <span className="font-display text-lg font-semibold">LeafGrid</span>
      </div>
      <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
        Bringing people closer to nature through creativity. One workshop at a time.
      </p>
      <a
        href="mailto:support@leafgrid.in"
        className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-6"
      >
        <Mail className="w-4 h-4" />
        support@leafgrid.in
      </a>
      <p className="text-muted-foreground/60 text-xs">
        © {new Date().getFullYear()} LeafGrid. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
