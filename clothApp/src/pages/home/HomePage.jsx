import React from 'react';
import Category from "../../components/category/CategoryItem";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Layout from "../../components/layout/Layout";
import Testimonials from "../../components/testimonial/Testimonial";
import Track from "../../components/track/Track";
import Loader from '../../components/loader/Loader';

const HomePage = () => {
    return (
        <Layout>
            <HeroSection />
            <Category />
            <HomePageProductCard />
            <Track />
            <Testimonials />
            <Loader/>
        </Layout>
    );
}

export default HomePage;