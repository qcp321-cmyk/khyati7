import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Brain, Activity } from 'lucide-react';

interface TrackedEvent {
  id: string;
  type: string;
  timestamp: number;
  data: Record<string, any>;
  confidence: number;
  vector: { x: number; y: number };
}

interface Prediction {
  action: string;
  confidence: number;
  reason: string;
}


// Vector Flow Visualization Component
const VectorFlowVisualization = ({ events }: { events: TrackedEvent[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 250 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width || 400, height: rect.height || 250 });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const nodes = events.slice(-15).map((event, i) => ({
    id: event.id,
    x: 40 + (i % 5) * ((dimensions.width - 80) / 4),
    y: 40 + Math.floor(i / 5) * 70,
    type: event.type,
    active: i === events.length - 1 || i === events.slice(-15).length - 1,
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
        <linearGradient id="vectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection paths */}
      {paths.map((path, i) => (
        <motion.path
          key={path.id}
          d={path.d}
          fill="none"
          stroke={path.active ? 'url(#activeGradient)' : 'url(#vectorGradient)'}
          strokeWidth={path.active ? 2.5 : 1.5}
          strokeLinecap="round"
          strokeDasharray="6 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: i * 0.05 }}
        />
      ))}

      {/* Data packets */}
      {paths.map((path, i) => (
        <motion.circle
          key={`packet-${i}`}
          r={3}
          fill="#10B981"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            delay: i * 0.1,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <animateMotion
            dur="1.5s"
            repeatCount="indefinite"
            path={path.d}
          />
        </motion.circle>
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.g key={node.id}>
          {node.active && (
            <motion.circle
              cx={node.x}
              cy={node.y}
              r={15}
              fill="none"
              stroke="#10B981"
              strokeWidth={1}
              initial={{ scale: 0.5, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={node.active ? 8 : 5}
            fill={node.active ? '#10B981' : '#8B5CF6'}
            stroke="white"
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            filter="url(#glow)"
          />
        </motion.g>
      ))}
    </svg>
  );
};

export default function PainButton() {
  const [showPainButton, setShowPainButton] = useState(false);
  const [painModalOpen, setPainModalOpen] = useState(false);
  const [trackedEvents, setTrackedEvents] = useState<TrackedEvent[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingTime, setTrackingTime] = useState(0);
  const eventsRef = useRef<TrackedEvent[]>([]);

  // Stable trackEvent function
  const trackEvent = useCallback((type: string, data: Record<string, any>, vector: { x: number; y: number }) => {
    const event: TrackedEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      timestamp: Date.now(),
      data,
      confidence: Math.floor(Math.random() * 15) + 85,
      vector,
    };
    eventsRef.current.push(event);
    setTrackedEvents([...eventsRef.current]);
  }, []);

  // Timer for showing the button
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPainButton(true);
    }, 5000); // Reduced to 5s for easier testing
    return () => clearTimeout(timer);
  }, []);

  const generatePredictions = useCallback((events: TrackedEvent[]) => {
    const predictions: Prediction[] = [];
    const clicks = events.filter((e) => e.type === 'mouse_click');
    // Analyze click patterns and screen areas
    const topAreaClicks = clicks.filter(c => c.vector.y < window.innerHeight / 3).length;

    // Predictions logic
    predictions.push({
      action: 'Click "Start Tracking" CTA',
      confidence: Math.min(95, 80 + clicks.length * 2),
      reason: 'Interaction velocity aligns with primary conversion goal',
    });

    if (topAreaClicks > 2) {
      predictions.push({
        action: 'Click Navigation Menu',
        confidence: 88,
        reason: 'Recurrent cursor focus on header coordinates',
      });
    } else {
      predictions.push({
        action: 'Expand Cluster Details',
        confidence: 85,
        reason: 'Interest in deep-level audit trail detected',
      });
    }

    predictions.push({
      action: 'Download Audit Report',
      confidence: 76,
      reason: 'Sustained engagement indicates high professional interest',
    });

    setPredictions(predictions.slice(0, 3));
  }, []);

  const startTracking = useCallback(() => {
    eventsRef.current = [];
    setTrackedEvents([]);
    setIsTracking(true);
    setTrackingTime(0);
    setPredictions([]);
  }, []);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
    generatePredictions(eventsRef.current);
  }, [generatePredictions]);

  // Behavior tracking effect
  useEffect(() => {
    if (!isTracking) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.9) {
        trackEvent('mouse_move', { x: e.clientX, y: e.clientY }, { x: e.clientX, y: e.clientY });
      }
    };

    const handleClick = (e: MouseEvent) => {
      trackEvent('mouse_click', {
        x: e.clientX,
        y: e.clientY,
        element: (e.target as HTMLElement).tagName,
      }, { x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      trackEvent('scroll', { scrollY: window.scrollY }, { x: window.innerWidth / 2, y: window.scrollY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setTrackingTime((prev) => {
        if (prev >= 60) {
          stopTracking();
          return 60;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [isTracking, trackEvent, stopTracking]);

  const openPainModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPainModalOpen(true);
    if (!isTracking && trackedEvents.length === 0) {
      startTracking();
    }
  };

  return (
    <>
      {/* Pain Button */}
      <AnimatePresence>
        {showPainButton && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            type="button"
            onClick={openPainModal}
            className={`fixed bottom-6 right-6 z-[100] w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-500/40 hover:shadow-purple-500/60`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500"
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Eye className="w-6 h-6 lg:w-7 lg:h-7 text-white relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Pain Modal */}
      <AnimatePresence>
        {painModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setPainModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-auto bg-white rounded-3xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 lg:p-6 border-b border-gray-100 bg-white/95 backdrop-blur-md">
                <div className="flex items-center gap-3 lg:gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-500/30">
                    <Eye className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                      Intelligent Tracking Dashboard
                    </h2>
                    <p className="text-xs lg:text-sm text-gray-500">
                      Predicting your exact next interaction
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setPainModalOpen(false)}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-4 lg:p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
                  <div className="bg-purple-50 rounded-2xl p-3 lg:p-4 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-purple-600">{trackedEvents.length}</div>
                    <div className="text-xs lg:text-sm text-gray-500">Events Tracked</div>
                  </div>
                  <div className="bg-orange-50 rounded-2xl p-3 lg:p-4 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-orange-600">{trackingTime}s</div>
                    <div className="text-xs lg:text-sm text-gray-500">Duration</div>
                  </div>
                  <div className="bg-purple-50 rounded-2xl p-3 lg:p-4 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-purple-600">
                      {trackedEvents.length > 0
                        ? Math.round(trackedEvents.reduce((acc, e) => acc + e.confidence, 0) / trackedEvents.length)
                        : 0}%
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500">Confidence</div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="bg-gray-50 rounded-2xl p-4 h-64 border border-gray-100 overflow-hidden">
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-gray-800">
                      <Activity className="w-5 h-5 text-purple-500" />
                      Vector Flow Map
                    </h3>
                    <div className="h-48">
                      <VectorFlowVisualization events={trackedEvents} />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 h-64 border border-gray-100 flex flex-col">
                    <h3 className="font-bold mb-3 flex items-center gap-2 text-gray-800">
                      <Brain className="w-5 h-5 text-purple-500" />
                      Live Predictions
                    </h3>
                    <div className="flex-1 overflow-auto space-y-3">
                      {predictions.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400">
                          <Brain className="w-8 h-8 mb-2 opacity-50 animate-pulse" />
                          <p className="text-xs">Analyzing behavioral patterns...</p>
                        </div>
                      ) : (
                        predictions.map((p, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-3 rounded-xl border border-purple-100"
                          >
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-bold text-sm text-gray-800">{p.action}</span>
                              <span className="text-xs font-bold text-purple-600">{p.confidence}%</span>
                            </div>
                            <p className="text-[10px] text-gray-500">{p.reason}</p>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Control Button */}
                <div className="mt-8 flex justify-center">
                  <motion.button
                    onClick={isTracking ? stopTracking : startTracking}
                    className={`px-10 py-4 rounded-full font-bold text-white shadow-xl transition-all ${isTracking
                      ? 'bg-red-500 shadow-red-500/30'
                      : 'bg-gradient-to-r from-purple-600 to-purple-500 shadow-purple-500/30'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isTracking ? 'Stop Analysis' : 'Start Instant Tracking'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
