import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiAcademicCap, HiOfficeBuilding, HiLightningBolt, HiCode, HiUserGroup, HiTrendingUp } from 'react-icons/hi';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: HiCode, value: '5+', label: 'Major Projects', color: '#ffffff' },
    { icon: HiLightningBolt, value: '15+', label: 'Hackathons', color: '#ffffff' },
    { icon: HiUserGroup, value: '15+', label: 'Events Led', color: '#ffffff' },
    { icon: HiTrendingUp, value: '500+', label: 'Users Impacted', color: '#ffffff' },
];

const timeline = [
    {
        icon: HiAcademicCap,
        date: 'Nov 2022 – Sept 2026',
        title: 'B.Tech in Computer Science',
        subtitle: 'CMR College of Engineering & Technology',
        detail: 'GPA: 7.82',
        type: 'education',
    },
    {
        icon: HiOfficeBuilding,
        date: '2025 – 2026',
        title: 'Core Advisor, Student Council',
        subtitle: 'CMRCET',
        detail: 'Advising and mentoring student initiatives',
        type: 'leadership',
        featured: true,
    },
    {
        icon: HiOfficeBuilding,
        date: '2024 – 2025',
        title: 'General Secretary, Arts & Culture',
        subtitle: 'CMRCET',
        detail: 'Led 50+ volunteers, organized 15+ events',
        type: 'leadership',
    },
    {
        icon: HiAcademicCap,
        date: 'June 2020 – Sept 2022',
        title: 'Intermediate (MPC)',
        subtitle: "St. Mary's Centenary Junior College",
        detail: 'Percentage: 80%',
        type: 'education',
    },
];

const About = () => {
    const sectionRef = useRef(null);
    const statsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate intro text
            gsap.fromTo(
                '.about-intro > *',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Animate stats cards
            gsap.fromTo(
                '.stat-card',
                { y: 40, opacity: 0, scale: 0.9 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Animate timeline
            gsap.fromTo(
                '.timeline-card',
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: '.about-journey',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" className="about section" ref={sectionRef}>
            {/* Background Elements */}
            <div className="about-bg">
                <div className="bg-gradient-orb orb-1" />
                <div className="bg-gradient-orb orb-2" />
                <div className="bg-grid" />
            </div>

            <div className="container">
                {/* Section Header */}
                <div className="about-header">
                    <div className="section-label">
                        <span className="label-dot" />
                        <span>About Me</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="about-grid">
                    {/* Left: Introduction */}
                    <div className="about-intro">
                        <h2 className="intro-title">
                            Building <span className="text-gradient">digital solutions</span>
                            <br />that make an impact
                        </h2>

                        <div className="intro-content">
                            <p className="intro-text lead">
                                I'm a final year B.Tech Computer Science student with a passion for
                                creating innovative solutions that address real-world challenges in
                                healthcare and community development.
                            </p>
                            <p className="intro-text">
                                With experience across full-stack development, I specialize in building
                                scalable applications using React, Spring Boot, and PostgreSQL. I believe
                                in the power of technology to connect people and solve meaningful problems.
                            </p>
                        </div>

                        {/* Skills Highlight */}
                        <div className="intro-skills">
                            <span className="skill-tag">Full-Stack Development</span>
                            <span className="skill-tag">Healthcare Tech</span>
                            <span className="skill-tag">Community Platforms</span>
                            <span className="skill-tag">AI/ML Research</span>
                        </div>
                    </div>

                    {/* Right: Stats Grid */}
                    <div className="about-stats" ref={statsRef}>
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="stat-card"
                                style={{ '--stat-color': stat.color }}
                            >
                                <div className="stat-icon-wrap">
                                    <stat.icon className="stat-icon" />
                                </div>
                                <div className="stat-content">
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                                <div className="stat-glow" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Journey Timeline */}
                <div className="about-journey">
                    <h3 className="journey-title">
                        <span className="title-line" />
                        My Journey
                        <span className="title-line" />
                    </h3>

                    <div className="timeline-grid">
                        {timeline.map((item, index) => (
                            <div
                                key={index}
                                className={`timeline-card ${item.featured ? 'featured' : ''} ${item.type}`}
                            >
                                <div className="card-header">
                                    <div className="card-icon">
                                        <item.icon />
                                    </div>
                                    <span className="card-date">{item.date}</span>
                                </div>
                                <h4 className="card-title">{item.title}</h4>
                                <p className="card-subtitle">{item.subtitle}</p>
                                <p className="card-detail">{item.detail}</p>

                                {item.featured && (
                                    <div className="featured-badge">Current</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
