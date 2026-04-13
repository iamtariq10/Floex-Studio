/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'motion/react';
import { 
  Zap, 
  Globe, 
  Smartphone, 
  Palette, 
  Cloud, 
  ShoppingCart, 
  Cpu, 
  ArrowRight, 
  Check, 
  Plus, 
  X, 
  Mail, 
  MessageSquare, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  Dribbble,
  Menu,
  ChevronRight
} from 'lucide-react';

// --- Components ---

const SectionBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center px-4 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-medium mb-4">
    {children}
  </div>
);

const StatCounter = ({ value, label, duration = 2 }: { value: number, label: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-display font-bold text-gradient mb-2">{count}+</div>
      <div className="text-muted text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

const TypingHeadline = () => {
  const [text, setText] = useState('');
  const fullText = "Drive Results.";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <span className="text-gradient inline-block min-w-[200px]">
      {text}
      <motion.span 
        animate={{ opacity: [1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-12 md:h-16 bg-accent2 ml-1 align-middle"
      />
    </span>
  );
};

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-primary z-[100] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-3 mb-8"
        >
          <Zap className="w-10 h-10 text-accent fill-accent" />
          <span className="text-3xl font-display font-bold text-white">Floex Studio</span>
        </motion.div>
        <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full bg-gradient"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-primary selection:bg-accent/30">
      {/* Cursor Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(108,99,255,0.15)_0%,transparent_50%)]" 
             style={{ '--x': '50%', '--y': '50%' } as any} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <Zap className="w-6 h-6 text-accent fill-accent group-hover:scale-110 transition-transform" />
            <span className="text-xl font-display font-bold text-white">
              <span className="text-gradient">Floex</span> Studio
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-muted hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:block px-6 py-2.5 rounded-lg bg-gradient text-white text-sm font-semibold glow-hover">
              Get Free Quote
            </a>
            <button 
              className="lg:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 glass flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-display font-bold text-white hover:text-gradient"
                >
                  {link.name}
                </motion.a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 px-8 py-3 rounded-lg bg-gradient text-white font-bold"
              >
                Get Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6C63FF1A_1px,transparent_1px),linear-gradient(to_bottom,#6C63FF1A_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute inset-0 bg-primary [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        {/* Floating Orbs */}
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px] z-0" 
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent2/20 rounded-full blur-[120px] z-0" 
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full border border-accent/30 glass mb-8">
                <span className="text-sm font-medium text-white">🚀 Trusted by 50+ Businesses Worldwide</span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-6">
                We Build Digital <br />
                <TypingHeadline /> <br />
                Products That
              </h1>
              <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
                From stunning websites to powerful web apps and mobile solutions — Floex Studio transforms your vision into digital reality. Fast. Scalable. Beautiful.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient text-white font-bold flex items-center justify-center gap-2 glow-hover">
                  Start Your Project <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#work" className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors">
                  View Our Work
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <StatCounter value={50} label="Projects Delivered" />
                <StatCounter value={30} label="Happy Clients" />
                <StatCounter value={3} label="Years Experience" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tech Stack Marquee */}
        <div className="absolute bottom-10 w-full overflow-hidden whitespace-nowrap border-y border-white/5 py-6 bg-secondary/50 backdrop-blur-sm">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            {[...Array(2)].map((_, i) => (
              <span key={i} className="inline-flex gap-12 px-6">
                {["React", "Next.js", "Node.js", "Python", "Flutter", "MongoDB", "PostgreSQL", "AWS", "Firebase", "TypeScript", "Vue.js", "Django"].map((tech) => (
                  <span key={tech} className="text-muted font-display font-semibold text-lg hover:text-white transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-secondary py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <p className="text-center text-muted text-sm font-medium mb-10 uppercase tracking-widest">Trusted by growing businesses worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50">
            {["TechVault", "NovaBrand", "SwiftScale", "PeakFlow", "DataNest", "CloudPulse"].map((logo) => (
              <span key={logo} className="text-2xl md:text-3xl font-display font-bold text-white hover:opacity-100 transition-opacity cursor-default">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>What We Do</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Our Services</h2>
            <p className="text-muted text-lg">End-to-end digital solutions built to scale your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: <Globe />, 
                title: "Web Development", 
                desc: "Custom websites and web applications built with cutting-edge technology for maximum performance.",
                tags: ["React", "Next.js", "Node.js"],
                emoji: "🌐"
              },
              { 
                icon: <Smartphone />, 
                title: "Mobile App Development", 
                desc: "Native and cross-platform mobile apps for iOS and Android that users love.",
                tags: ["Flutter", "React Native", "Swift"],
                emoji: "📱"
              },
              { 
                icon: <Palette />, 
                title: "UI/UX Design", 
                desc: "Beautiful, intuitive designs that convert visitors into customers and users into fans.",
                tags: ["Figma", "Prototyping", "Research"],
                emoji: "🎨"
              },
              { 
                icon: <Cloud />, 
                title: "Cloud & DevOps", 
                desc: "Scalable cloud infrastructure and deployment pipelines that keep your product running 24/7.",
                tags: ["AWS", "Docker", "CI/CD"],
                emoji: "☁️"
              },
              { 
                icon: <ShoppingCart />, 
                title: "E-Commerce Solutions", 
                desc: "High-converting online stores built to maximize sales and deliver seamless shopping experiences.",
                tags: ["Shopify", "WooCommerce", "Stripe"],
                emoji: "🛒"
              },
              { 
                icon: <Cpu />, 
                title: "AI & Automation", 
                desc: "Smart AI integrations and workflow automation that save time and supercharge your business.",
                tags: ["OpenAI", "Python", "Zapier"],
                emoji: "🤖"
              }
            ].map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl glass-card hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-xl bg-gradient flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-accent/20">
                  {service.emoji}
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">{service.title}</h3>
                <p className="text-muted mb-6 leading-relaxed">{service.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-3 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Our Work</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Projects We Are Proud Of</h2>
            <p className="text-muted text-lg">A glimpse into what we have built for our clients.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              {
                category: "E-Commerce Platform",
                name: "ShopNova",
                desc: "A full-stack e-commerce platform with real-time inventory, AI recommendations, and 99.9% uptime.",
                tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
                emoji: "🛍️"
              },
              {
                category: "SaaS Dashboard",
                name: "DataPulse Analytics",
                desc: "A powerful analytics dashboard processing 1M+ data points daily for enterprise clients.",
                tech: ["React", "Python", "PostgreSQL", "AWS"],
                emoji: "📊"
              },
              {
                category: "Mobile App",
                name: "FitTrack Pro",
                desc: "A fitness tracking mobile app with AI coaching, 50,000+ downloads in first 3 months.",
                tech: ["Flutter", "Firebase", "OpenAI"],
                emoji: "💪"
              }
            ].map((project, i) => (
              <motion.div 
                key={project.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden glass-card"
              >
                <div className="h-[300px] relative bg-gradient flex items-center justify-center overflow-hidden">
                  <div className="text-8xl group-hover:scale-125 transition-transform duration-500">{project.emoji}</div>
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="px-6 py-3 rounded-lg bg-white text-primary font-bold">View Project</button>
                  </div>
                </div>
                <div className="p-8">
                  <div className="inline-block px-3 py-1 rounded-full border border-accent/30 text-accent text-xs font-bold mb-4 uppercase tracking-wider">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">{project.name}</h3>
                  <p className="text-muted text-sm mb-6 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs text-muted">#{t}</span>
                    ))}
                  </div>
                  <button className="w-full py-3 rounded-xl border border-accent/30 text-accent font-bold hover:bg-accent hover:text-white transition-all">
                    View Case Study →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="px-10 py-4 rounded-xl bg-gradient text-white font-bold glow-hover">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Our Process</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">How We Turn Ideas Into Reality</h2>
            <p className="text-muted text-lg">A proven process that delivers results on time, every time.</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute top-12 left-0 w-full h-1 bg-gradient opacity-20" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
              {[
                { title: "Discovery & Strategy", desc: "We deep dive into your goals, audience, and competition to build a winning strategy.", emoji: "💡" },
                { title: "Design & Prototype", desc: "Our designers craft stunning wireframes and interactive prototypes for your approval.", emoji: "🎨" },
                { title: "Development & Build", desc: "Our engineers bring the design to life with clean, scalable, and tested code.", emoji: "⚙️" },
                { title: "Testing & QA", desc: "Rigorous testing across all devices and browsers to ensure a flawless experience.", emoji: "🧪" },
                { title: "Launch & Support", desc: "We deploy your product and provide ongoing support to keep everything running perfectly.", emoji: "🚀" }
              ].map((step, i) => (
                <div key={step.title} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-xl shadow-accent/20 border-4 border-primary relative z-10">
                    {i + 1}
                  </div>
                  <div className="text-3xl mb-4">{step.emoji}</div>
                  <h4 className="text-xl font-display font-bold text-white mb-3">{step.title}</h4>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Pricing</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Simple, Transparent Pricing</h2>
            <p className="text-muted text-lg">No hidden fees. No surprises. Just great work.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Starter */}
            <div className="p-10 rounded-2xl glass-card border-white/5">
              <h3 className="text-2xl font-display font-bold text-white mb-2">Starter</h3>
              <div className="text-4xl font-bold text-white mb-8">$999</div>
              <ul className="space-y-4 mb-10">
                {["5-page website", "Mobile responsive", "Contact form", "Basic SEO setup", "1 month support", "Delivered in 2 weeks"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-muted text-sm">
                    <Check className="w-4 h-4 text-accent2" /> {item}
                  </li>
                ))}
                {["Custom web app", "E-commerce", "Mobile app"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/20 text-sm">
                    <X className="w-4 h-4" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all">Get Started</button>
            </div>

            {/* Professional */}
            <div className="p-10 rounded-2xl glass-card border-accent/50 relative lg:scale-105 shadow-2xl shadow-accent/10 overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-gradient text-white text-xs font-bold rounded-bl-xl">Most Popular</div>
              <h3 className="text-2xl font-display font-bold text-white mb-2">Professional</h3>
              <div className="text-4xl font-bold text-white mb-8">$2,499</div>
              <ul className="space-y-4 mb-10">
                {["Up to 15 pages", "Custom web application", "E-commerce ready", "Advanced SEO", "3 months support", "Delivered in 4 weeks", "UI/UX design included", "API integrations"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-muted text-sm">
                    <Check className="w-4 h-4 text-accent2" /> {item}
                  </li>
                ))}
                {["Mobile app"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-white/20 text-sm">
                    <X className="w-4 h-4" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-gradient text-white font-bold glow-hover">Get Started</button>
            </div>

            {/* Enterprise */}
            <div className="p-10 rounded-2xl glass-card border-white/5">
              <h3 className="text-2xl font-display font-bold text-white mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-8">Custom</div>
              <ul className="space-y-4 mb-10">
                {["Unlimited pages", "Full web + mobile app", "AI/Automation features", "Cloud infrastructure", "12 months support", "Dedicated project manager", "Priority delivery", "Custom integrations", "SLA guarantee"].map(item => (
                  <li key={item} className="flex items-center gap-3 text-muted text-sm">
                    <Check className="w-4 h-4 text-accent2" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all">Contact Us</button>
            </div>
          </div>

          <p className="text-center text-muted text-sm mt-12">
            All projects include free consultation, NDA signing, and a 30-day money-back guarantee.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Our Team</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">The People Behind Floex</h2>
            <p className="text-muted text-lg">Passionate builders, designers, and strategists.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Morgan", initials: "AM", role: "CEO & Founder", bio: "10+ years building digital products for startups and enterprises." },
              { name: "Sarah Chen", initials: "SC", role: "Lead Designer", bio: "Award-winning UI/UX designer with a passion for beautiful interfaces." },
              { name: "Marcus Johnson", initials: "MJ", role: "Lead Developer", bio: "Full-stack engineer specializing in scalable web and mobile applications." },
              { name: "Priya Patel", initials: "PP", role: "Project Manager", bio: "Keeps everything on track, on time, and within budget. Always." }
            ].map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl glass-card text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform">
                  {member.initials}
                </div>
                <h4 className="text-xl font-display font-bold text-white mb-1">{member.name}</h4>
                <div className="text-gradient text-sm font-semibold mb-4">{member.role}</div>
                <p className="text-muted text-sm mb-6 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted hover:bg-gradient hover:text-white transition-all"><Linkedin className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted hover:bg-gradient hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-muted hover:bg-gradient hover:text-white transition-all"><Github className="w-4 h-4" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>Testimonials</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">What Our Clients Say</h2>
            <p className="text-muted text-lg">Real results. Real feedback.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { text: "Floex Studio delivered our platform in 3 weeks flat. The quality blew us away — our conversion rate jumped 40% in the first month.", name: "James T.", role: "CEO at TechVault", initials: "JT" },
              { text: "Working with Floex was the best decision we made. They understood our vision instantly and built something beyond our expectations.", name: "Maria S.", role: "Founder at NovaBrand", initials: "MS" },
              { text: "Professional, fast, and incredibly talented. Our mobile app has 50,000 downloads and a 4.8 star rating. Thank you Floex!", name: "David K.", role: "CPO at SwiftScale", initials: "DK" }
            ].map((t, i) => (
              <motion.div 
                key={t.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-2xl glass-card relative"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-500">★</span>)}
                </div>
                <div className="absolute top-8 right-8 text-8xl text-accent/10 font-serif leading-none">"</div>
                <p className="text-text italic mb-8 relative z-10 leading-relaxed">"{t.text}"</p>
                <div className="h-px w-full bg-gradient opacity-20 mb-8" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center text-white font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-bold">{t.name}</div>
                    <div className="text-muted text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-muted text-lg">Everything you need to know before getting started.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: "How long does a project take?", a: "Timelines vary by project. A simple website takes 1–2 weeks. A full web app takes 4–8 weeks. We always agree on a deadline before starting." },
              { q: "How much does a project cost?", a: "Our starter websites begin at $999. Complex web apps and mobile projects start at $2,499. We offer custom quotes for enterprise projects." },
              { q: "Do you offer payment plans?", a: "Yes! We typically require 50% upfront and 50% on delivery. For larger projects we offer milestone-based payment plans." },
              { q: "Who owns the code after delivery?", a: "You do — 100%. We hand over full ownership of all code, assets, and intellectual property upon final payment." },
              { q: "Do you provide ongoing support?", a: "Yes. All packages include at least 1 month of free support. We also offer monthly maintenance retainers." },
              { q: "Can you work with our existing team?", a: "Absolutely. We collaborate with in-house teams regularly and adapt to your existing workflows and tools." },
              { q: "What if I am not happy with the work?", a: "We offer unlimited revisions during the design phase and a 30-day money-back guarantee on all projects." },
              { q: "Do you sign NDAs?", a: "Yes. We sign NDAs before any project discussion begins. Your ideas and business information are always safe." }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-primary" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(108,99,255,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(0,217,255,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Ready to Build Something <br />
              <span className="text-gradient">Amazing?</span>
            </h2>
            <p className="text-muted text-lg">Let us turn your idea into a product your users will love. Free consultation. No commitment.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="glass-card p-10 rounded-2xl">
              {formSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent text-4xl mb-6">🎉</div>
                  <h3 className="text-3xl font-display font-bold text-gradient mb-4">Message Received!</h3>
                  <p className="text-muted">We will be in touch within 24 hours.</p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-8 text-accent font-bold underline">Send another message</button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Full Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-accent/20 focus:border-accent outline-none transition-colors text-white" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-accent/20 focus:border-accent outline-none transition-colors text-white" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Company Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-lg bg-white/5 border border-accent/20 focus:border-accent outline-none transition-colors text-white" placeholder="Acme Inc." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Project Type</label>
                      <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-accent/20 focus:border-accent outline-none transition-colors text-white appearance-none">
                        <option className="bg-primary">Website</option>
                        <option className="bg-primary">Web App</option>
                        <option className="bg-primary">Mobile App</option>
                        <option className="bg-primary">E-Commerce</option>
                        <option className="bg-primary">AI/Automation</option>
                        <option className="bg-primary">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Budget Range</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-white/5 border border-accent/20 focus:border-accent outline-none transition-colors text-white appearance-none">
                      <option className="bg-primary">Under $1,000</option>
                      <option className="bg-primary">$1,000–$2,500</option>
                      <option className="bg-primary">$2,500–$5,000</option>
                      <option className="bg-primary">$5,000–$10,000</option>
                      <option className="bg-primary">$10,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Project Description</label>
                    <textarea required rows={4} className="w-full px-4 py-3 rounded-lg bg-white/5 border border-accent/20 focus:border-accent outline-none transition-colors text-white resize-none" placeholder="Tell us about your project..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-gradient text-white font-bold glow-hover flex items-center justify-center gap-2">
                    Send My Project Brief <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 rounded-2xl glass-card">
                  <Mail className="w-8 h-8 text-accent mb-4" />
                  <h4 className="text-white font-bold mb-2">Email Us</h4>
                  <p className="text-muted text-sm">hello@floexstudio.com</p>
                </div>
                <div className="p-8 rounded-2xl glass-card">
                  <MessageSquare className="w-8 h-8 text-accent2 mb-4" />
                  <h4 className="text-white font-bold mb-2">WhatsApp</h4>
                  <p className="text-muted text-sm">Available Mon–Fri, 9AM–6PM</p>
                </div>
                <div className="p-8 rounded-2xl glass-card">
                  <MapPin className="w-8 h-8 text-accent mb-4" />
                  <h4 className="text-white font-bold mb-2">Location</h4>
                  <p className="text-muted text-sm">Remote First · Worldwide</p>
                </div>
                <div className="p-8 rounded-2xl glass-card">
                  <Zap className="w-8 h-8 text-accent2 mb-4" />
                  <h4 className="text-white font-bold mb-2">Response Time</h4>
                  <p className="text-muted text-sm">Within 24 hours guaranteed</p>
                </div>
              </div>

              <div className="pt-8">
                <p className="text-white font-bold mb-6">Follow our journey and see our latest work</p>
                <div className="flex gap-4">
                  {[Linkedin, Twitter, Instagram, Github, Dribbble].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full border border-accent/20 flex items-center justify-center text-muted hover:bg-gradient hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050508] pt-24 pb-12 border-t border-accent/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <a href="#home" className="flex items-center gap-2 mb-6">
                <Zap className="w-6 h-6 text-accent fill-accent" />
                <span className="text-xl font-display font-bold text-white">Floex Studio</span>
              </a>
              <p className="text-muted text-sm leading-relaxed mb-8">
                Building digital products that drive real results. From startups to enterprises, we help you scale.
              </p>
              <div className="flex gap-4">
                <Linkedin className="w-5 h-5 text-muted hover:text-white cursor-pointer" />
                <Twitter className="w-5 h-5 text-muted hover:text-white cursor-pointer" />
                <Github className="w-5 h-5 text-muted hover:text-white cursor-pointer" />
              </div>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Services</h5>
              <ul className="space-y-4 text-muted text-sm">
                <li className="hover:text-accent cursor-pointer">Web Development</li>
                <li className="hover:text-accent cursor-pointer">Mobile Apps</li>
                <li className="hover:text-accent cursor-pointer">UI/UX Design</li>
                <li className="hover:text-accent cursor-pointer">Cloud & DevOps</li>
                <li className="hover:text-accent cursor-pointer">E-Commerce</li>
                <li className="hover:text-accent cursor-pointer">AI & Automation</li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Company</h5>
              <ul className="space-y-4 text-muted text-sm">
                <li className="hover:text-accent cursor-pointer">About Us</li>
                <li className="hover:text-accent cursor-pointer">Our Work</li>
                <li className="hover:text-accent cursor-pointer">Our Team</li>
                <li className="hover:text-accent cursor-pointer">Pricing</li>
                <li className="hover:text-accent cursor-pointer">Careers</li>
                <li className="hover:text-accent cursor-pointer">Blog</li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Contact</h5>
              <ul className="space-y-4 text-muted text-sm">
                <li>hello@floexstudio.com</li>
                <li>Available Worldwide</li>
                <li>Mon–Fri: 9AM–6PM</li>
                <li>Response: Within 24hrs</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted text-xs">© 2024 Floex Studio. All Rights Reserved.</p>
            <div className="flex gap-6 text-muted text-xs">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer">Terms</span>
              <span className="hover:text-white cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a 
        href="#contact" 
        className="fixed bottom-8 right-8 z-40 px-6 py-3 rounded-full bg-gradient text-white font-bold shadow-2xl shadow-accent/40 flex items-center gap-2 animate-pulse hover:animate-none transition-all"
      >
        <MessageSquare className="w-5 h-5" /> Let&apos;s Talk
      </a>
    </div>
  );
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded-xl border border-accent/10 overflow-hidden transition-all duration-300 ${isOpen ? 'bg-card border-l-4 border-l-accent' : 'bg-card/50'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left"
      >
        <span className="text-white font-display font-medium">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
          <Plus className={`w-5 h-5 ${isOpen ? 'text-accent' : 'text-muted'}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-5"
          >
            <p className="text-muted text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
