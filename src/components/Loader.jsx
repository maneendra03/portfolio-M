import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const Loader = ({ onComplete }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        onComplete();
                    }, 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                >
                    <div className="loader-content">
                        {/* Animated Logo */}
                        <motion.div
                            className="loader-logo"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <span className="logo-letter">M</span>
                            <span className="logo-dot">.</span>
                        </motion.div>

                        {/* Name Animation */}
                        <motion.div
                            className="loader-name"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            Maneendra
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="loader-progress">
                            <motion.div
                                className="progress-bar"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Loading Text */}
                        <motion.div
                            className="loader-text"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Loading experience...
                        </motion.div>
                    </div>

                    {/* Background Elements */}
                    <div className="loader-bg">
                        <div className="bg-line line-1" />
                        <div className="bg-line line-2" />
                        <div className="bg-line line-3" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
