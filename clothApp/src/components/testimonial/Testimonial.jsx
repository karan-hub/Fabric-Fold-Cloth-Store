import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonial = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const testimonialTrackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const testimonialTrack = testimonialTrackRef.current;

    gsap.fromTo(title, 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }}
    );

    gsap.fromTo(description,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }}
    );

    // Infinite horizontal scroll animation
    gsap.to(testimonialTrack, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (testimonialTrack.offsetWidth / 2))
      }
    });
  }, []);

  const testimonials = [
    {
      name: "Emily Johnson",
      role: "Fashion Blogger",
      content: "ClothApp has revolutionized my wardrobe! The quality and style of their clothes are unmatched. I'm always excited to see their new collections.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      content: "As someone always on the go, I appreciate ClothApp's efficient service and trendy selections. It's my go-to for both casual and business attire.",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Sophia Rodriguez",
      role: "Fitness Instructor",
      content: "The athleisure collection from ClothApp is perfect for my active lifestyle. Comfortable, stylish, and durable - exactly what I need!",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    // Duplicate testimonials to create a seamless loop
    {
      name: "Emily Johnson",
      role: "Fashion Blogger",
      content: "ClothApp has revolutionized my wardrobe! The quality and style of their clothes are unmatched. I'm always excited to see their new collections.",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      content: "As someone always on the go, I appreciate ClothApp's efficient service and trendy selections. It's my go-to for both casual and business attire.",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      name: "Sophia Rodriguez",
      role: "Fitness Instructor",
      content: "The athleisure collection from ClothApp is perfect for my active lifestyle. Comfortable, stylish, and durable - exactly what I need!",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    }
  ];

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-pink-50 to-purple-100 py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-pink-600 mb-4">
            What Our Customers Say
          </h2>
          <p ref={descriptionRef} className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with ClothApp.
          </p>
        </div>

        <div className="overflow-hidden">
          <div ref={testimonialTrackRef} className="flex">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-80 mx-4 bg-white rounded-lg shadow-xl p-6 transform transition duration-300 hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-pink-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="mt-4 flex justify-end">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;