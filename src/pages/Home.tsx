import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
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

import { useState } from 'react';

// Vector Flow Visualization for Hero
const HeroVectorFlow = () => {
  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="50%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="heroGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated paths */}
        {[0, 1, 2, 3].map((i) => (
          <motion.path
            key={i}
            d={`M ${50 + i * 80} 50 Q ${100 + i * 80} ${100 + i * 30} ${50 + (i + 1) * 80} ${150 + i * 20}`}
            fill="none"
            stroke="url(#heroGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}

        {/* Animated nodes */}
        {[
          { x: 50, y: 50 },
          { x: 130, y: 100 },
          { x: 210, y: 80 },
          { x: 290, y: 130 },
          { x: 370, y: 100 },
        ].map((pos, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={20}
              fill="none"
              stroke="#F97316"
              strokeWidth={1}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.5, opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r={8}
              fill={i % 2 === 0 ? '#F97316' : '#F59E0B'}
              filter="url(#heroGlow)"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            />
          </motion.g>
        ))}

        {/* Floating data packets */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`packet-${i}`}
            r={4}
            fill="#F59E0B"
            filter="url(#heroGlow)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cx: [50 + i * 100, 150 + i * 100],
              cy: [50 + i * 30, 100 + i * 20],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
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
            style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.12) 0%, transparent 60%)' }}
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 60%)' }}
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">Next-Gen Activity Intelligence</span>
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Track Every
                <br />
                <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                  Track Every Moment
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-gray-600 mb-8 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                From screen awake to shutdown, we capture every micro-event as a contextual vector.
                Build powerful audit trails with sequential storage and intelligent clustering.
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
                    className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-semibold flex items-center gap-2 hover:border-orange-300 hover:text-orange-600 transition-all"
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
                className="flex flex-wrap items-center gap-6 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: 'GDPR Compliant' },
                  { icon: <Shield className="w-5 h-5" />, text: 'Enterprise Security' },
                  { icon: <Globe className="w-5 h-5" />, text: 'Global CDN' },
                ].map((badge, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-orange-500">{badge.icon}</span>
                    <span>{badge.text}</span>
                  </motion.div>
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
              <div className="relative bg-gradient-to-br from-orange-50 via-white to-amber-50 rounded-3xl p-6 lg:p-8 border border-orange-100 shadow-2xl shadow-orange-200/50">
                {/* Live indicator */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                    <span className="text-sm font-medium text-gray-700">Live Tracking</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium">v2.4.0</span>
                </div>

                {/* Vector Flow */}
                <div className="h-56 lg:h-72 bg-white/70 rounded-2xl overflow-hidden border border-orange-50">
                  <HeroVectorFlow />
                </div>

                {/* Stats overlay */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[
                    { label: 'Vectors', value: '12,847', color: 'orange' },
                    { label: 'Uptime', value: '99.99%', color: 'emerald' },
                    { label: 'Latency', value: '12ms', color: 'orange' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="text-center p-3 bg-white/80 rounded-xl border border-orange-50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      <div className={`text-xl lg:text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Activity className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                whileHover={{ scale: 1.1, rotate: -10 }}
              >
                <Zap className="w-7 h-7 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="features-section py-20 lg:py-28">
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
      </section>

      {/* Stats Section */}
      <section className="stats-section py-20 lg:py-28 bg-gradient-to-b from-transparent via-orange-50/30 to-transparent">
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
      </section>

      {/* Events Section */}
      <section className="events-section py-20 lg:py-28">
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
      </section>

      {/* Vector Storage Section */}
      <section className="vectors-section py-20 lg:py-28 bg-gradient-to-b from-orange-50/30 via-transparent to-amber-50/20">
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
      </section>

      {/* Clusters Section */}
      <section className="clusters-section py-20 lg:py-28">
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
            {clusters.map((cluster, i) => (
              <motion.div
                key={i}
                className="cluster-card bg-white rounded-2xl p-5 lg:p-6 shadow-md shadow-orange-100/20 border border-orange-50 cursor-pointer group"
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 25px 50px -12px rgba(249, 115, 22, 0.2)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
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
                </div>

                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-orange-600 transition-colors">
                  {cluster.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{cluster.desc}</p>

                <div className="flex items-center justify-between text-sm">
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
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
      </section>
    </div>
  );
}
