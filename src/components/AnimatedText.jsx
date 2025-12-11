import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AnimatedText.css';

const AnimatedText = ({ children, className = '', delay = 0, stagger = 0.03 }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const text = textRef.current;
        if (!text) return;

        // Split text into characters
        const chars = text.querySelectorAll('.char');

        gsap.fromTo(
            chars,
            {
                y: '100%',
                opacity: 0,
            },
            {
                y: '0%',
                opacity: 1,
                duration: 0.8,
                stagger: stagger,
                delay: delay,
                ease: 'power3.out',
            }
        );
    }, [delay, stagger]);

    // Split children into characters
    const splitText = (text) => {
        if (typeof text !== 'string') return text;

        return text.split('').map((char, i) => (
            <span key={i} className="char-wrap">
                <span className="char">{char === ' ' ? '\u00A0' : char}</span>
            </span>
        ));
    };

    return (
        <span ref={textRef} className={`animated-text ${className}`}>
            {typeof children === 'string' ? splitText(children) : children}
        </span>
    );
};

export default AnimatedText;
