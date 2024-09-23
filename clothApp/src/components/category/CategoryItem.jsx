import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from "react-router-dom";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    image: 'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Dresses',
  },
  {
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Skirts',
  },
  {
    image: 'https://ilovesarees.com/cdn/shop/files/Coral-Red-Cap-Sleeve-Readymade-Blouse5.webp?v=1706857735&width=493',
    name: 'Blouses',
  },
  {
    image: 'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Tops',
  },
  {
    image: 'https://images.pexels.com/photos/1144834/pexels-photo-1144834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Jeans',
  },
  {
    image: 'https://images.pexels.com/photos/12737493/pexels-photo-12737493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Pants',
  },
  {
    image: 'https://images.pexels.com/photos/26794822/pexels-photo-26794822/free-photo-of-a-woman-wearing-high-heeled-leather-boots.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Shorts',
  },
  {
    image: 'https://images.pexels.com/photos/620074/pexels-photo-620074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Jackets',
  },
  {
    image: 'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Women\'s Sweaters',
  },
  {
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Coats',
  },
  {
    image: 'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Activewear',
  },
  {
    image: 'https://images.pexels.com/photos/1144834/pexels-photo-1144834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Swimwear',
  },
  {
    image: 'https://images.pexels.com/photos/12737493/pexels-photo-12737493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Lingerie',
  },
  {
    image: 'https://images.pexels.com/photos/26794822/pexels-photo-26794822/free-photo-of-a-woman-wearing-high-heeled-leather-boots.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Sleepwear',
  },
  {
    image: 'https://images.pexels.com/photos/620074/pexels-photo-620074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Accessories',
  },
  {
    image: 'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg?auto=compress&cs=tinysrgb&w=600',
    name: 'Women\'s Shoes',
  },
  {
    image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Bags',
  },
  {
    image: 'https://images.pexels.com/photos/794062/pexels-photo-794062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Jewelry',
  },
  {
    image: 'https://images.pexels.com/photos/1144834/pexels-photo-1144834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Scarves',
  },
  {
    image: 'https://images.pexels.com/photos/12737493/pexels-photo-12737493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    name: 'Women\'s Belts',
  },
];

const Category = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      '.category-item',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="relative py-8 md:py-16 bg-gradient-to-b from-gray-100 to-white">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-12 text-gray-800">Shop by Category</h1>
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto hide-scroll-bar" ref={containerRef}>
          <div className="flex flex-nowrap space-x-4 md:space-x-6 pb-4 md:pb-0">
            {categories.map((item, index) => (
              <div
                key={index}
                className="category-item flex-shrink-0"
              >
                <div 
                  onClick={() => handleCategoryClick(item.name)}
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-1 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                >
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </div>
                <h2 className="mt-2 md:mt-4 text-xs md:text-sm lg:text-base text-center font-semibold text-gray-700 capitalize">
                  {item.name}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
        .hide-scroll-bar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
    </div>
  );
};

export default Category;
