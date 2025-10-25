'use client';

import Lottie from 'lottie-react';

interface LottieAnimationProps {
    animationData: any;
    loop?: boolean;
    autoplay?: boolean;
    className?: string;
}

export default function LottieAnimation({
                                            animationData,
                                            loop = true,
                                            autoplay = true,
                                            className = ''
                                        }: LottieAnimationProps) {
    return (
        <div className={className}>
            <Lottie
                animationData={animationData}
                loop={loop}
                autoplay={autoplay}
            />
        </div>
    );
}