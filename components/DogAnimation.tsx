'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type AnimationState = 'idle' | 'standing' | 'treat' | 'wag' | 'return';

interface DogAnimationProps {
    onAnimationComplete: () => void;
    isPlaying: boolean;
}

export default function DogAnimation({ onAnimationComplete, isPlaying }: DogAnimationProps) {
    const [state, setState] = useState<AnimationState>('idle');

    useEffect(() => {
        if (!isPlaying) {
            setState('idle');
            return;
        }

        const sequence = async () => {
            setState('standing');
            await new Promise(resolve => setTimeout(resolve, 400));

            setState('treat');
            await new Promise(resolve => setTimeout(resolve, 800));

            setState('wag');
            await new Promise(resolve => setTimeout(resolve, 1200));

            setState('return');
            await new Promise(resolve => setTimeout(resolve, 400));

            setState('idle');
            onAnimationComplete();
        };

        sequence();
    }, [isPlaying, onAnimationComplete]);

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
                return '/Sitting.svg';
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto h-96 flex items-center justify-center">
            <div
                className={`transition-all duration-300 ease-out ${
                    state === 'wag' ? 'animate-wag' : ''
                } ${
                    state === 'standing' || state === 'treat' || state === 'wag'
                        ? 'scale-110'
                        : 'scale-100'
                }`}
                style={{
                    willChange: 'transform',
                    transform: 'translateZ(0)',
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
            </div>
        </div>
    );
}