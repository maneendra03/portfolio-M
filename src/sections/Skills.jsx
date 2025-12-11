import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    FaJava, FaReact, FaDocker, FaGithub, FaDatabase, FaHtml5, FaCss3Alt, FaNode, FaPython
} from 'react-icons/fa';
import {
    SiSpringboot, SiPostgresql, SiMysql, SiMongodb, SiJavascript, SiCplusplus, SiJenkins, SiTypescript, SiTailwindcss
} from 'react-icons/si';
import { HiCode, HiServer, HiDatabase, HiCog } from 'react-icons/hi';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
    {
        id: 'languages',
        title: 'Languages',
        icon: HiCode,
        color: '#F59E0B',
        skills: [
            { name: 'Java', icon: FaJava, level: 90 },
            { name: 'JavaScript', icon: SiJavascript, level: 85 },
            { name: 'TypeScript', icon: SiTypescript, level: 80 },
            { name: 'Python', icon: FaPython, level: 75 },
            { name: 'C/C++', icon: SiCplusplus, level: 70 },
        ],
    },
    {
        id: 'frontend',
        title: 'Frontend',
        icon: FaReact,
        color: '#6366F1',
        skills: [
            { name: 'React.js', icon: FaReact, level: 90 },
            { name: 'HTML5', icon: FaHtml5, level: 95 },
            { name: 'CSS3', icon: FaCss3Alt, level: 90 },
            { name: 'Tailwind', icon: SiTailwindcss, level: 85 },
        ],
    },
    {
        id: 'backend',
        title: 'Backend',
        icon: HiServer,
        color: '#10B981',
        skills: [
            { name: 'Spring Boot', icon: SiSpringboot, level: 85 },
            { name: 'Node.js', icon: FaNode, level: 75 },
        ],
    },
    {
        id: 'database',
        title: 'Databases',
        icon: HiDatabase,
        color: '#EC4899',
        skills: [
            { name: 'PostgreSQL', icon: SiPostgresql, level: 85 },
            { name: 'MySQL', icon: SiMysql, level: 80 },
            { name: 'MongoDB', icon: SiMongodb, level: 70 },
        ],
    },
    {
        id: 'devops',
        title: 'DevOps & Tools',
        icon: HiCog,
        color: '#14B8A6',
        skills: [
            { name: 'Docker', icon: FaDocker, level: 75 },
            { name: 'GitHub Actions', icon: FaGithub, level: 80 },
            { name: 'Jenkins', icon: SiJenkins, level: 65 },
        ],
    },
];

const Skills = () => {
    const sectionRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState('languages');
    const [hoveredSkill, setHoveredSkill] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate category tabs
            gsap.fromTo(
                '.category-tab',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Animate skill showcase
            gsap.fromTo(
                '.skill-showcase',
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.skills-display',
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const activeData = skillCategories.find(cat => cat.id === activeCategory);

    return (
        <section id="skills" className="skills section" ref={sectionRef}>
            {/* Background */}
            <div className="skills-bg">
                <div className="bg-hex-pattern" />
                <div className="bg-glow-center" />
            </div>

            <div className="container">
                {/* Section Header */}
                <div className="skills-header">
                    <div className="section-label">
                        <HiCode className="label-icon" />
                        <span>Tech Stack</span>
                    </div>
                    <h2 className="skills-title">
                        Technologies I <span className="gradient-text">Master</span>
                    </h2>
                    <p className="skills-subtitle">
                        Building robust solutions with modern technologies
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="category-tabs">
                    {skillCategories.map((category) => (
                        <button
                            key={category.id}
                            className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                            style={{ '--tab-color': category.color }}
                        >
                            <category.icon className="tab-icon" />
                            <span className="tab-label">{category.title}</span>
                            <span className="tab-count">{category.skills.length}</span>
                        </button>
                    ))}
                </div>

                {/* Skills Display */}
                <div className="skills-display">
                    {/* Central Showcase */}
                    <div className="skill-showcase" style={{ '--showcase-color': activeData?.color }}>
                        <div className="showcase-inner">
                            <div className="showcase-ring ring-1" />
                            <div className="showcase-ring ring-2" />
                            <div className="showcase-ring ring-3" />

                            <div className="showcase-center">
                                {activeData && <activeData.icon className="showcase-icon" />}
                                <span className="showcase-title">{activeData?.title}</span>
                            </div>

                            {/* Orbiting Skills */}
                            <div className="orbiting-skills">
                                {activeData?.skills.map((skill, index) => {
                                    const angle = (index * 360) / activeData.skills.length;
                                    const isHovered = hoveredSkill === skill.name;

                                    return (
                                        <div
                                            key={skill.name}
                                            className={`orbit-skill ${isHovered ? 'hovered' : ''}`}
                                            style={{
                                                '--angle': `${angle}deg`,
                                                '--delay': `${index * 0.1}s`,
                                            }}
                                            onMouseEnter={() => setHoveredSkill(skill.name)}
                                            onMouseLeave={() => setHoveredSkill(null)}
                                        >
                                            <div className="skill-node">
                                                <skill.icon className="skill-node-icon" />
                                                <div className="skill-tooltip">
                                                    <span className="tooltip-name">{skill.name}</span>
                                                    <div className="tooltip-bar">
                                                        <div
                                                            className="tooltip-fill"
                                                            style={{ width: `${skill.level}%` }}
                                                        />
                                                    </div>
                                                    <span className="tooltip-level">{skill.level}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Skills List (Mobile/Alt View) */}
                    <div className="skills-list-alt">
                        {activeData?.skills.map((skill, index) => (
                            <div
                                key={skill.name}
                                className="skill-bar-item"
                                style={{ '--item-delay': `${index * 0.1}s` }}
                            >
                                <div className="bar-header">
                                    <skill.icon className="bar-icon" style={{ color: activeData.color }} />
                                    <span className="bar-name">{skill.name}</span>
                                    <span className="bar-level">{skill.level}%</span>
                                </div>
                                <div className="bar-track">
                                    <div
                                        className="bar-fill"
                                        style={{
                                            width: `${skill.level}%`,
                                            background: `linear-gradient(90deg, ${activeData.color}, transparent)`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Marquee */}
                <div className="tech-marquee">
                    <div className="marquee-track">
                        {[...skillCategories.flatMap(c => c.skills), ...skillCategories.flatMap(c => c.skills)].map((skill, i) => (
                            <span key={i} className="marquee-item">
                                <skill.icon className="marquee-icon" />
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
