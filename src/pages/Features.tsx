import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  Database,
  Layers,
  Zap,
  Shield,
  Clock,
  Brain,
  Lock,
  Globe,
  Server,
  Cpu,
  BarChart3,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Activity className="w-8 h-8" />,
    title: 'Real-time Event Tracking',
    description: 'Capture every micro-event as it happens with millisecond precision. Our system tracks mouse movements, clicks, scrolls, keystrokes, and more.',
    benefits: ['Sub-millisecond latency', 'Zero data loss', 'Automatic recovery'],
    color: 'purple',
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: 'Vector Storage Engine',
    description: 'Store events as contextual vectors with rich metadata. Each vector maintains temporal relationships for powerful audit capabilities.',
    benefits: ['78% compression ratio', 'Temporal indexing', 'Causal linking'],
    color: 'orange',
  },
  {
    icon: <Layers className="w-8 h-8" />,
    title: 'Intelligent Clustering',
    description: 'AI-powered clustering automatically groups related events into meaningful audit contexts with semantic understanding.',
    benefits: ['Semantic analysis', 'Auto-naming', 'Pattern detection'],
    color: 'purple',
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Predictive Analytics',
    description: 'Machine learning models predict user behavior and identify anomalies with confidence scores for proactive monitoring.',
    benefits: ['95%+ accuracy', 'Real-time scoring', 'Anomaly alerts'],
    color: 'orange',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption, SOC 2 compliance, and GDPR-ready features ensure your data is always protected.',
    benefits: ['AES-256 encryption', 'SOC 2 Type II', 'GDPR compliant'],
    color: 'purple',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global CDN',
    description: 'Edge-deployed infrastructure ensures low latency and high availability across all regions worldwide.',
    benefits: ['50ms latency', '99.99% uptime', '200+ edge nodes'],
    color: 'orange',
  },
];

const capabilities = [
  { icon: <Zap className="w-5 h-5" />, text: '4.2M vectors processed daily' },
  { icon: <Clock className="w-5 h-5" />, text: 'Sub-50ms response time' },
  { icon: <Server className="w-5 h-5" />, text: 'Unlimited storage scaling' },
  { icon: <Cpu className="w-5 h-5" />, text: 'Real-time stream processing' },
  { icon: <BarChart3 className="w-5 h-5" />, text: 'Advanced analytics dashboard' },
  { icon: <Lock className="w-5 h-5" />, text: 'End-to-end encryption' },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      gsap.from('.capability-item', {
        scrollTrigger: {
          trigger: '.capabilities-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-20 lg:pt-24">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-b from-purple-100/30 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Powerful Capabilities
            </span>
            <h1 className="text-4xl lg:text-6xl font-black mb-6 text-gray-900 tracking-tight">
              Engineering the
              <span className="block bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                Cognitive Future
              </span>
            </h1>
            <p className="text-lg text-gray-50 font-medium text-gray-500 mb-8 leading-relaxed">
              From high-fidelity event capture to predictive cognitive flows, kHyAtI-7 provides
              the ultimate infrastructure for organizational intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={sectionRef} className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => {
              const [isExpanded, setIsExpanded] = useState(false);
              return (
                <motion.div
                  key={feature.title}
                  layout
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="feature-card bg-white rounded-2xl p-6 lg:p-8 shadow-lg shadow-orange-100/30 border border-orange-50 group cursor-pointer"
                  whileHover={{ y: isExpanded ? 0 : -10, scale: isExpanded ? 1 : 1.02, boxShadow: '0 30px 60px -15px rgba(249, 115, 22, 0.25)' }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    layout
                    className={`w-16 h-16 rounded-2xl bg-${feature.color}-100 flex items-center justify-center text-${feature.color}-600 mb-6 group-hover:scale-110 transition-transform`}
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3 layout className={`text-xl font-bold text-gray-800 mb-3 group-hover:text-${feature.color}-600 transition-colors`}>
                    {feature.title}
                  </motion.h3>
                  <motion.p layout className="text-gray-600 mb-6 leading-relaxed text-sm">{feature.description}</motion.p>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`mb-6 space-y-4 pt-4 border-t border-${feature.color}-50`}
                      >
                        <div className="text-xs font-black uppercase tracking-widest text-gray-400">Cognitive Insights</div>
                        <div className="grid grid-cols-1 gap-2">
                          {feature.benefits.map((benefit, j) => (
                            <div key={j} className={`flex items-center gap-3 p-3 bg-${feature.color}-50/50 rounded-xl text-xs font-bold text-gray-700 border border-${feature.color}-100/20`}>
                              <CheckCircle2 className={`w-4 h-4 text-${feature.color}-500 flex-shrink-0`} />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <ul className="space-y-3">
                      {feature.benefits.slice(0, 2).map((benefit, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                          <div className={`w-1.5 h-1.5 rounded-full bg-${feature.color}-400`} />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="capabilities-section py-20 lg:py-28 bg-gradient-to-b from-purple-50/30 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-black mb-4 text-gray-900 tracking-tight">
              Platform Durability
            </h2>
            <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
              Built for high-concurrency event merging and cognitive persistence.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                className="capability-item flex items-center gap-4 p-5 bg-white rounded-2xl shadow-xl shadow-purple-100/20 border border-purple-50 group"
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                  {cap.icon}
                </div>
                <span className="font-bold text-gray-700 tracking-tight">{cap.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
              Start tracking your application activity today with our free tier.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/demo">
                <motion.button
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-purple-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/pricing">
                <motion.button
                  className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-xl font-bold hover:border-purple-300 hover:text-purple-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
