import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

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

interface DemoContextType {
    isTracking: boolean;
    trackedEvents: TrackedEvent[];
    trackingTime: number;
    predictions: Prediction[];
    hasStarted: boolean;
    startTracking: () => void;
    stopTracking: () => void;
    resetTracking: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
    const [trackedEvents, setTrackedEvents] = useState<TrackedEvent[]>([]);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [isTracking, setIsTracking] = useState(false);
    const [trackingTime, setTrackingTime] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const eventsRef = useRef<TrackedEvent[]>([]);

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

    useEffect(() => {
        if (!isTracking) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (Math.random() > 0.95) { // Throttled tracking
                trackEvent('mouse_move', { x: e.clientX, y: e.clientY }, { x: e.clientX, y: e.clientY });
            }
        };

        const handleClick = (e: MouseEvent) => {
            trackEvent('mouse_click', { x: e.clientX, y: e.clientY, element: (e.target as HTMLElement).tagName }, { x: e.clientX, y: e.clientY });
        };

        const handleKeypress = (e: KeyboardEvent) => {
            trackEvent('keypress', { key: e.key }, { x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);
        window.addEventListener('keydown', handleKeypress);

        const interval = setInterval(() => {
            setTrackingTime((prev) => {
                if (prev >= 3600) return prev; // Limit to 1 hour for demo
                return prev + 1;
            });
        }, 1000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleKeypress);
            clearInterval(interval);
        };
    }, [isTracking, trackEvent]);

    const generatePredictions = (events: TrackedEvent[]) => {
        const predictions: Prediction[] = [];
        const activityFactor = Math.min(events.length, 10);

        // Simulation of Behavioral Predictive Analysis
        // In a real app, this would use the vector data to predict exact coordinates

        // 1. High Confidence Action Prediction
        predictions.push({
            action: 'Click "Start Tracking" CTA',
            confidence: 85 + activityFactor,
            reason: 'Cursor velocity and vector alignment indicate high probability of engaging primary action.',
        });

        // 2. Navigation/Context Prediction
        predictions.push({
            action: 'Select "Vector Flow" Tab',
            confidence: 80 + activityFactor,
            reason: 'User dwell time on visualization component suggests intent to inspect data capabilities.',
        });

        // 3. Next Step Prediction
        predictions.push({
            action: 'Click "Pricing" in Navigation',
            confidence: 75 + activityFactor,
            reason: 'Sequential pattern matches "Evaluation" phase; high likelihood of checking costs next.',
        });

        setPredictions(predictions);
    };

    // Load saved tracking state from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('kimi_tracking_state');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                eventsRef.current = state.events || [];
                setTrackedEvents(state.events || []);
                setTrackingTime(state.time || 0);
                setIsTracking(state.isTracking || false);
                setHasStarted(state.hasStarted || false);
            } catch (e) {
                console.error('Failed to load tracking state', e);
            }
        }
    }, []);

    // Save tracking state to localStorage whenever it changes
    useEffect(() => {
        const state = {
            events: eventsRef.current,
            time: trackingTime,
            isTracking,
            hasStarted,
        };
        localStorage.setItem('kimi_tracking_state', JSON.stringify(state));
    }, [trackedEvents, trackingTime, isTracking, hasStarted]);

    const startTracking = () => {
        if (!hasStarted) {
            eventsRef.current = [];
            setTrackedEvents([]);
            setTrackingTime(0);
            setPredictions([]);
        }
        setIsTracking(true);
        setHasStarted(true);
    };

    const stopTracking = () => {
        setIsTracking(false);
        generatePredictions(eventsRef.current);
    };

    const resetTracking = () => {
        eventsRef.current = [];
        setTrackedEvents([]);
        setIsTracking(false);
        setTrackingTime(0);
        setPredictions([]);
        setHasStarted(false);
        localStorage.removeItem('kimi_tracking_state');
    };

    return (
        <DemoContext.Provider
            value={{
                isTracking,
                trackedEvents,
                trackingTime,
                predictions,
                hasStarted,
                startTracking,
                stopTracking,
                resetTracking,
            }}
        >
            {children}
        </DemoContext.Provider>
    );
}

export function useDemo() {
    const context = useContext(DemoContext);
    if (context === undefined) {
        throw new Error('useDemo must be used within a DemoProvider');
    }
    return context;
}
