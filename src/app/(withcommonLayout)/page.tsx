import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import React from "react";
import PopularProducts from "@/components/home/PopularProducts";
import Offer from "@/components/home/Offer";
import Marque from "@/components/home/Marque";

import Faq from "@/components/home/Faq";
import Newstls from "@/components/home/Newstls";
import Shipping from "@/components/home/Shipping";
import TestimonialSlide from "@/components/home/TestimonialSlide";

// Get the backend URL from environment variables
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const Home = async () => {
  const res = await fetch(`${BACKEND_URL}/api/product`, {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>

      <PopularProducts products={products.data}></PopularProducts>
      <Offer></Offer>
      <Shipping></Shipping>
      <Marque></Marque>
      <Faq></Faq>
      <TestimonialSlide />
      <Newstls></Newstls>
    </div>
  );
};

export default Home;
