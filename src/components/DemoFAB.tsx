import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, Pause, Play, RotateCcw } from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DemoFAB() {
    const { isTracking, trackingTime, trackedEvents, hasStarted, stopTracking, startTracking, resetTracking } = useDemo();
    const [isOpen, setIsOpen] = useState(false);

    if (!hasStarted) return null;

    return (
        <div className="fixed bottom-6 left-6 z-[60] flex flex-col items-start gap-3">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white/90 backdrop-blur-xl border border-orange-100 rounded-2xl p-4 shadow-2xl shadow-orange-500/20 w-64"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Activity className={`w-5 h-5 ${isTracking ? 'text-orange-500 animate-pulse' : 'text-slate-400'}`} />
                                    {isTracking && (
                                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                                    )}
                                </div>
                                <span className="font-bold text-slate-800 text-sm">Tracking Demo</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                            <div className="bg-orange-50 rounded-xl p-2">
                                <div className="text-orange-600 font-bold text-lg">{trackedEvents.length}</div>
                                <div className="text-[10px] text-orange-400 uppercase font-black">Events</div>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-2">
                                <div className="text-orange-600 font-bold text-lg">{trackingTime}s</div>
                                <div className="text-[10px] text-orange-400 uppercase font-black">Time</div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={isTracking ? stopTracking : startTracking}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all ${isTracking
                                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        : 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:scale-[1.02]'
                                    }`}
                            >
                                {isTracking ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                {isTracking ? 'Pause' : 'Resume'}
                            </button>
                            <button
                                onClick={resetTracking}
                                className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
                                title="Reset Tracking"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        </div>

                        <Link
                            to="/demo"
                            className="mt-4 block text-center text-xs text-orange-600 font-bold hover:underline"
                            onClick={() => setIsOpen(false)}
                        >
                            View Full Dashboard →
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all ${isTracking
                        ? 'bg-orange-500 text-white shadow-orange-500/40'
                        : 'bg-white text-slate-400 border border-slate-100 shadow-slate-200/40'
                    }`}
            >
                <Activity className={`w-6 h-6 ${isTracking ? 'animate-pulse' : ''}`} />
                {!isOpen && isTracking && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 text-[10px] items-center justify-center text-white font-bold">
                            {trackedEvents.length > 99 ? '99+' : trackedEvents.length}
                        </span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
