'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInSectionProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}

export default function FadeInSection({
                                          children,
                                          delay = 0,
                                          className = ''
                                      }: FadeInSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false, // Changed from true to false
        margin: "-100px",
        amount: 0.3 // Trigger when 30% of element is visible
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{
                duration: 0.6,
                delay: isInView ? delay : 0, // Only delay on enter, not exit
                ease: [0.25, 0.1, 0.25, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}