import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, X, Play, Pause, TrendingUp, Brain, Activity, Target } from 'lucide-react';

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

const eventIcons: Record<string, React.ReactNode> = {
  mouse_move: <Activity className="w-4 h-4" />,
  mouse_click: <Target className="w-4 h-4" />,
  scroll: <Activity className="w-4 h-4" />,
  keypress: <Activity className="w-4 h-4" />,
  hover: <Eye className="w-4 h-4" />,
  focus: <Activity className="w-4 h-4" />,
  blur: <Activity className="w-4 h-4" />,
};

// Vector Flow Visualization Component
const VectorFlowVisualization = ({ events }: { events: TrackedEvent[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 250 });

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
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

  // Pain button timer - shows after 1 minute and turns purple
  const [buttonColor, setButtonColor] = useState('orange');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPainButton(true);
      setButtonColor('purple'); // Turn purple after 60 seconds
    }, 60000);
    return () => clearTimeout(timer);
  }, []);

  // Behavior tracking
  useEffect(() => {
    if (!isTracking) return;

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

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) {
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

    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackEvent('scroll', { scrollY: window.scrollY }, { x: window.innerWidth / 2, y: window.scrollY });
      }, 150);
    };

    const handleKeypress = (e: KeyboardEvent) => {
      trackEvent('keypress', { key: e.key }, { x: 0, y: 0 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        trackEvent('hover', { element: target.tagName }, { x: 0, y: 0 });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeypress);
    document.addEventListener('mouseover', handleMouseOver);

    const interval = setInterval(() => {
      setTrackingTime((prev) => {
        if (prev >= 60) {
          setIsTracking(false);
          generatePredictions(eventsRef.current);
          return 60;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeypress);
      document.removeEventListener('mouseover', handleMouseOver);
      clearTimeout(scrollTimeout);
      clearInterval(interval);
    };
  }, [isTracking]);

  const generatePredictions = useCallback((events: TrackedEvent[]) => {
    const predictions: Prediction[] = [];
    const clicks = events.filter((e) => e.type === 'mouse_click');
    const hovers = events.filter((e) => e.type === 'hover');
    const mouseMoves = events.filter((e) => e.type === 'mouse_move');

    // Analyze click patterns and screen areas
    const topAreaClicks = clicks.filter(c => c.vector.y < window.innerHeight / 3).length;
    const middleAreaClicks = clicks.filter(c => c.vector.y >= window.innerHeight / 3 && c.vector.y < 2 * window.innerHeight / 3).length;
    const bottomAreaClicks = clicks.filter(c => c.vector.y >= 2 * window.innerHeight / 3).length;

    // Always include homepage navigation as prediction #1
    predictions.push({
      action: 'Click "Home" Logo',
      confidence: Math.min(95, 70 + clicks.length * 2),
      reason: 'Recurrent return-to-base behavior detected',
    });

    // Prediction #2 - Based on interaction patterns
    if (topAreaClicks > 3) {
      predictions.push({
        action: 'Click "Products" Dropdown',
        confidence: Math.min(92, 75 + topAreaClicks * 3),
        reason: 'Cursor concentration in top-nav coordinates suggests menu interaction',
      });
    } else if (hovers.length > 5) {
      predictions.push({
        action: 'Click "Watch Demo" Thumbnail',
        confidence: Math.min(88, 70 + hovers.length * 2),
        reason: 'Hover dwell time >2s on media element detected',
      });
    } else if (middleAreaClicks > bottomAreaClicks) {
      predictions.push({
        action: 'Click "Start Free Trial" CTA',
        confidence: 85,
        reason: 'Velocity vectors converging on primary viewport action',
      });
    } else {
      predictions.push({
        action: 'Click "Load More" Button',
        confidence: 82,
        reason: 'Scroll depth indicates intent to consume extended content',
      });
    }

    // Prediction #3 - Based on time spent and overall behavior
    if (clicks.length > 10) {
      predictions.push({
        action: 'Submit "Contact Sales" Form',
        confidence: Math.min(90, 65 + clicks.length * 2),
        reason: 'High interaction frequency correlates with conversion intent',
      });
    } else if (mouseMoves.length > 20) {
      predictions.push({
        action: 'Click "Feature Comparison" Link',
        confidence: 78,
        reason: 'Horizontal scanning pattern suggests comparison behavior',
      });
    } else {
      predictions.push({
        action: 'Download "Whitepaper" PDF',
        confidence: 74,
        reason: 'Passive reading mode suggests research intent',
      });
    }

    setPredictions(predictions.slice(0, 3)); // Only show top 3
  }, []);

  const stopTracking = () => {
    setIsTracking(false);
    generatePredictions(eventsRef.current);
  };

  const startTracking = () => {
    eventsRef.current = [];
    setTrackedEvents([]);
    setIsTracking(true);
    setTrackingTime(0);
    setPredictions([]);
  };

  const openPainModal = () => {
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
            onClick={openPainModal}
            className={`fixed bottom-6 right-6 z-50 w-14 h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${buttonColor === 'purple'
              ? 'bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-500/40 hover:shadow-purple-500/60'
              : 'bg-gradient-to-br from-red-500 to-orange-500 shadow-red-500/40 hover:shadow-red-500/60'
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`absolute inset-0 rounded-full ${buttonColor === 'purple' ? 'bg-purple-500' : 'bg-red-500'}`}
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
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
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg ${buttonColor === 'purple'
                    ? 'bg-gradient-to-br from-purple-600 to-purple-500 shadow-purple-500/30'
                    : 'bg-gradient-to-br from-red-500 to-orange-500 shadow-red-500/30'
                    }`}>
                    <Eye className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                      Intelligent Tracking Dashboard
                    </h2>
                    <p className="text-xs lg:text-sm text-gray-500">
                      AI-powered prediction of your next 3 clicks
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
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-orange-50 rounded-2xl p-3 lg:p-4 text-center"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-orange-600">
                      {trackedEvents.length}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500">Events Tracked</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-amber-50 rounded-2xl p-3 lg:p-4 text-center"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-amber-600">
                      {trackingTime}s
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500">Duration</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-orange-50 rounded-2xl p-3 lg:p-4 text-center"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-orange-600">
                      {trackedEvents.length > 0
                        ? Math.round(
                          trackedEvents.reduce((acc, e) => acc + e.confidence, 0) /
                          trackedEvents.length
                        )
                        : 0}
                      %
                    </div>
                    <div className="text-xs lg:text-sm text-gray-500">Avg Confidence</div>
                  </motion.div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="mb-6"
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500">Tracking Progress</span>
                    <span className="font-mono text-gray-700">
                      {Math.min(trackingTime, 60)}/60s
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(Math.min(trackingTime, 60) / 60) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>

                {/* Vector Flow & Events */}
                <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                  {/* Vector Flow */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="font-bold mb-3 lg:mb-4 flex items-center gap-2 text-gray-800">
                      <Activity className="w-5 h-5 text-orange-500" />
                      Vector Flow Map
                    </h3>
                    <div className="bg-gray-50 rounded-2xl p-4 h-48 lg:h-64 border border-gray-100">
                      <VectorFlowVisualization events={trackedEvents} />
                    </div>
                  </motion.div>

                  {/* Event Stream */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h3 className="font-bold mb-3 lg:mb-4 flex items-center gap-2 text-gray-800">
                      <Brain className="w-5 h-5 text-orange-500" />
                      Event Vector Stream
                    </h3>
                    <div className="bg-gray-50 rounded-2xl p-3 lg:p-4 max-h-48 lg:max-h-64 overflow-auto space-y-2 border border-gray-100">
                      {trackedEvents.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          {isTracking ? (
                            <div className="flex flex-col items-center gap-3">
                              <motion.div
                                className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              />
                              <span className="text-sm">Tracking your activity...</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-3">
                              <Play className="w-8 h-8 opacity-50" />
                              <span className="text-sm">Click Start to begin tracking</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        trackedEvents
                          .slice()
                          .reverse()
                          .map((event, i) => (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.02 }}
                              className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-white rounded-xl text-sm border border-gray-100 hover:border-orange-200 transition-colors"
                            >
                              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                {eventIcons[event.type] || <Activity className="w-4 h-4" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-mono text-orange-600 text-xs lg:text-sm">
                                  {event.type}
                                </div>
                                <div className="text-xs text-gray-400 font-mono truncate">
                                  x:{Math.round(event.vector.x)}, y:
                                  {Math.round(event.vector.y)}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-gray-400">
                                  {new Date(event.timestamp).toLocaleTimeString()}
                                </div>
                                <div className="text-xs text-amber-600">
                                  {event.confidence}%
                                </div>
                              </div>
                            </motion.div>
                          ))
                      )}
                    </div>
                  </motion.div>
                </div>

                {/* AI Predictions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 lg:mt-6"
                >
                  <h3 className="font-bold mb-3 lg:mb-4 flex items-center gap-2 text-gray-800">
                    <TrendingUp className="w-5 h-5 text-amber-500" />
                    Your Next 3 Predicted Clicks
                  </h3>
                  <div className="grid gap-3 lg:gap-4">
                    {predictions.length === 0 ? (
                      <div className="col-span-2 bg-gray-50 rounded-2xl p-6 lg:p-8 text-center text-gray-400 border border-gray-100">
                        <Target className="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm lg:text-base">
                          Complete 60 seconds of tracking to see predictions
                        </p>
                      </div>
                    ) : (
                      predictions.map((pred, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.45 + i * 0.1 }}
                          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2 lg:gap-3">
                              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5" />
                              </div>
                              <div>
                                <div className="font-bold text-sm lg:text-base text-gray-800">
                                  {pred.action}
                                </div>
                                <div className="text-xs text-gray-500">{pred.reason}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xl lg:text-2xl font-bold text-amber-600">
                                {pred.confidence}%
                              </div>
                            </div>
                          </div>
                          <div className="h-2 rounded-full bg-white overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${pred.confidence}%` }}
                              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                            />
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </motion.div>

                {/* Control Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex justify-center"
                >
                  <motion.button
                    onClick={isTracking ? stopTracking : startTracking}
                    className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${isTracking
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/30'
                      }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isTracking ? (
                      <>
                        <Pause className="w-5 h-5" />
                        Stop Tracking
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        {trackedEvents.length > 0 ? 'Restart Tracking' : 'Start Tracking'}
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
