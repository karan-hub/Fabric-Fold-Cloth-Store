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
        <div className="flex  justify-between items-center border-b border-pink-200 pb-8 mb-8">
          <div className="mb-6 text-center ">
            <h2 className="text-3xl sm:text-4xl font-bold text-pink-600">ClothApp</h2>
          </div>
          <div ref={socialIconsRef} className="flex justify-center space-x-8">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
          {[
            { 
              title: "About ClothApp", 
              content: "Elevate your style with ClothApp. We curate the finest fashion pieces, bringing you a seamless blend of comfort and elegance." 
            },
            { 
              title: "Explore", 
              links: ["New Arrivals", "Best Sellers", "Summer Collection", "Sustainable Fashion"] 
            },
            { 
              title: "Customer Care", 
              links: ["Track Order", "Returns & Exchanges", "Size Guide", "Gift Cards"] 
            },
            { 
              title: "Get in Touch", 
              items: [
                { icon: <FaMapMarkerAlt />, text: "123 Fashion Avenue, New York, NY 10001" },
                { icon: <FaEnvelope />, text: "hello@clothapp.com" },
                { icon: <FaPhone />, text: "+1 (555) 123-4567" }
              ]
            }
          ].map((section, index) => (
            <div key={section.title} ref={(el) => (sectionsRef.current[index] = el)} className="mb-8 sm:mb-0">
              <h6 className="text-xl sm:text-2xl font-bold mb-6 text-pink-700">{section.title}</h6>
              {section.content && <p className="text-gray-700 text-base sm:text-lg">{section.content}</p>}
              {section.links && (
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-700 hover:text-pink-600 transition-colors duration-300 text-base sm:text-lg">{link}</a>
                    </li>
                  ))}
                </ul>
              )}
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
          <span>© 2023 ClothApp - Elevate Your Style. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}