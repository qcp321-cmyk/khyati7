import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Target,
  Brain,
  MousePointer,
  Zap,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';

interface TrackedEvent {
  id: string;
  type: string;
  timestamp: number;
  data: Record<string, any>;
  confidence: number;
  vector: { x: number; y: number };
}

const eventIcons: Record<string, React.ReactNode> = {
  mouse_move: <MousePointer className="w-4 h-4" />,
  mouse_click: <Target className="w-4 h-4" />,
  scroll: <Activity className="w-4 h-4" />,
  keypress: <Activity className="w-4 h-4" />,
  hover: <Activity className="w-4 h-4" />,
};

// Vector Flow Visualization
const VectorFlowVisualization = ({ events }: { events: TrackedEvent[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width || 600, height: rect.height || 300 });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const nodes = events.slice(-20).map((event, i) => ({
    id: event.id,
    x: 50 + (i % 6) * ((dimensions.width - 100) / 5),
    y: 50 + Math.floor(i / 6) * 70,
    type: event.type,
    active: i === events.slice(-20).length - 1,
  }));

  const paths = nodes.slice(0, -1).map((node, i) => ({
    id: `path-${i}`,
    d: `M ${node.x} ${node.y} Q ${(node.x + nodes[i + 1].x) / 2} ${node.y - 25} ${nodes[i + 1].x} ${nodes[i + 1].y}`,
    active: node.active || nodes[i + 1]?.active,
  }));

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="demoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <filter id="demoGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {paths.map((path, i) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke="url(#demoGradient)"
          strokeWidth={path.active ? 2.5 : 1.5}
          strokeLinecap="round"
          strokeDasharray="6 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.03 }}
        />
      ))}

      {paths.map((path, i) => (
        <motion.circle
          key={`packet-${i}`}
          r={3}
          fill="#F97316"
          filter="url(#demoGlow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity, ease: 'linear' }}
        >
          <animateMotion dur="1.2s" repeatCount="indefinite" path={path.d} />
        </motion.circle>
      ))}

      {nodes.map((node, i) => (
        <motion.g key={node.id}>
          {node.active && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={15}
              fill="none"
              stroke="#F97316"
              strokeWidth={1}
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.active ? 8 : 5}
            fill={node.active ? '#F97316' : '#FFEDD5'}
            stroke="#F97316"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: i * 0.02 }}
            filter="url(#demoGlow)"
          />
        </motion.g>
      ))}
    </svg>
  );
};

export default function Demo() {
  const {
    isTracking,
    trackedEvents,
    trackingTime,
    predictions,
    hasStarted,
    startTracking,
    stopTracking,
    resetTracking
  } = useDemo();

  return (
    <div className="pt-20 lg:pt-24 min-h-screen">
      {/* Hero */}
      <section className="relative py-12 lg:py-20 bg-gradient-to-b from-orange-50/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Live Demo
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              Experience
              <span className="block bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Real-Time Tracking
              </span>
            </h1>
            <p className="text-lg text-gray-600">
              See how kHyAtI-7 captures every interaction. Move your mouse, click around,
              and watch the vectors flow in real-time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Demo Dashboard */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {!hasStarted ? (
              <motion.button
                onClick={startTracking}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-orange-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                Start Tracking Demo
              </motion.button>
            ) : (
              <>
                <motion.button
                  onClick={isTracking ? stopTracking : startTracking}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${isTracking
                      ? 'bg-slate-800 text-white shadow-lg'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isTracking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isTracking ? 'Pause' : 'Resume'}
                </motion.button>
                <motion.button
                  onClick={resetTracking}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </motion.button>
              </>
            )}
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { label: 'Events', value: trackedEvents.length, color: 'orange' },
              { label: 'Time', value: `${trackingTime}s`, color: 'amber' },
              { label: 'Clicks', value: trackedEvents.filter((e) => e.type === 'mouse_click').length, color: 'orange' },
              { label: 'Confidence', value: trackedEvents.length > 0 ? `${Math.round(trackedEvents.reduce((acc, e) => acc + e.confidence, 0) / trackedEvents.length)}%` : '0%', color: 'amber' },
            ].map((stat, i) => (
              <div key={i} className={`bg-${stat.color}-50 rounded-2xl p-4 text-center`}>
                <div className={`text-2xl lg:text-3xl font-bold text-${stat.color}-600`}>{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Main Dashboard */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Vector Flow */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-lg shadow-orange-100/30 border border-orange-50"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                Vector Flow Map
              </h3>
              <div className="h-64 bg-gray-50 rounded-2xl overflow-hidden">
                {hasStarted ? (
                  <VectorFlowVisualization events={trackedEvents} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Click Start to see vector visualization</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Event Stream */}
            <motion.div
              className="bg-white rounded-3xl p-6 shadow-lg shadow-orange-100/30 border border-orange-50"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-orange-500" />
                Event Stream
              </h3>
              <div className="h-64 bg-gray-50 rounded-2xl overflow-auto p-3 space-y-2">
                {trackedEvents.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <p>Events will appear here</p>
                  </div>
                ) : (
                  trackedEvents
                    .slice()
                    .reverse()
                    .map((event) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-2 bg-white rounded-lg text-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                          {eventIcons[event.type] || <Activity className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="font-mono text-orange-600">{event.type}</div>
                        </div>
                        <div className="text-xs text-amber-600">{event.confidence}%</div>
                      </motion.div>
                    ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Predictions */}
          <AnimatePresence>
            {predictions.length > 0 && (
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                  AI Predictions
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {predictions.map((pred, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-orange-500" />
                        <span className="font-bold text-gray-800">{pred.action}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{pred.reason}</p>
                      <div className="h-2 rounded-full bg-white overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${pred.confidence}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        />
                      </div>
                      <div className="text-right text-sm text-orange-600 mt-1">{pred.confidence}% confidence</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CheckCircle2 className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Get Started?</h2>
            <p className="text-gray-600 text-lg mb-8">
              Start tracking your application activity with our free tier.
              No credit card required.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-orange-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
