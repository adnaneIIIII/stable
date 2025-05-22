"use client";
import Contact from "@/components/contact";
// import Features from "@/components/features-3";
import FooterSection from "@/components/footer";
import Banner from "@/components/home/banner";
import CallToAction from "@/components/home/CallToAction";

import Faq from "@/components/home/FAQs";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/hero";
import LogoTicker from "@/components/home/LogoTicker";
import Navbar from "@/components/home/navbar";
import Pricing from "@/components/home/pricing";
import ProductShow from "@/components/home/ProductShow";
import Testimonials from "@/components/testimonials";
import { bannerSection } from "@/services";
import React, { useEffect, useState } from "react";

type Product = {
  compareAtPrice: number;
  description: string;
  id: string;
  isFeatured: boolean;
  name: string;
  price: number;
  publishedAt: string;
  shortdescription: string;
  status: string;
  images: { url: string }[];
};

type GetProductResponse = {
  product: Product[];
};

export default function Page() {
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = (await bannerSection()) as GetProductResponse;
    setProduct(res.product);
    console.log(res.product);
  };

  return (
    <>
      <Banner />
      <Navbar />
      <HeroSection />
      <LogoTicker />
      <Features />
      <ProductShow />
      <Pricing product={product} />
      <Faq />
      <CallToAction />
      <Footer />
      {/*   <Carosal/>
      <Pricing product={product} />
      <Testimonials />
      <Contact />
      <FooterSection /> */}
    </>
  );
}
