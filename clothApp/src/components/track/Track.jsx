import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Track = () => {
    const sectionRef = useRef(null);
    const tracksRef = useRef([]);
    const titleRef = useRef(null);

    useEffect(() => {
        const tracks = tracksRef.current;

        // Create a GSAP context
        const ctx = gsap.context(() => {
            // Animate the section when it comes into view
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'top center',
                    scrub: true,
                },
            });

            // Animate the title
            gsap.from(titleRef.current, {
                opacity: 0,
                y: -30,
                duration: 1,
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: 'top bottom',
                    end: 'top center',
                    scrub: true,
                },
            });

            // Animate each track element with stagger and 3D effect
            tracks.forEach((track, index) => {
                gsap.from(track, {
                    opacity: 0,
                    scale: 0.8,
                    rotateY: 45,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: track,
                        start: 'top bottom',
                        end: 'top center',
                        scrub: true,
                    },
                });
            });
        }, sectionRef);

        // Cleanup function
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-gradient-to-br from-pink-50 to-purple-100 py-16 md:py-24">
            <div className="container mx-auto px-5">
                <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center text-pink-600 mb-12">Our Features</h2>
                <div className="flex flex-wrap -m-4 text-center justify-center">
                    {[
                        { title: "Premium T-shirts", description: "Our T-Shirts are 100% made of premium cotton.", icon: "M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" },
                        { title: "Stylish Designs", description: "Unique patterns crafted by top designers.", icon: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" },
                        { title: "Eco-Friendly", description: "Sustainable materials for a greener future.", icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" },
                    ].map((item, index) => (
                        <div key={index} className="p-4 md:w-1/3 sm:w-1/2 w-full" ref={el => (tracksRef.current[index] = el)}>
                            <div className="bg-white border-2 border-pink-200 rounded-lg p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                                <svg className="text-pink-600 w-12 h-12 mb-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Track;
