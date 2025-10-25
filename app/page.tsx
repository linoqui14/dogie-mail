'use client';

import { useState, useCallback } from 'react';
import DogAnimation from '@/components/DogAnimation';
import LottieAnimation from '@/components/LottieAnimation';
import welcomeAnimation from '@/public/lotties/welcome.json';
import feedDogAnimation from '@/public/lotties/feed-dog.json';
import dancingDogAnimation from '@/public/lotties/dancing-dog.json';
import FadeInSection from '@/components/FadeInSection';
export default function Home() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState('');
    const [successCount, setSuccessCount] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/submit-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit email');
            }

            setIsAnimating(true);
            setSuccessCount(prev => prev + 1);
            setEmail('');
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAnimationComplete = useCallback(() => {
        setIsAnimating(false);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">🐕</span>
                        </div>
                        <span className="font-bold text-xl text-gray-900">DogMail</span>
                    </div>
                    <div className="hidden sm:flex items-center space-x-6">
                        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
                        <a href="#treats" className="text-gray-600 hover:text-gray-900 transition-colors">Treats given</a>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <div className="inline-block mb-4">
              <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                🎉 {successCount > 0 ? `${successCount} treats given today!` : 'Be the first to give a treat'}
              </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Enter your email to
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                give my dog a treat
              </span>
                        </h1>

                        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">
                            Every email you share brings joy to a virtual pup. Watch the magic happen as your furry friend enjoys their well-deserved treat!
                        </p>
                    </div>

                    {/* Animation Container */}
                    <div className="mb-12">
                        <DogAnimation
                            isPlaying={isAnimating}
                            onAnimationComplete={handleAnimationComplete}
                        />
                    </div>

                    {/* Email Form */}
                    <div className="max-w-md mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your.email@example.com"
                                    disabled={isSubmitting || isAnimating}
                                    className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed placeholder:text-gray-400"
                                    required
                                />
                                {error && (
                                    <p className="mt-2 text-red-600 text-sm flex items-center">
                                        <span className="mr-1">⚠️</span> {error}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isAnimating}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending treat...
                  </span>
                                ) : (
                                    '🦴 Give Treat'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* How It Works - Step 1 (Full Page) */}
                <section id="how-it-works" className="min-h-screen flex items-center justify-center py-24 mt-24 bg-gradient-to-br from-blue-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <FadeInSection className="order-2 lg:order-1">
                                <div className="inline-block mb-4">
                                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold">Step 1</span>
                                </div>
                                <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                                    Enter your email
                                </h2>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Share your email to join our community of dog lovers. It's quick, simple, and the first step to making a virtual pup's day brighter.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">Quick and easy signup process</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">Join a community of dog enthusiasts</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">Your email is safe and secure with us</span>
                                    </li>
                                </ul>
                            </FadeInSection>
                            <FadeInSection delay={0.2} className="order-1 lg:order-2">
                                <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center">
                                    <LottieAnimation
                                        animationData={welcomeAnimation}
                                        className="w-full h-full"
                                    />
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </section>

                {/* How It Works - Step 2 (Full Page) */}
                <section className="min-h-screen flex items-center justify-center py-24 bg-gradient-to-br from-purple-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <FadeInSection>
                                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center">
                                    <LottieAnimation
                                        animationData={feedDogAnimation}
                                        className="w-full h-full"
                                    />
                                </div>
                            </FadeInSection>
                            <FadeInSection delay={0.2}>
                                <div className="inline-block mb-4">
                                    <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold">Step 2</span>
                                </div>
                                <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                                    Give a treat
                                </h2>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    Watch as your virtual pup receives a delicious treat. The moment you submit, the magic begins with a delightful animation sequence.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="text-purple-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">Instant treat delivery animation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">See your pup's excitement in real-time</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-purple-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">Smooth, engaging visual feedback</span>
                                    </li>
                                </ul>
                            </FadeInSection>
                        </div>
                    </div>
                </section>

                {/* How It Works - Step 3 (Full Page) */}
                <section className="min-h-screen flex items-center justify-center py-24 bg-gradient-to-br from-pink-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <FadeInSection className="order-2 lg:order-1">
                                <div className="inline-block mb-4">
                                    <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-bold">Step 3</span>
                                </div>
                                <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
                                    Enjoy the moment
                                </h2>
                                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                    See the joy and excitement in your dog's animation. Watch the tail wag, the happy dance, and the pure delight of receiving a treat.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <span className="text-pink-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">Adorable tail-wagging animation</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-pink-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">Complete animation sequence from start to finish</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-pink-600 mr-3 text-2xl">✓</span>
                                        <span className="text-gray-700">Returns to idle pose, ready for the next treat</span>
                                    </li>
                                </ul>
                            </FadeInSection>
                            <FadeInSection delay={0.2} className="order-1 lg:order-2">
                                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl flex items-center justify-center">
                                    <LottieAnimation
                                        animationData={dancingDogAnimation}
                                        className="w-full h-full"
                                    />
                                </div>
                            </FadeInSection>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section id="treats" className="min-h-screen flex items-center justify-center py-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-16 text-center">
                            <h2 className="text-5xl font-extrabold mb-6 text-gray-900">Join the pack!</h2>
                            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                                DogMail brings joy through simple interactions. Every email helps us create more delightful experiences for dog lovers worldwide.
                            </p>
                            <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                                <div className="bg-white rounded-2xl p-8 shadow-lg">
                                    <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                        {successCount}+
                                    </div>
                                    <div className="text-gray-600 text-lg font-medium">Treats Given</div>
                                </div>
                                <div className="bg-white rounded-2xl p-8 shadow-lg">
                                    <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                                        100%
                                    </div>
                                    <div className="text-gray-600 text-lg font-medium">Happy Dogs</div>
                                </div>
                                <div className="bg-white rounded-2xl p-8 shadow-lg">
                                    <div className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                                        ∞
                                    </div>
                                    <div className="text-gray-600 text-lg font-medium">Tail Wags</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                    <p className="text-lg">Made with ❤️ for dog lovers everywhere</p>
                    <p className="mt-2">© 2025 DogMail. Bringing joy one treat at a time.</p>
                </div>
            </footer>
        </div>
    );
}