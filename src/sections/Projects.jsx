import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiExternalLink, HiChevronRight, HiSparkles } from 'react-icons/hi';
import { FaGithub, FaMedkit, FaUsers, FaBrain, FaCalendarCheck, FaFileAlt, FaGraduationCap, FaSeedling, FaShoppingCart } from 'react-icons/fa';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: 'PharmaCare+',
        subtitle: 'Medication Management System',
        description: 'Comprehensive medication management with expiry alert system reducing medicine wastage by 30%, donation platform for unused medicines, family management, and real-time analytics dashboard serving 500+ users.',
        tech: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Docker'],
        github: 'https://github.com/maneendra03/PharmaCare',
        live: '#',
        icon: FaMedkit,
        stats: [
            { label: 'Wastage Reduced', value: '30%' },
            { label: 'Active Users', value: '500+' },
            { label: 'APIs Built', value: '25+' },
        ],
        category: 'Healthcare',
        featured: true,
    },
    {
        id: 2,
        title: 'Communitfx',
        subtitle: 'Community Issue Reporting Platform',
        description: 'A community issue reporting platform supporting 5,000+ reports with AI-powered chatbot, reducing query resolution time by 40% and boosting engagement by 60%.',
        tech: ['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'AI'],
        github: 'https://github.com/maneendra03/Communitfx',
        live: '#',
        icon: FaUsers,
        stats: [
            { label: 'Reports', value: '5K+' },
            { label: 'Uptime', value: '99.9%' },
            { label: 'Resolution', value: '40%↑' },
        ],
        category: 'Community',
        featured: true,
    },
    {
        id: 3,
        title: 'CNN Poem Learning',
        subtitle: 'AI Research Project',
        description: 'Research project exploring CNN-based poem learning inspired by human rote learning. Novel approach to poetry understanding and generation using deep learning techniques.',
        tech: ['Python', 'TensorFlow', 'NLP', 'Deep Learning'],
        github: 'https://github.com/maneendra03/CNN-Based-Poem-Learning-Interpretation-Inspired-by-Human-Rote-Learning-',
        live: '#',
        icon: FaBrain,
        stats: [
            { label: 'Model Type', value: 'CNN' },
            { label: 'Research', value: 'Novel' },
            { label: 'Status', value: 'Active' },
        ],
        category: 'AI/ML',
        featured: false,
    },
    {
        id: 4,
        title: 'Resume Screener',
        subtitle: 'Automated Resume Screening Using NLP',
        description: 'AI-powered resume screening system using Natural Language Processing to automatically analyze and rank resumes, streamlining the recruitment process.',
        tech: ['Python', 'NLP', 'Machine Learning', 'Flask'],
        github: 'https://github.com/maneendra03/Automated-Resume-Screening-Using-NLP',
        live: '#',
        icon: FaFileAlt,
        stats: [
            { label: 'Accuracy', value: '90%+' },
            { label: 'Processing', value: 'Fast' },
            { label: 'Type', value: 'NLP' },
        ],
        category: 'AI/ML',
        featured: false,
    },
    {
        id: 5,
        title: 'Smart Study',
        subtitle: 'Intelligent Learning Platform',
        description: 'An intelligent study platform designed to enhance learning experiences with smart features, personalized content, and interactive study materials.',
        tech: ['React', 'Node.js', 'MongoDB', 'AI'],
        github: 'https://github.com/maneendra03/Smart_Study',
        live: '#',
        icon: FaGraduationCap,
        stats: [
            { label: 'Features', value: '10+' },
            { label: 'Experience', value: 'Smart' },
            { label: 'Learning', value: 'AI' },
        ],
        category: 'Education',
        featured: false,
    },
    {
        id: 6,
        title: 'Project Kisan',
        subtitle: 'Agricultural Technology Solution',
        description: 'A comprehensive agricultural platform empowering farmers with modern technology solutions, market insights, and resource management tools.',
        tech: ['React', 'Spring Boot', 'PostgreSQL', 'IoT'],
        github: 'https://github.com/maneendra03/project_kisan',
        live: '#',
        icon: FaSeedling,
        stats: [
            { label: 'Domain', value: 'AgriTech' },
            { label: 'Impact', value: 'Farmers' },
            { label: 'Tech', value: 'Modern' },
        ],
        category: 'AgriTech',
        featured: false,
    },
    {
        id: 7,
        title: 'Amazon Clone',
        subtitle: 'E-commerce Platform',
        description: 'A full-featured e-commerce platform clone with product listings, shopping cart, user authentication, and payment integration.',
        tech: ['React', 'Firebase', 'Stripe', 'CSS'],
        github: 'https://github.com/maneendra03/amazon-clone',
        live: '#',
        icon: FaShoppingCart,
        stats: [
            { label: 'Features', value: 'Full' },
            { label: 'Auth', value: 'Firebase' },
            { label: 'Payment', value: 'Stripe' },
        ],
        category: 'E-commerce',
        featured: false,
    },
    {
        id: 8,
        title: 'Exam Scheduler',
        subtitle: 'Smart Seating Arrangement',
        description: 'Automated exam scheduling system with advanced conflict detection algorithm, reducing manual work by 80% and minimizing scheduling conflicts by 90%.',
        tech: ['React', 'PHP', 'MySQL', 'Algorithm'],
        github: 'https://github.com/maneendra03/Exam-Seating-Arrangement',
        live: '#',
        icon: FaCalendarCheck,
        stats: [
            { label: 'Manual Work', value: '80%↓' },
            { label: 'Users', value: '1K+' },
            { label: 'Conflicts', value: '90%↓' },
        ],
        category: 'Education',
        featured: false,
    },
];

const Projects = () => {
    const sectionRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);
    const [hoveredProject, setHoveredProject] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.featured-project',
                { y: 100, opacity: 0, rotateX: 15 },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.featured-grid',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.project-item',
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.projects-list',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const featuredProjects = projects.filter(p => p.featured);
    const otherProjects = projects.filter(p => !p.featured);

    return (
        <section id="projects" className="projects section" ref={sectionRef}>
            <div className="container">
                {/* Section Header */}
                <div className="projects-header">
                    <div className="section-label">
                        <HiSparkles className="label-icon" />
                        <span>Featured Work</span>
                    </div>
                    <h2 className="projects-title">
                        Technical <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="projects-subtitle">
                        Building solutions that make a difference
                    </p>
                </div>

                {/* Featured Projects */}
                <div className="featured-grid">
                    {featuredProjects.map((project, index) => (
                        <article
                            key={project.id}
                            className={`featured-project ${hoveredProject === project.id ? 'hovered' : ''}`}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            <div className="project-bg">
                                <div className="bg-pattern" />
                            </div>

                            <div className="project-badge">
                                <span className="badge-number">0{index + 1}</span>
                                <span className="badge-category">{project.category}</span>
                            </div>

                            <div className="project-icon-wrap">
                                <project.icon className="project-icon" />
                            </div>

                            <div className="project-content">
                                <span className="project-subtitle">{project.subtitle}</span>
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>

                                <div className="project-stats">
                                    {project.stats.map((stat, i) => (
                                        <div key={i} className="stat-item">
                                            <span className="stat-value">{stat.value}</span>
                                            <span className="stat-label">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="project-tech">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="tech-pill">{tech}</span>
                                    ))}
                                </div>

                                <div className="project-actions">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="action-btn secondary"
                                    >
                                        <FaGithub />
                                        <span>View Code</span>
                                    </a>
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="action-btn primary"
                                    >
                                        <span>Live Demo</span>
                                        <HiExternalLink />
                                    </a>
                                </div>
                            </div>

                            <div className="project-decoration">
                                <div className="deco-line" />
                                <div className="deco-dot" />
                            </div>
                        </article>
                    ))}
                </div>

                {/* Other Projects */}
                <div className="other-projects">
                    <h3 className="other-title">
                        <span className="title-line" />
                        More Projects
                        <span className="title-line" />
                    </h3>

                    <div className="projects-list">
                        {otherProjects.map((project) => (
                            <article
                                key={project.id}
                                className={`project-item ${activeProject === project.id ? 'expanded' : ''}`}
                                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                            >
                                <div className="item-header">
                                    <div className="item-icon">
                                        <project.icon />
                                    </div>
                                    <div className="item-info">
                                        <h4 className="item-title">{project.title}</h4>
                                        <span className="item-category">{project.category}</span>
                                    </div>
                                    <div className="item-tech-preview">
                                        {project.tech.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="tech-mini">{tech}</span>
                                        ))}
                                    </div>
                                    <div className="item-links">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="item-link"
                                        >
                                            <FaGithub />
                                        </a>
                                    </div>
                                    <HiChevronRight className={`item-arrow ${activeProject === project.id ? 'rotated' : ''}`} />
                                </div>

                                {activeProject === project.id && (
                                    <div className="item-details">
                                        <p className="item-description">{project.description}</p>
                                        <div className="item-stats">
                                            {project.stats.map((stat, i) => (
                                                <div key={i} className="mini-stat">
                                                    <span className="mini-value">{stat.value}</span>
                                                    <span className="mini-label">{stat.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
