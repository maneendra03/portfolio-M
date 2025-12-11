import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';
import { FaQuoteLeft } from 'react-icons/fa';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        name: 'Prof. Rajesh Kumar',
        role: 'Faculty Advisor, CMRCET',
        content: 'Maneendra has consistently demonstrated exceptional problem-solving skills and leadership. His dedication to developing healthcare solutions like AyuCare shows his commitment to creating meaningful impact.',
        rating: 5,
    },
    {
        id: 2,
        name: 'Hackathon Team Member',
        role: 'Smart India Hackathon',
        content: 'Working with Maneendra was an incredible experience. His technical expertise and ability to lead under pressure helped us achieve our goals. He always brings innovative ideas to the table.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Student Council',
        role: 'CMRCET',
        content: 'As General Secretary of Arts & Culture, Maneendra organized 15+ events flawlessly. His organizational skills and ability to motivate teams made every event a success.',
        rating: 5,
    },
];

const Testimonials = () => {
    const sectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.testimonials-header',
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
                '.testimonial-card',
                { y: 80, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: '.testimonials-slider',
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const current = testimonials[currentIndex];

    return (
        <section className="testimonials section" ref={sectionRef}>
            <div className="container">
                {/* Header */}
                <div className="testimonials-header">
                    <div className="section-label">
                        <FaQuoteLeft className="label-icon" />
                        <span>Testimonials</span>
                    </div>
                    <h2 className="testimonials-title">
                        What People <span className="gradient-text">Say</span>
                    </h2>
                </div>

                {/* Slider */}
                <div className="testimonials-slider">
                    <div className="testimonial-card">
                        <div className="quote-icon">
                            <FaQuoteLeft />
                        </div>

                        <p className="testimonial-content">{current.content}</p>

                        <div className="testimonial-rating">
                            {[...Array(current.rating)].map((_, i) => (
                                <HiStar key={i} className="star-icon" />
                            ))}
                        </div>

                        <div className="testimonial-author">
                            <div className="author-avatar">
                                {current.name.charAt(0)}
                            </div>
                            <div className="author-info">
                                <h4 className="author-name">{current.name}</h4>
                                <p className="author-role">{current.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="slider-nav">
                        <button className="nav-btn" onClick={prevTestimonial}>
                            <HiChevronLeft />
                        </button>
                        <div className="slider-dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`dot ${i === currentIndex ? 'active' : ''}`}
                                    onClick={() => setCurrentIndex(i)}
                                />
                            ))}
                        </div>
                        <button className="nav-btn" onClick={nextTestimonial}>
                            <HiChevronRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
