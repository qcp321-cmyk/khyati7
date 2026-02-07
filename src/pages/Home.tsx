import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  Database,
  Layers,
  Zap,
  Clock,
  Eye,
  Brain,
  ArrowRight,
  Play,
  Sparkles,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Lock,
  Globe,
  BarChart3,
} from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';

gsap.registerPlugin(ScrollTrigger);

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={countRef} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
};


// Team Intelligence Merge Animation for Hero
const HeroVectorFlow = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center">
      <svg className="w-full h-full max-w-2xl" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient id="mergeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <filter id="glowCore" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glowNode" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grid - Representing the Vector Space */}
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(147, 51, 234, 0.05)" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Team Nodes (Sources of Intelligence) */}
        {[
          { x: 100, y: 150, color: '#9333EA', label: 'Research' },
          { x: 100, y: 350, color: '#A855F7', label: 'Dev' },
          { x: 50, y: 250, color: '#F97316', label: 'Strategy' },
        ].map((node, i) => (
          <motion.g key={`node-${i}`}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={12}
              fill={node.color}
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              filter="url(#glowNode)"
            />
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={25}
              fill="none"
              stroke={node.color}
              strokeWidth="1"
              initial={{ opacity: 0.5, scale: 0.8 }}
              animate={{ opacity: 0, scale: 2 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
            <text x={node.x} y={node.y + 40} textAnchor="middle" className="text-[10px] font-bold fill-gray-400 uppercase tracking-widest">{node.label}</text>
          </motion.g>
        ))}

        {/* Cognitive Streams (Data converging) */}
        {[0, 1, 2].map((i) => {
          const startX = i === 2 ? 50 : 100;
          const startY = i === 0 ? 150 : i === 1 ? 350 : 250;
          return (
            <motion.path
              key={`stream-${i}`}
              d={`M ${startX} ${startY} C ${startX + 150} ${startY}, 250 250, 400 250`}
              fill="none"
              stroke={i === 2 ? 'url(#orangeGradient)' : 'url(#purpleGradient)'}
              strokeWidth="2"
              strokeDasharray="5 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: i * 0.4 }}
            />
          );
        })}

        {/* Flowing Packets (Individual actions/thoughts) */}
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={`pkg-${i}`}
            r={3}
            fill={i % 2 === 0 ? '#9333EA' : '#F97316'}
            filter="url(#glowNode)"
          >
            <animateMotion
              dur={`${2 + Math.random() * 2}s`}
              repeatCount="indefinite"
              path={i % 3 === 0 ? "M 100 150 C 250 150, 250 250, 400 250" : i % 3 === 1 ? "M 100 350 C 250 350, 250 250, 400 250" : "M 50 250 C 200 250, 250 250, 400 250"}
              begin={`${i * 0.6}s`}
            />
          </motion.circle>
        ))}

        {/* Central Cognitive Core (The Merge Point) */}
        <motion.g transform="translate(400, 250)">
          {/* Pulsating background glow */}
          <motion.circle
            r={60}
            fill="url(#purpleGradient)"
            initial={{ opacity: 0.1, scale: 0.8 }}
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="blur-2xl"
          />

          {/* Main Core Shape */}
          <motion.path
            d="M0 -40 L35 -20 L35 20 L0 40 L-35 20 L-35 -20 Z"
            fill="url(#mergeGradient)"
            filter="url(#glowCore)"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Inner pulsating dot */}
          <motion.circle
            r={8}
            fill="white"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <text y="-60" textAnchor="middle" className="text-xs font-black fill-purple-700 uppercase tracking-[0.3em]">Cognitive Core</text>
        </motion.g>

        {/* Perfect Vectors (Output to future/storage) */}
        {[...Array(3)].map((_, i) => (
          <motion.g key={`vector-${i}`}>
            <motion.path
              d={`M 400 250 L 580 ${150 + i * 100}`}
              stroke="url(#orangeGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 2 + i * 1.2, repeatDelay: 3 }}
            />
            <motion.circle
              r={4}
              fill="white"
              animate={{
                cx: [400, 580],
                cy: [250, 150 + i * 100],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 2 + i * 1.2, repeatDelay: 3 }}
            />
          </motion.g>
        ))}

        <text x="500" y="450" textAnchor="middle" className="text-[10px] font-bold fill-orange-500 uppercase tracking-widest animate-pulse">Recording Action Footprints...</text>
      </svg>
    </div>
  );
};

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const { startTracking } = useDemo();

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Feature cards animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Stats animation
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: '.stats-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Event stream items
      gsap.from('.event-item', {
        scrollTrigger: {
          trigger: '.events-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      });

      // Vector cards
      gsap.from('.vector-card', {
        scrollTrigger: {
          trigger: '.vectors-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Cluster cards
      gsap.from('.cluster-card', {
        scrollTrigger: {
          trigger: '.clusters-section',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Sequential Tracking',
      description: 'Every event captured in precise chronological order with millisecond accuracy.',
      color: 'orange',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Context Storage',
      description: 'Rich metadata preserved for complete audit trails and compliance.',
      color: 'amber',
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Audit Clusters',
      description: 'Intelligent grouping with meaningful names for easy review.',
      color: 'orange',
    },
  ];

  const stats = [
    { label: 'Vectors Today', value: 12847, suffix: '', icon: <Activity className="w-5 h-5" />, color: 'orange' },
    { label: 'Uptime', value: 99.99, suffix: '%', icon: <Zap className="w-5 h-5" />, color: 'amber' },
    { label: 'Latency', value: 12, suffix: 'ms', icon: <Clock className="w-5 h-5" />, color: 'orange' },
    { label: 'Vectors/Day', value: 4200000, suffix: '', icon: <Database className="w-5 h-5" />, color: 'amber', format: '4.2M' },
  ];

  const events = [
    { id: '0001', type: 'system_boot', time: '09:00:00', conf: 100, source: 'system' },
    { id: '0002', type: 'screen_awake', time: '09:00:15', conf: 100, source: 'system' },
    { id: '0003', type: 'user_detected', time: '09:00:18', conf: 98, source: 'system' },
    { id: '0004', type: 'auth_success', time: '09:00:25', conf: 100, source: 'system' },
    { id: '0005', type: 'calendar_open', time: '09:01:30', conf: 95, source: 'user' },
    { id: '0006', type: 'email_check', time: '09:02:15', conf: 92, source: 'communication' },
    { id: '0007', type: 'web_search', time: '09:05:42', conf: 88, source: 'user' },
    { id: '0008', type: 'doc_opened', time: '09:08:20', conf: 96, source: 'file' },
  ];

  const vectors = [
    { id: 'vec_001', type: 'system_boot', desc: 'Initial system startup sequence initiated', time: '17:00:00', conf: 100 },
    { id: 'vec_002', type: 'screen_awake', desc: 'Display activated, user presence detected', time: '17:00:15', conf: 100 },
    { id: 'vec_003', type: 'auth_success', desc: 'Biometric authentication validated', time: '17:00:25', conf: 98 },
    { id: 'vec_004', type: 'app_launch', desc: 'Calendar application opened by user', time: '17:01:30', conf: 95 },
    { id: 'vec_005', type: 'email_check', desc: 'Email client sync initiated, 12 new messages', time: '17:02:15', conf: 92 },
    { id: 'vec_006', type: 'video_call', desc: 'Video conference started - Team Standup', time: '17:30:00', conf: 97 },
  ];

  const clusters = [
    { name: 'Morning Standup Session', id: 'clust_001', desc: 'Daily team sync meeting with video conference', status: 'active', events: 47, time: '09:00 - 09:30', confidence: 96 },
    { name: 'Deep Work Session', id: 'clust_002', desc: 'Focused coding period with minimal distractions', status: 'active', events: 123, time: '10:00 - 12:00', confidence: 92 },
    { name: 'Client Communication', id: 'clust_003', desc: 'Email and messaging activity related to clients', status: 'reviewing', events: 34, time: '14:00 - 15:30', confidence: 88 },
    { name: 'System Maintenance', id: 'clust_004', desc: 'Automated backup and system update processes', status: 'archived', events: 15, time: '02:00 - 03:00', confidence: 99 },
    { name: 'Security Review', id: 'clust_005', desc: 'Access logs and security dashboard monitoring', status: 'active', events: 28, time: '16:00 - 17:00', confidence: 94 },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative min-h-screen flex items-center justify-center pt-20 lg:pt-0"
      >
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, transparent 60%)' }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 60%)' }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Next-Gen Activity Intelligence</span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight text-gray-900"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Immutable
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-orange-500 bg-clip-text text-transparent">
                  Collective Intelligence
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-gray-500 font-medium mb-8 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Capture the collective brain of your team. Merge every action, expertise, and decision into high-fidelity vectors to preserve your organizational DNA for future action.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link to="/demo" onClick={() => startTracking()}>
                  <motion.button
                    className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold overflow-hidden shadow-lg shadow-orange-500/30"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start Tracking
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-500"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                <Link to="/demo" onClick={() => startTracking()}>
                  <motion.button
                    className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold flex items-center gap-2 hover:border-purple-300 hover:text-purple-600 transition-all"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: <ShieldCheck className="w-5 h-5 text-purple-600" />, label: 'GDPR Compliant' },
                  { icon: <Lock className="w-5 h-5 text-purple-600" />, label: 'Enterprise Security' },
                  { icon: <Globe className="w-5 h-5 text-purple-600" />, label: 'Global Edge Network' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-400 hover:text-purple-600 transition-colors cursor-default group">
                    <span className="text-gray-300 group-hover:text-purple-500 transition-colors">{item.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider">{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Vector Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-purple-50/50 via-white to-orange-50/50 rounded-3xl p-6 lg:p-8 border border-purple-100/30 shadow-2xl shadow-purple-200/20">
                {/* Live indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-600"></span>
                    </span>
                    <span className="text-sm font-bold text-gray-700 tracking-tight uppercase">Live Cognitive Merge</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-100/50 text-purple-700 text-[10px] font-black uppercase tracking-widest">v2.4.0</span>
                </div>

                {/* Vector Flow */}
                <div className="h-56 lg:h-80 bg-white/40 rounded-2xl overflow-hidden border border-purple-100/20 backdrop-blur-sm">
                  <HeroVectorFlow />
                </div>

                {/* Stats overlay */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: 'Vectors', value: '12,847', color: 'purple' },
                    { label: 'Uptime', value: '99.99%', color: 'orange' },
                    { label: 'Latency', value: '12ms', color: 'purple' },
                  ].map((stat, i) => (
                    <div key={i} className={`bg-white/60 p-3 rounded-2xl border border-${stat.color}-100/50 text-center`}>
                      <div className={`text-lg font-black text-${stat.color}-600`}>{stat.value}</div>
                      <div className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-100/50 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-100/50 rounded-full blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
    </div >
      </motion.section >

    {/* Features Section */ }
    < section className = "features-section py-20 lg:py-28" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="feature-card flex items-center gap-5 px-8 py-6 bg-white rounded-2xl shadow-lg shadow-orange-100/40 border border-orange-50 cursor-pointer group"
              whileHover={{ y: -8, scale: 1.02, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.25)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`w-14 h-14 rounded-xl bg-${feature.color}-100 flex items-center justify-center text-${feature.color}-600 group-hover:scale-110 transition-transform`}
                whileHover={{ rotate: 5 }}
              >
                {feature.icon}
              </motion.div>
              <div>
                <div className="font-semibold text-gray-800 text-lg group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </div>
                <div className="text-sm text-gray-500">{feature.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </section >

    {/* Stats Section */ }
    < section className = "stats-section py-20 lg:py-28 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="stat-card bg-white rounded-2xl p-6 lg:p-8 shadow-lg shadow-orange-100/30 border border-orange-50 cursor-pointer group"
              whileHover={{ y: -10, scale: 1.03, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.2)' }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`w-14 h-14 rounded-xl bg-${stat.color}-100 flex items-center justify-center text-${stat.color}-600 mb-5 group-hover:scale-110 transition-transform`}
                whileHover={{ rotate: 10 }}
              >
                {stat.icon}
              </motion.div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-800 mb-1">
                {stat.format || <AnimatedCounter end={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
      </section >

    {/* Events Section */ }
    < section className = "events-section py-20 lg:py-28" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Eye className="w-4 h-4" />
              Real-time Event Tracking
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
              From Awake to Shutdown
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Every micro-event is captured as a vector with precise timestamps,
              confidence scores, and contextual metadata for complete audit trails.
            </p>

            <div className="space-y-4">
              {[
                { label: 'Events Tracked', value: 23, suffix: '', color: 'orange' },
                { label: 'Avg Confidence', value: 94, suffix: '%', color: 'amber' },
                { label: 'Time Span', value: 85, suffix: '%', color: 'orange', display: '3h 10m' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 text-sm text-gray-500">{item.label}</div>
                  <div className="flex-1">
                    <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                      />
                    </div>
                  </div>
                  <div className="w-20 text-right font-mono text-sm text-gray-700">
                    {item.display || `${item.value}${item.suffix}`}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Event Stream Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gray-900 rounded-3xl p-4 lg:p-6 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-gray-500 font-mono">event_stream.log</span>
              </div>

              <div className="space-y-2 max-h-80 overflow-hidden">
                {events.map((event, i) => (
                  <motion.div
                    key={event.id}
                    className="event-item flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-xs font-mono text-gray-500">#{event.id}</span>
                    <span className="px-2 py-1 rounded text-xs border border-gray-700 text-gray-400">
                      {event.source}
                    </span>
                    <span className="flex-1 font-mono text-sm text-gray-300 group-hover:text-orange-400 transition-colors">
                      {event.type}
                    </span>
                    <span className="text-xs font-mono text-gray-500">{event.time}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-gray-700 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-orange-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${event.conf}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.5 + i * 0.05 }}
                        />
                      </div>
                      <span className="text-xs text-orange-400">{event.conf}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </section >

    {/* Vector Storage Section */ }
    < section className = "vectors-section py-20 lg:py-28 bg-gradient-to-b from-orange-50/30 via-transparent to-amber-50/20" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <Database className="w-4 h-4" />
            Sequential Context Storage
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
            Vectors Stored in Sequence
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Each vector is stored with complete context, maintaining temporal relationships
            and enabling powerful audit capabilities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Vector list */}
          <div className="lg:col-span-2 space-y-3">
            {vectors.map((vec, i) => (
              <motion.div
                key={vec.id}
                className="vector-card flex items-center gap-4 p-4 lg:p-5 bg-white rounded-2xl shadow-md shadow-orange-100/30 border border-orange-50 cursor-pointer group"
                whileHover={{ x: 10, scale: 1.01, boxShadow: '0 20px 40px -12px rgba(249, 115, 22, 0.2)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-mono text-sm font-bold group-hover:scale-110 transition-transform">
                  {i + 1}
                </div>
                <div className="w-20 font-mono text-sm text-orange-600">{vec.id}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {vec.type}
                  </div>
                  <div className="text-sm text-gray-500 truncate">{vec.desc}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono text-gray-500">{vec.time}</div>
                  <div className="text-xs text-orange-600 font-medium">{vec.conf}% conf</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Storage stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg shadow-orange-100/30 border border-orange-50"
          >
            <h3 className="font-bold mb-6 flex items-center gap-2 text-gray-800">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              Storage Stats
            </h3>

            <div className="space-y-6">
              {[
                { label: 'Total Vectors', value: 1046, color: 'orange' },
                { label: 'Storage Size', value: 80, display: '2.4 MB', color: 'amber' },
                { label: 'Compression', value: 78, color: 'orange' },
                { label: 'Indexed Fields', value: 60, display: '12', color: 'amber' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">{stat.label}</span>
                    <span className="font-mono font-medium text-gray-700">
                      {stat.display || stat.value}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${stat.value > 100 ? 100 : stat.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500 mb-4">Relationship Types</div>
              <div className="flex flex-wrap gap-2">
                {['Temporal', 'Causal', 'Semantic', 'Hierarchical'].map((type, i) => (
                  <motion.span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-600 cursor-pointer hover:bg-orange-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    {type}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </section >

    {/* Clusters Section */ }
    < section className = "clusters-section py-20 lg:py-28" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
            <Layers className="w-4 h-4" />
            Audit-Ready Clustering
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
            Named Clusters for Easy Audit
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Events are automatically grouped into semantic clusters with meaningful names,
            making it easy to build audit contexts.
          </p>
        </motion.div>

        {/* Cluster stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { label: 'Total Clusters', value: '24', color: 'orange' },
            { label: 'Active', value: '18', color: 'amber' },
            { label: 'Under Review', value: '4', color: 'yellow' },
            { label: 'Archived', value: '2', color: 'gray' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-4 lg:p-6 bg-white rounded-2xl shadow-md shadow-orange-100/20 border border-orange-50 cursor-pointer"
              whileHover={{ y: -5, scale: 1.02, boxShadow: '0 20px 40px -12px rgba(249, 115, 22, 0.15)' }}
              transition={{ duration: 0.2 }}
            >
              <div className={`text-2xl lg:text-3xl font-bold text-${stat.color}-600 mb-1`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cluster cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {clusters.map((cluster, i) => {
            const [isExpanded, setIsExpanded] = useState(false);
            return (
              <motion.div
                key={i}
                layout
                onClick={() => setIsExpanded(!isExpanded)}
                className={`cluster-card bg-white rounded-3xl p-5 lg:p-6 shadow-md shadow-orange-100/20 border border-orange-50 cursor-pointer group transition-all duration-300 ${isExpanded ? 'lg:col-span-2 row-span-2' : ''
                  }`}
                whileHover={{ y: -8, scale: isExpanded ? 1 : 1.02, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.2)' }}
              >
                <motion.div layout className="flex items-start justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${cluster.status === 'active'
                      ? 'bg-amber-100 text-amber-700'
                      : cluster.status === 'reviewing'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600'
                      }`}
                  >
                    {cluster.status}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{cluster.id}</span>
                </motion.div>

                <motion.h3 layout className="font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                  {cluster.name}
                </motion.h3>
                <motion.p layout className="text-sm text-gray-500 mb-4">{cluster.desc}</motion.p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 pt-4 border-t border-orange-50 space-y-3"
                    >
                      <div className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2">Cluster Event Details</div>
                      {[
                        { type: 'user_auth', time: '0m ago', status: 'verified' },
                        { type: 'resource_access', time: '2m ago', status: 'success' },
                        { type: 'vector_sync', time: '5m ago', status: 'completed' },
                        { type: 'pattern_match', time: '12m ago', status: 'high' }
                      ].map((evt, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-orange-50/50 rounded-xl text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                            <span className="font-mono font-medium text-gray-700">{evt.type}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400">{evt.time}</span>
                            <span className="text-orange-600 font-bold">{evt.status}</span>
                          </div>
                        </div>
                      ))}
                      <div className="pt-4">
                        <button className="w-full py-2 bg-orange-600 text-white rounded-xl text-xs font-bold hover:bg-orange-700 transition-colors">
                          Build Complete Audit Trail
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div layout className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-500">
                    <span>{cluster.events} events</span>
                    <span>{cluster.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${cluster.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs text-amber-600 font-medium">{cluster.confidence}%</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      </section >

    {/* CTA Section */ }
    < section className = "py-20 lg:py-28" >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-orange-600 to-orange-700 rounded-3xl p-8 lg:p-12 text-center overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          {/* Animated orbs */}
          <motion.div
            className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-white/10"
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-white/5"
            animate={{ scale: [1, 1.3, 1], y: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          <div className="relative z-10">
            <motion.div
              className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Brain className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-white">
              Ready to Track Every Moment?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-xl mx-auto">
              Start building comprehensive audit trails today. Capture every event
              from screen awake to shutdown.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/demo">
                <motion.button
                  className="px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold flex items-center gap-2 hover:bg-orange-50 transition-colors shadow-lg"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  className="px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      </section >
    </div >
  );
}
