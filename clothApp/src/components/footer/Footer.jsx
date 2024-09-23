import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const socialIconsRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const footer = footerRef.current;
    const socialIcons = socialIconsRef.current;
    const sections = sectionsRef.current;

    gsap.fromTo(footer, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "play none none reverse"
      }}
    );

    gsap.fromTo(socialIcons.children, 
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }
    );

    sections.forEach((section, index) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, delay: index * 0.2, scrollTrigger: {
          trigger: section,
          start: "top bottom-=100",
          end: "bottom bottom",
          toggleActions: "play none none reverse"
        }}
      );
    });
  }, []);

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-pink-50 to-purple-100 text-gray-800">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="flex justify-between items-center border-b border-pink-200 pb-8 mb-8">
          <div className="mb-6 text-center ">
            <h6 className="text-xl items-center justify-center sm:text-4xl font-bold text-pink-600">THE FABRIC FOLD</h6>
          </div>
          <div ref={socialIconsRef} className="flex    items-center gap-3 sm:space-x-8">
            {[
              { icon: <FaFacebookF />, href: '#facebook' },
              { icon: <FaTwitter />, href: '#twitter' },
              { icon: <FaInstagram />, href: '#instagram' }
            ].map((social, index) => (
              <a key={index} href={social.href} className="text-pink-500 hover:text-pink-700 transition-colors duration-300 text-2xl sm:text-3xl">
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-row gap-12">
          {[
            { 
              title: "ABOUT THE FABRIC FOLD", 
              content: "Elevate your style with THE FABRIC FOLD. We curate the finest fashion pieces, bringing you a seamless blend of comfort and elegance." 
            },
            { 
              title: "Customer Care", 
              items: [
                { icon: <FaMapMarkerAlt />, text: "123 Fashion Avenue, New York, NY 10001" },
                { icon: <FaEnvelope />, text: "hello@thefabricfold.com" },
                { icon: <FaPhone />, text: "+91 8390394421" }
              ]
            }
          ].map((section, index) => (
            <div key={section.title} ref={(el) => (sectionsRef.current[index] = el)} className="flex-1 mb-8 sm:mb-0 p-6 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
              <h6 className="text-xl sm:text-2xl font-bold mb-4 text-pink-700">{section.title}</h6>
              {section.content && <p className="text-gray-700 text-base sm:text-lg mb-4">{section.content}</p>}
              {section.items && (
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-pink-500 mr-4 text-lg sm:text-xl">{item.icon}</span>
                      <span className="text-gray-700 text-base sm:text-lg">{item.text}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-pink-600 py-6">
        <div className="container mx-auto px-4 text-center text-sm sm:text-base text-white">
          <span>© 2023 THE FABRIC FOLD - Elevate Your Style. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}