import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaCode, FaStar, FaCodeBranch, FaUsers } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import './GitHubStats.css';

gsap.registerPlugin(ScrollTrigger);

const GITHUB_USERNAME = 'maneendra03';

const GitHubStats = () => {
    const sectionRef = useRef(null);
    const [stats, setStats] = useState({
        repos: 0,
        stars: 0,
        followers: 0,
        contributions: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch GitHub stats
        const fetchGitHubStats = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
                const userData = await userResponse.json();

                // Fetch repos to count stars
                const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
                const reposData = await reposResponse.json();

                const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
                const totalForks = reposData.reduce((acc, repo) => acc + repo.forks_count, 0);

                setStats({
                    repos: userData.public_repos || 0,
                    stars: totalStars,
                    followers: userData.followers || 0,
                    forks: totalForks,
                });
            } catch (error) {
                console.error('Error fetching GitHub stats:', error);
                // Fallback to default values
                setStats({
                    repos: 25,
                    stars: 10,
                    followers: 5,
                    forks: 15,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGitHubStats();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.github-header',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.stat-card',
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.stats-grid',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            gsap.fromTo(
                '.contribution-graph',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3,
                    scrollTrigger: {
                        trigger: '.contribution-section',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [loading]);

    const statItems = [
        { icon: FaCode, value: stats.repos, label: 'Repositories' },
        { icon: FaStar, value: stats.stars, label: 'Stars Earned' },
        { icon: FaUsers, value: stats.followers, label: 'Followers' },
        { icon: FaCodeBranch, value: stats.forks || 0, label: 'Forks' },
    ];

    return (
        <section className="github-stats section" ref={sectionRef}>
            <div className="container">
                {/* Header */}
                <div className="github-header">
                    <div className="section-label">
                        <FaGithub className="label-icon" />
                        <span>GitHub Activity</span>
                    </div>
                    <h2 className="github-title">
                        Open Source <span className="gradient-text">Contributions</span>
                    </h2>
                    <p className="github-subtitle">
                        Building in public, one commit at a time
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    {statItems.map((stat, index) => (
                        <div key={index} className="stat-card">
                            <div className="stat-icon">
                                <stat.icon />
                            </div>
                            <div className="stat-value">
                                {loading ? '...' : stat.value}
                            </div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Contribution Graph */}
                <div className="contribution-section">
                    <div className="contribution-graph">
                        <div className="graph-header">
                            <HiSparkles className="graph-icon" />
                            <span>Contribution Activity</span>
                        </div>
                        <img
                            src={`https://ghchart.rshah.org/ffffff/${GITHUB_USERNAME}`}
                            alt="GitHub Contribution Graph"
                            className="graph-image"
                        />
                    </div>
                </div>

                {/* GitHub Profile Link */}
                <div className="github-cta">
                    <a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="github-btn"
                    >
                        <FaGithub />
                        <span>View GitHub Profile</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default GitHubStats;
