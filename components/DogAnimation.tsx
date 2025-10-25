'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

type AnimationState = 'idle' | 'standing' | 'treat' | 'wag' | 'return';
type IdlePose = 'sitting' | 'tongueOut';

interface DogAnimationProps {
    onAnimationComplete: () => void;
    isPlaying: boolean;
}

export default function DogAnimation({ onAnimationComplete, isPlaying }: DogAnimationProps) {
    const [state, setState] = useState<AnimationState>('idle');
    const [idlePose, setIdlePose] = useState<IdlePose>('sitting');
    const [showTreat, setShowTreat] = useState(false);

    // Physics-based spring for smooth transitions
    const springConfig = { stiffness: 50, damping: 20, mass: 1 };
    const dogScale = useSpring(1, springConfig);
    const dogRotate = useSpring(0, springConfig);

    // Random idle animation with breathing effect
    useEffect(() => {
        if (state !== 'idle') return;

        const idleInterval = setInterval(() => {
            setIdlePose(prev => prev === 'sitting' ? 'tongueOut' : 'sitting');
        }, 3000 + Math.random() * 2000);

        // Subtle breathing animation
        const breatheInterval = setInterval(() => {
            dogScale.set(1 + Math.random() * 0.02);
        }, 2000);

        return () => {
            clearInterval(idleInterval);
            clearInterval(breatheInterval);
        };
    }, [state, dogScale]);

    useEffect(() => {
        if (!isPlaying) {
            setState('idle');
            setShowTreat(false);
            dogScale.set(1);
            dogRotate.set(0);
            return;
        }

        const sequence = async () => {
            // Anticipation - dog prepares
            dogScale.set(0.95);
            await new Promise(resolve => setTimeout(resolve, 200));

            setShowTreat(true);
            setState('standing');
            dogScale.set(1.05);
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Excitement - dog receives treat
            setState('treat');
            dogScale.set(1.1);
            await new Promise(resolve => setTimeout(resolve, 800));

            setShowTreat(false);

            // Joy - tail wagging
            setState('wag');
            dogScale.set(1.08);
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Settle down
            setState('return');
            dogScale.set(1.02);
            await new Promise(resolve => setTimeout(resolve, 400));

            setState('idle');
            dogScale.set(1);
            dogRotate.set(0);
            onAnimationComplete();
        };

        sequence();
    }, [isPlaying, onAnimationComplete, dogScale, dogRotate]);

    const getImageSrc = () => {
        switch (state) {
            case 'standing':
            case 'return':
                return '/Standing.svg';
            case 'treat':
                return '/Sitting_with_tongue_out.svg';
            case 'wag':
                return '/Standing_with_tongue_out.svg';
            case 'idle':
            default:
                return idlePose === 'sitting' ? '/Sitting.svg' : '/Standing_with_tongue_out.svg';
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto h-96 flex items-center justify-center overflow-hidden">
            {/* Treat animation with natural physics */}
            <AnimatePresence>
                {showTreat && (
                    <motion.div
                        className="absolute z-10"
                        initial={{
                            x: 250,
                            y: -150,
                            scale: 0.3,
                            rotate: -60,
                            opacity: 0
                        }}
                        animate={{
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            opacity: 1
                        }}
                        exit={{
                            scale: 0.5,
                            opacity: 0,
                            y: -20,
                            transition: { duration: 0.4, ease: "easeIn" }
                        }}
                        transition={{
                            duration: 2.2,
                            ease: [0.22, 0.61, 0.36, 1], // Custom bezier for smooth curve
                            scale: {
                                duration: 2.2,
                                ease: [0.34, 1.56, 0.64, 1] // Bounce easing
                            }
                        }}
                        style={{
                            top: '40%',
                            left: '50%',
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    >
                        <motion.div
                            className="text-6xl"
                            animate={{
                                rotate: [0, 8, -8, 8, -8, 0],
                            }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                        >
                            🦴
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Dog animation with natural movement */}
            <motion.div
                style={{
                    scale: dogScale,
                    rotate: dogRotate,
                    willChange: 'transform',
                }}
                animate={{
                    rotate: state === 'wag' ? [0, 3, -3, 3, -3, 0] : 0,
                    y: state === 'standing' ? [-5, 0, -3, 0] : 0,
                }}
                transition={{
                    rotate: {
                        duration: 0.18,
                        repeat: state === 'wag' ? 7 : 0,
                        repeatType: "mirror",
                        ease: "easeInOut"
                    },
                    y: {
                        duration: 0.4,
                        ease: "easeOut"
                    }
                }}
            >
                {/* Subtle bounce for idle tongue out */}
                <motion.div
                    animate={{
                        y: idlePose === 'tongueOut' && state === 'idle'
                            ? [0, -2, 0, -1, 0]
                            : 0
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Image
                        src={getImageSrc()}
                        alt="Dog"
                        width={300}
                        height={300}
                        priority
                        className="w-full h-auto"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}