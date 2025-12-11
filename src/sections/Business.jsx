import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiExternalLink, HiStar, HiSparkles } from 'react-icons/hi';
import { FaGift, FaCamera, FaBox, FaMagic } from 'react-icons/fa';
import './Business.css';

gsap.registerPlugin(ScrollTrigger);

const Business = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.business-card',
                { y: 80, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.service-card',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.services-grid',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        { icon: FaGift, title: 'Custom Frames', desc: 'Personalized photo frames for every occasion' },
        { icon: FaCamera, title: 'Polaroid Prints', desc: 'Vintage-style prints with custom designs' },
        { icon: FaBox, title: 'Gift Hampers', desc: 'Curated gift boxes for celebrations' },
        { icon: FaMagic, title: 'Personalized Items', desc: 'Custom products with your touch' },
    ];

    return (
        <section id="business" className="business section" ref={sectionRef}>
            <div className="container">
                {/* Section Header */}
                <div className="business-header">
                    <div className="section-label">
                        <HiStar className="label-icon" />
                        <span>My Business</span>
                    </div>
                    <h2 className="business-title">
                        <span className="title-highlight">Anvima</span>
                    </h2>
                    <p className="business-subtitle">
                        Creating memories that last forever
                    </p>
                </div>

                {/* Main Business Card */}
                <div className="business-card">
                    <div className="card-content">
                        <div className="card-badge">
                            <span className="badge-live" />
                            <span>Live Business</span>
                        </div>

                        <h3 className="card-title">Customized Gifts & Personalized Creations</h3>
                        <p className="card-description">
                            Anvima is my personal venture dedicated to crafting beautiful, meaningful gifts.
                            From custom photo frames to curated hampers, we help you celebrate special moments
                            with unique, personalized creations that your loved ones will treasure.
                        </p>

                        <a
                            href="https://anvima-web.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-cta"
                        >
                            <span>Visit Anvima</span>
                            <HiExternalLink />
                        </a>
                    </div>

                    <div className="card-visual">
                        <div className="visual-mockup">
                            <div className="mockup-browser">
                                <div className="browser-dots">
                                    <span></span><span></span><span></span>
                                </div>
                                <div className="browser-url">anvima-web.vercel.app</div>
                            </div>
                            <div className="mockup-screen">
                                <div className="screen-content">
                                    <FaGift className="screen-icon" />
                                    <span className="screen-text">Anvima</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="services-section">
                    <h4 className="services-title">
                        <HiSparkles className="title-icon" />
                        What We Offer
                    </h4>
                    <div className="services-grid">
                        {services.map((service, index) => (
                            <div key={index} className="service-card">
                                <div className="service-icon">
                                    <service.icon />
                                </div>
                                <h5 className="service-name">{service.title}</h5>
                                <p className="service-desc">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Business;
