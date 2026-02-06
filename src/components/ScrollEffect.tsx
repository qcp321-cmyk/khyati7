import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollEffectProps {
    children: ReactNode;
    direction?: 'diagonal-left' | 'diagonal-right' | 'horizontal' | 'perspective' | 'default';
    delay?: number;
    className?: string;
}

export default function ScrollEffect({
    children,
    direction = 'default',
    delay = 0,
    className = ''
}: ScrollEffectProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const variants = {
        'diagonal-left': {
            hidden: { opacity: 0, x: -100, y: 100, rotate: -5 },
            visible: { opacity: 1, x: 0, y: 0, rotate: 0 }
        },
        'diagonal-right': {
            hidden: { opacity: 0, x: 100, y: 100, rotate: 5 },
            visible: { opacity: 1, x: 0, y: 0, rotate: 0 }
        },
        'horizontal': {
            hidden: { opacity: 0, x: -100, scale: 0.9 },
            visible: { opacity: 1, x: 0, scale: 1 }
        },
        'perspective': {
            hidden: { opacity: 0, rotateY: -30, x: -50 },
            visible: { opacity: 1, rotateY: 0, x: 0 }
        },
        'default': {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={variants[direction]}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1]
            }}
            className={className}
            style={direction === 'perspective' ? { perspective: '1000px' } : undefined}
        >
            {children}
        </motion.div>
    );
}
