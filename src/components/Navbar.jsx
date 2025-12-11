import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt4, HiX, HiDownload } from 'react-icons/hi';
import './Navbar.css';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Business', href: '#business' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <motion.a
                    href="#home"
                    className="navbar-logo"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    onClick={(e) => handleClick(e, '#home')}
                >
                    M<span className="logo-dot">.</span>
                </motion.a>

                <div className="navbar-links">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="navbar-link"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            onClick={(e) => handleClick(e, link.href)}
                        >
                            <span className="link-text">{link.name}</span>
                            <span className="link-underline" />
                        </motion.a>
                    ))}
                </div>

                {/* Resume CTA Button */}
                <motion.a
                    href="/mani_Resume_updated_2.pdf"
                    download="Maneendra_Gudipally_Resume.pdf"
                    className="navbar-resume"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <HiDownload />
                    <span>Resume</span>
                </motion.a>

                <motion.button
                    className="navbar-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="navbar-mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="mobile-link"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={(e) => handleClick(e, link.href)}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        {/* Mobile Resume Link */}
                        <motion.a
                            href="/mani_Resume_updated_2.pdf"
                            download="Maneendra_Gudipally_Resume.pdf"
                            className="mobile-link mobile-resume"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: navLinks.length * 0.1 }}
                        >
                            <HiDownload /> Resume
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

