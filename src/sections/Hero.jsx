import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiCodeforces, SiCodechef } from 'react-icons/si';
import profileImage from '../assets/profile.jpg';
import './Hero.css';

const roles = ['Developer', 'Innovator', 'Builder', 'Entrepreneur'];

const Hero = () => {
    const heroRef = useRef(null);
    const nameRef = useRef(null);
    const [currentRole, setCurrentRole] = useState(0);

    useEffect(() => {
        const tl = gsap.timeline();

        // Animate profile image
        tl.fromTo(
            '.hero-image',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' }
        );

        // Animate name letters
        tl.fromTo(
            '.hero-name .letter',
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power3.out',
            },
            '-=0.5'
        );

        // Animate tagline
        tl.fromTo(
            '.hero-tagline',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.3'
        );

        // Animate description
        tl.fromTo(
            '.hero-description',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            '-=0.3'
        );

        // Animate social links
        tl.fromTo(
            '.social-link',
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
            },
            '-=0.2'
        );

        // Animate scroll indicator
        tl.fromTo(
            '.scroll-indicator',
            { opacity: 0 },
            { opacity: 1, duration: 0.6 },
            '-=0.2'
        );

        // Role rotation
        const roleInterval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 2500);

        return () => clearInterval(roleInterval);
    }, []);

    const splitName = (name) => {
        return name.split('').map((char, i) => (
            <span key={i} className="letter-wrap">
                <span className="letter">{char === ' ' ? '\u00A0' : char}</span>
            </span>
        ));
    };

    const scrollToAbout = () => {
        document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="hero" ref={heroRef}>
            {/* Background Elements */}
            <div className="hero-bg">
                <div className="gradient-orb orb-1" />
                <div className="gradient-orb orb-2" />
                <div className="grid-overlay" />
            </div>

            <div className="hero-content">
                <div className="hero-grid">
                    {/* Left: Text Content */}
                    <div className="hero-text">
                        <h1 className="hero-name" ref={nameRef}>
                            {splitName('Gudipally')}
                            <br />
                            {splitName('Maneendra')}
                        </h1>

                        <div className="hero-tagline">
                            <span className="tagline-static">A Passionate </span>
                            <span className="tagline-dynamic">
                                <motion.span
                                    key={currentRole}
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {roles[currentRole]}
                                </motion.span>
                            </span>
                        </div>

                        <p className="hero-description">
                            Final year B.Tech student & founder of Anvima. Crafting innovative solutions
                            in healthcare, community tech, and personalized gifting experiences.
                        </p>

                        <div className="hero-socials">
                            <a
                                href="https://github.com/maneendra03"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="GitHub"
                            >
                                <FaGithub />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/maneendra-gudipally-886528272/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href="https://leetcode.com/u/maneendragudipally504/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="LeetCode"
                            >
                                <SiLeetcode />
                            </a>
                            <a
                                href="https://codeforces.com/profile/maneendra_22h51a0586"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="Codeforces"
                            >
                                <SiCodeforces />
                            </a>
                            <a
                                href="https://www.codechef.com/users/maneendra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label="CodeChef"
                            >
                                <SiCodechef />
                            </a>
                        </div>
                    </div>

                    {/* Right: Profile Image */}
                    <div className="hero-image-wrapper">
                        <div className="hero-image">
                            <div className="image-frame">
                                <img src={profileImage} alt="Maneendra Gudipally" />
                            </div>
                            <div className="image-decoration">
                                <div className="deco-ring ring-1" />
                                <div className="deco-ring ring-2" />
                                <div className="deco-dots">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="scroll-indicator" onClick={scrollToAbout}>
                    <span className="scroll-text">Scroll</span>
                    <span className="scroll-arrow">
                        <HiArrowDown />
                    </span>
                </button>
            </div>
        </section>
    );
};

export default Hero;
