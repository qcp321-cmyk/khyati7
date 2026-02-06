import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Logo({ className = "", showText = true }: { className?: string, showText?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`flex items-center gap-3 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-10 h-10 lg:w-12 lg:h-12"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Futuristic Hexagon Shape */}
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg shadow-purple-500/30">
                    <defs>
                        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9333EA" /> {/* Purple-600 */}
                            <stop offset="100%" stopColor="#A855F7" /> {/* Purple-500 */}
                        </linearGradient>
                        <linearGradient id="logoGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F97316" /> {/* Orange-500 */}
                            <stop offset="100%" stopColor="#FB923C" /> {/* Orange-400 */}
                        </linearGradient>
                        <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Main Hexagon */}
                    <motion.path
                        d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                        fill={`url(#${isHovered ? 'logoGradientHover' : 'logoGradient'})`}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        style={{ transition: 'fill 0.4s ease' }}
                    />

                    {/* Inner Vector Paths */}
                    <motion.path
                        d="M30 40 L50 60 L70 40"
                        stroke="white"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                    />

                    {/* Floating Nodes */}
                    {[
                        { cx: 30, cy: 40 },
                        { cx: 50, cy: 60 },
                        { cx: 70, cy: 40 }
                    ].map((node, i) => (
                        <motion.circle
                            key={i}
                            cx={node.cx}
                            cy={node.cy}
                            r="4"
                            fill="white"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ delay: 1.5 + i * 0.2 }}
                        />
                    ))}

                    {/* Core Dot */}
                    <motion.circle
                        cx="50"
                        cy="25"
                        r="8"
                        fill="white"
                        filter="url(#logoGlow)"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </svg>
            </motion.div>

            {showText && (
                <div className="flex flex-col">
                    <motion.span
                        className="text-xl lg:text-2xl font-black tracking-tighter bg-clip-text text-transparent uppercase transition-all duration-400"
                        style={{
                            backgroundImage: isHovered
                                ? 'linear-gradient(to right, #F97316, #F59E0B)'
                                : 'linear-gradient(to right, #9333EA, #A855F7)'
                        }}
                    >
                        kHyAtI-7
                    </motion.span>
                    <span className="text-[10px] lg:text-xs text-slate-400 font-bold tracking-[0.2em] uppercase -mt-1">
                        Quantum Tracker
                    </span>
                </div>
            )}
        </div>
    );
}
