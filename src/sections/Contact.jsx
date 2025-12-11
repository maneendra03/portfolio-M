import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiMail, HiPhone, HiLocationMarker, HiArrowRight, HiArrowUp } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/maneendra03', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/maneendra-gudipally-886528272/', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
];

const footerLinks = [
    {
        title: 'Navigation', links: [
            { label: 'About', href: '#about' },
            { label: 'Projects', href: '#projects' },
            { label: 'Skills', href: '#skills' },
            { label: 'Contact', href: '#contact' },
        ]
    },
    {
        title: 'Projects', links: [
            { label: 'Anvima', href: 'https://anvima-web.vercel.app/' },
            { label: 'AyuCare', href: 'https://github.com/maneendra03/PharmaCare' },
            { label: 'Communitfx', href: 'https://github.com/maneendra03/Communitfx' },
            { label: 'Project Kisan', href: 'https://github.com/maneendra03/project_kisan' },
        ]
    },
];

const Contact = () => {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.contact-content > *',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.contact-form',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_key: "ee2c3953-29bc-455b-8550-d9ae88e7215b",
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    subject: `Portfolio Contact: ${formState.name}`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSubmitted(true);
                setFormState({ name: '', email: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 3000);
            } else {
                setError('Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        }

        setIsSubmitting(false);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <section id="contact" className="contact section" ref={sectionRef}>
                {/* Background */}
                <div className="contact-bg">
                    <div className="bg-gradient-left" />
                    <div className="bg-gradient-right" />
                </div>

                <div className="container">
                    <div className="contact-grid">
                        {/* Left: Contact Info */}
                        <div className="contact-content">
                            <div className="section-label">
                                <span className="label-dot pulse" />
                                <span>Get In Touch</span>
                            </div>

                            <h2 className="contact-heading">
                                Let's create something
                                <span className="text-gradient"> amazing</span> together
                            </h2>

                            <p className="contact-text">
                                Have a project in mind or want to collaborate? I'm always open to
                                discussing new opportunities and innovative ideas.
                            </p>

                            {/* Contact Info Cards */}
                            <div className="contact-cards">
                                <a href="mailto:maneendragudipally504@gmail.com" className="contact-card">
                                    <div className="card-icon">
                                        <HiMail />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-label">Email</span>
                                        <span className="card-value">maneendragudipally504@gmail.com</span>
                                    </div>
                                </a>

                                <a href="tel:+916304742807" className="contact-card">
                                    <div className="card-icon">
                                        <HiPhone />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-label">Phone</span>
                                        <span className="card-value">+91 6304742807</span>
                                    </div>
                                </a>

                                <div className="contact-card">
                                    <div className="card-icon">
                                        <HiLocationMarker />
                                    </div>
                                    <div className="card-content">
                                        <span className="card-label">Location</span>
                                        <span className="card-value">Hyderabad, Telangana, India</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="contact-socials">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        aria-label={social.label}
                                    >
                                        <social.icon />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-header">
                                <h3 className="form-title">Send a Message</h3>
                                <p className="form-subtitle">I'll get back to you within 24 hours</p>
                            </div>

                            <div className="form-body">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formState.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Your Name"
                                    />
                                    <div className="input-border" />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formState.email}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                        placeholder="Your Email"
                                    />
                                    <div className="input-border" />
                                </div>

                                <div className="form-group">
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formState.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="form-input form-textarea"
                                        placeholder="Your Message"
                                    />
                                    <div className="input-border" />
                                </div>

                                <button
                                    type="submit"
                                    className={`submit-btn ${isSubmitting ? 'loading' : ''} ${isSubmitted ? 'success' : ''}`}
                                    disabled={isSubmitting || isSubmitted}
                                >
                                    <span className="btn-content">
                                        <span className="btn-text">
                                            {isSubmitted ? 'Message Sent!' : isSubmitting ? 'Sending...' : 'Send Message'}
                                        </span>
                                        <HiArrowRight className="btn-icon" />
                                    </span>
                                    <span className="btn-bg" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* Premium Footer */}
            <footer className="footer">
                <div className="footer-bg">
                    <div className="footer-gradient" />
                    <div className="footer-grid-pattern" />
                </div>

                <div className="container">
                    {/* Footer Top */}
                    <div className="footer-top">
                        <div className="footer-brand">
                            <h3 className="brand-name">
                                <span className="brand-first">Maneendra</span>
                                <span className="brand-dot">.</span>
                            </h3>
                            <p className="brand-tagline">
                                Building digital solutions that make an impact
                            </p>
                        </div>

                        <div className="footer-links">
                            {footerLinks.map((column, index) => (
                                <div key={index} className="footer-column">
                                    <h4 className="column-title">{column.title}</h4>
                                    <ul className="column-list">
                                        {column.links.map((link, i) => (
                                            <li key={i}>
                                                <a href={link.href} className="column-link">
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="footer-cta">
                            <h4 className="cta-title">Let's Connect</h4>
                            <div className="cta-socials">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cta-social-link"
                                        aria-label={social.label}
                                    >
                                        <social.icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Divider */}
                    <div className="footer-divider">
                        <div className="divider-line" />
                        <button onClick={scrollToTop} className="scroll-top-btn">
                            <HiArrowUp />
                        </button>
                        <div className="divider-line" />
                    </div>

                    {/* Footer Bottom */}
                    <div className="footer-bottom">
                        <p className="copyright">
                            © 2024 Gudipally Maneendra. All rights reserved.
                        </p>
                        <p className="made-with">
                            Made with <FaHeart className="heart-icon" /> in Hyderabad
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Contact;
