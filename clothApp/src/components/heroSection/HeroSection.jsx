import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subTextRef = useRef(null);
  const btnRef = useRef(null);
  const videoRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorCircleRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const subText = subTextRef.current;
    const btn = btnRef.current;
    const video = videoRef.current;

    // GSAP animations for the hero section elements
    gsap.set([heading, subText, btn], { autoAlpha: 0, y: 50 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(video, { scale: 1.2 }, { scale: 1, duration: 2.5, ease: 'power2.out' })
      .to(heading, { autoAlpha: 1, y: 0, duration: 1 }, '-=1.5')
      .to(subText, { autoAlpha: 1, y: 0, duration: 1 }, '-=0.8')
      .to(btn, { autoAlpha: 1, y: 0, duration: 1 }, '-=0.6');

    // Parallax effect on scroll
    gsap.to(section, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Enhanced cursor animation with increased gap
    const cursor = cursorRef.current;
    const cursorCircle = cursorCircleRef.current;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Main cursor
      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.1,
        ease: 'power2.out'
      });

      // Cursor circle with delay, elasticity, and increased gap
      gsap.to(cursorCircle, {
        x: x - 20, // Offset by 20 pixels horizontally
        y: y - 20, // Offset by 20 pixels vertically
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)'
      });

      // Scale effect on movement
      gsap.to(cursor, {
        scale: 1.2,
        duration: 0.2,
        ease: 'power2.out'
      });

      gsap.to(cursorCircle, {
        scale: 1.5,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    };

    // Hover effects for interactive elements
    const handleMouseEnter = () => {
      gsap.to(cursorCircle, { scale: 2, duration: 0.3, ease: 'power2.out' });
      gsap.to(cursor, { scale: 0.5, duration: 0.3, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(cursorCircle, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
    };

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      // Remove event listeners when component unmounts
      document.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const handleButtonClick = (path) => {
    // Navigate to the specified path
    navigate(path);
  };

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="https://sowhat.one/upload/image-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content Wrapper */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-6 lg:px-16 text-center">
          {/* Text Content */}
          <h1
            ref={headingRef}
            className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8 shadow-text"
          >
            Elevate Your Style
          </h1>
          <p
            ref={subTextRef}
            className="text-xl lg:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto shadow-text"
          >
            Discover our curated collection of premium clothing for the modern trendsetter. Unleash your unique style today.
          </p>

          {/* Call to Action */}
          <div ref={btnRef} className="flex justify-center space-x-6">
            <button
              onClick={() => handleButtonClick("/allproduct")}
              className="bg-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-pink-700 transition duration-300 transform hover:scale-105"
            >
              Shop Now
            </button>
            <button
              onClick={() => handleButtonClick("/allproduct")}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-white hover:text-pink-600 transition duration-300 transform hover:scale-105"
            >
              Explore Collections
            </button>
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="cursor fixed top-0 left-0 w-4 h-4 bg-pink-600 rounded-full pointer-events-none mix-blend-difference"></div>
      <div ref={cursorCircleRef} className="cursor-circle fixed top-0 left-0 w-16 h-16 border-2 border-pink-600 rounded-full pointer-events-none mix-blend-difference"></div>

      {/* Add some floating elements for extra visual interest */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-pink-500 rounded-full opacity-20 animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-500 rounded-full opacity-20 animate-float animation-delay-2000"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-yellow-500 rounded-full opacity-20 animate-float animation-delay-4000"></div>
    </section>
  );
};

export default HeroSection;
