import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import {
  Github,
  Linkedin,
  Code2,
  Terminal,
  Download,
  Mail,
  Menu,
  X,
  ChevronDown,
  BrainCircuit,
  Database,
  Cloud,
  Layout,
  Server,
  Award,
} from "lucide-react";
import {
  FaPython,
  FaReact,
  FaAws,
  FaDocker,
  FaHackerrank,
} from "react-icons/fa";
import {
  SiLeetcode,
  SiFlask,
  SiPostgresql,
  SiTypescript,
} from "react-icons/si";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import { useCreateContactMessage } from "@/hooks/use-contact";
import { insertContactMessageSchema } from "@shared/schema";

// Form Schema
const formSchema = insertContactMessageSchema;

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const createMessage = useCreateContactMessage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createMessage.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-[100]">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-primary">
            MM
          </div>
        </motion.div>
      </div>
    );
  }

  const navLinks = [
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgress />
      <ParticleBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary cursor-pointer"
            >
              <ScrollLink to="hero" smooth={true} duration={500}>
                M<span className="text-foreground">M.</span>
              </ScrollLink>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <ScrollLink
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={-64}
                  className="cursor-pointer text-sm font-medium hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </ScrollLink>
              ))}
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground p-2"
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-b border-border"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                {navLinks.map((link) => (
                  <ScrollLink
                    key={link.name}
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-64}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                  >
                    {link.name}
                  </ScrollLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative pt-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center md:text-left space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 border border-primary/20">
              Available for Opportunities
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight">
              Hi, I'm <br />
              <span className="text-gradient">Mandala Madhuri</span>
            </h1>
            <div className="text-xl md:text-2xl text-muted-foreground h-[60px] md:h-[40px]">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "AI/ML Enthusiast",
                  2000,
                  "Cloud Engineer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Building intelligent systems and scalable web applications with
              modern technologies. Transforming complex problems into elegant
              solutions.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <Button
                size="lg"
                className="rounded-full px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
                asChild
              >
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  offset={-64}
                  className="cursor-pointer"
                >
                  Contact Me <Mail className="ml-2 h-4 w-4" />
                </ScrollLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base hover:bg-accent/10"
                asChild
              >
                <a
                  href="https://drive.google.com/file/d/1CvwFXwm85Pp8tutHYnLoDXlhccxEfiFU/view?usp=drivesdk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download CV <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-6 pt-6">
              {[
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/madhuri-mandala-4238822ba",
                  label: "LinkedIn",
                },
                {
                  icon: Github,
                  href: "https://github.com/MadhuriReddy-dev",
                  label: "GitHub",
                },
                {
                  icon: SiLeetcode,
                  href: "https://leetcode.com/u/Madhuri_Mandala-11/",
                  label: "LeetCode",
                },
                {
                  icon: FaHackerrank,
                  href: "https://www.hackerrank.com/profile/madhurimandala11",
                  label: "HackerRank",
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                  <span className="sr-only">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-full blur-2xl opacity-30 animate-pulse" />
              <div className="relative w-full h-full rounded-full border-4 border-background shadow-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
                {/* Placeholder Avatar */}
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/10">MM</span>
                  <img
                    src="/images/madhuri_mandala.jpeg"
                    alt="Mandala Madhuri"
                    className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Floating Tech Icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute -top-4 -right-4 bg-card p-3 rounded-xl shadow-lg border border-border/50"
              >
                <FaReact className="w-8 h-8 text-blue-400" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute top-1/2 -left-8 bg-card p-3 rounded-xl shadow-lg border border-border/50"
              >
                <FaPython className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 2 }}
                className="absolute -bottom-4 right-1/4 bg-card p-3 rounded-xl shadow-lg border border-border/50"
              >
                <FaAws className="w-8 h-8 text-orange-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            offset={-64}
            className="cursor-pointer text-muted-foreground hover:text-primary"
          >
            <ChevronDown className="w-8 h-8" />
          </ScrollLink>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 bg-card/30 backdrop-blur-sm relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="About Me"
            subtitle="My journey and educational background"
          />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 text-lg text-muted-foreground leading-relaxed"
            >
              <p>
                I am a passionate{" "}
                <span className="text-primary font-semibold">
                  B.Tech Computer Science student
                </span>{" "}
                at SR University (2023–2027) with a stellar CGPA of{" "}
                <span className="text-foreground font-bold">8.7/10</span>.
              </p>
              <p>
                My journey in technology is driven by a curiosity to solve
                real-world problems. I have honed my skills as an{" "}
                <span className="text-primary font-semibold">
                  AI/ML Intern at AICTE Eduskills
                </span>
                , gaining hands-on experience in building intelligent models.
              </p>
              <p>
                With strong proficiency in{" "}
                <span className="text-foreground font-semibold">
                  Python, React, Flask, and PostgreSQL
                </span>
                , I bridge the gap between complex backend logic and intuitive
                frontend design. I am deeply enthusiastic about Cloud Computing
                and constantly expanding my knowledge in AWS.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  label: "CGPA",
                  value: "8.7/10",
                  icon: Award,
                  color: "text-yellow-500",
                },
                {
                  label: "Experience",
                  value: "Internship",
                  icon: Terminal,
                  color: "text-blue-500",
                },
                {
                  label: "Projects",
                  value: "10+",
                  icon: Code2,
                  color: "text-green-500",
                },
                {
                  label: "Certifications",
                  value: "AWS & Cisco",
                  icon: Award,
                  color: "text-purple-500",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-card/50 border border-border/50 p-6 rounded-2xl text-center hover:bg-accent/5 transition-colors group"
                >
                  <stat.icon
                    className={`w-8 h-8 mx-auto mb-3 ${stat.color} group-hover:scale-110 transition-transform`}
                  />
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 z-[-1]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Technical Skills"
            subtitle="Technologies I work with"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                category: "Frontend",
                icon: Layout,
                skills: [
                  "React.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "HTML5/CSS3",
                  "Bootstrap",
                ],
              },
              {
                category: "Backend",
                icon: Server,
                skills: [
                  "Python",
                  "Flask",
                  "Node.js",
                  "REST APIs",
                  "SQLAlchemy",
                ],
              },
              {
                category: "Database & Tools",
                icon: Database,
                skills: [
                  "PostgreSQL",
                  "MySQL",
                  "Git & GitHub",
                  "VS Code",
                  "Docker",
                ],
              },
              {
                category: "Core & AI",
                icon: BrainCircuit,
                skills: [
                  "Data Structures",
                  "OOPs",
                  "Machine Learning",
                  "NLP",
                  "AWS Cloud",
                ],
              },
            ].map((domain, index) => (
              <motion.div
                key={domain.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <domain.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold">{domain.category}</h3>
                </div>
                <div className="space-y-3">
                  {domain.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Experience"
            subtitle="My professional journey"
          />

          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-0 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0"
            >
              <div className="md:flex items-center justify-between group">
                <div className="hidden md:block w-5/12 text-right pr-8">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    AI/ML Intern
                  </h3>
                  <p className="text-primary font-medium">AICTE Eduskills</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Oct 2024 – Dec 2024
                  </p>
                </div>

                <div className="absolute left-[-5px] md:left-1/2 md:-ml-[9px] w-4 h-4 rounded-full bg-background border-4 border-primary z-10 group-hover:scale-125 transition-transform" />

                <div className="md:w-5/12 pl-0 md:pl-8">
                  <div className="md:hidden mb-4">
                    <h3 className="text-xl font-bold">AI/ML Intern</h3>
                    <p className="text-primary font-medium">AICTE Eduskills</p>
                    <p className="text-sm text-muted-foreground">
                      Oct 2024 – Dec 2024
                    </p>
                  </div>
                  <ul className="space-y-2 text-muted-foreground list-disc ml-4">
                    <li>
                      Worked on supervised & unsupervised learning algorithms.
                    </li>
                    <li>
                      Conducted model evaluation and hyperparameter tuning.
                    </li>
                    <li>Developed mini projects in Computer Vision and NLP.</li>
                    <li>
                      Gained exposure to AWS & Azure ML services for deployment.
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Projects"
            subtitle="Some things I've built"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Campus Connect Hub",
                description:
                  "A full-stack university communication system facilitating seamless announcements and event management. Features a scalable backend with PostgreSQL and robust authentication.",
                tags: [
                  "React",
                  "TypeScript",
                  "Flask",
                  "PostgreSQL",
                  "Tailwind",
                ],
                links: { github: "#", demo: "#" },
              },
              {
                title: "Hostel Management Portal",
                description:
                  "Role-based dashboard for efficient hostel administration. Includes room booking, fee payments, and a complaint management system with a responsive UI.",
                tags: ["HTML", "Bootstrap", "JavaScript", "PHP", "MySQL"],
                links: { github: "#", demo: "#" },
              },
              {
                title: "AI Study Dashboard 2",
                description:
                  "A scalable single-page application (SPA) built using React with Firebase Authentication and Firestore for secure user management and real-time data handling. Features include task management, study analytics, calendar scheduling, and note-taking, enhanced with Recharts, React Big Calendar, and Framer Motion. Deployed on Vercel with optimized performance.",
                tags: [
                  "React",
                  "Firebase",
                  "Vite",
                  "Tailwind CSS",
                  "REST APIs",
                  "Authentication",
                  "Recharts",
                  "Framer Motion",
                  "Vercel",
                ],
                links: { github: "#", demo: "#" },
              },
            ].map((project, idx) => (
              <ProjectCard key={idx} index={idx} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className="py-24 bg-card/30 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Certifications & Awards" />

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Cloud className="text-primary" /> Certifications
              </h3>
              <ul className="space-y-4">
                {[
                  "AWS Cloud Foundations (2025)",
                  "CCNA: Introduction to Networks",
                  "Cisco Endpoint Security",
                  "Python Programming (Coursera)",
                ].map((cert, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    {cert}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border/50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Award className="text-yellow-500" /> Achievements
              </h3>
              <ul className="space-y-4">
                {[
                  "Semester Topper Award (2024–25)",
                  "Outstanding Academic Excellence Award",
                  "Solved 200+ Problems on LeetCode",
                  "5 Star Badge in Python on HackerRank",
                ].map((award, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    {award}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-[-1]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Get In Touch"
            subtitle="Let's build something amazing together"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-bold">Contact Information</h3>
              <p className="text-muted-foreground text-lg">
                I'm currently looking for internships and full-time
                opportunities. Whether you have a question or just want to say
                hi, I'll try my best to get back to you!
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Me</p>
                    <a
                      href="mailto:madhurimandala11@gmail.com"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      madhurimandala11@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Layout className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call Me</p>
                    <a
                      href="tel:+919177134115"
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      +91 91771 34115
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-lg font-medium">Warangal, Telangana</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {[
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Github, href: "https://github.com" },
                  { icon: SiLeetcode, href: "https://leetcode.com" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="yourmail@example.com"
                              {...field}
                              className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            className="min-h-[150px] bg-background/50 border-border/50 focus:border-primary transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                    disabled={createMessage.isPending}
                  >
                    {createMessage.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Mandala Madhuri. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
