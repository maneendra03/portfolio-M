import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiOutlineStar, HiOutlineSparkles, HiOutlineFire } from 'react-icons/hi';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
    {
        id: 1,
        icon: HiOutlineSparkles,
        title: '2nd Runner-Up',
        event: 'HackByte: National-Level Hackathon',
        venue: 'Vellore Institute of Technology, Andhra Pradesh',
        detail: 'Out of 300+ teams',
        date: 'October 2024',
        color: '#FFD700',
    },
    {
        id: 2,
        icon: HiOutlineStar,
        title: 'Honorable Mention',
        event: 'SDG 11: Sustainable Cities and Communities',
        venue: 'IIT Hyderabad FCCxAIESEC',
        detail: 'Recognition for innovation',
        date: 'October 2024',
        color: '#C0C0C0',
    },
    {
        id: 3,
        icon: HiOutlineFire,
        title: 'Finalist',
        event: 'Specathon 2024: 36-Hour Hackathon',
        venue: "St. Peter's Engineering College, Hyderabad",
        detail: 'National-Level Competition',
        date: '2024',
        color: '#CD7F32',
    },
];

const Achievements = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.achievement-card',
                {
                    y: 80,
                    opacity: 0,
                    rotateX: 15,
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
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

    return (
        <section id="achievements" className="achievements section" ref={sectionRef}>
            <div className="container">
                <div className="section-title">
                    <span>04</span>
                    Achievements
                </div>

                <div className="achievements-grid">
                    {achievements.map((achievement) => (
                        <article key={achievement.id} className="achievement-card">
                            <div
                                className="achievement-icon"
                                style={{ '--icon-color': achievement.color }}
                            >
                                <achievement.icon />
                            </div>

                            <div className="achievement-content">
                                <span className="achievement-date">{achievement.date}</span>
                                <h3 className="achievement-title">{achievement.title}</h3>
                                <h4 className="achievement-event">{achievement.event}</h4>
                                <p className="achievement-venue">{achievement.venue}</p>
                                <span className="achievement-detail">{achievement.detail}</span>
                            </div>

                            <div className="achievement-shine" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
