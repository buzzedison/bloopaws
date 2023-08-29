"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Link from 'next/link';

SwiperCore.use([Navigation]);

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <Swiper
        navigation
        spaceBetween={50}
        slidesPerView={1}
      >
        <SwiperSlide key={post._id} className="m-4 p-4">
  <h1 className="mt-12">{post.title}</h1>
  <div className="relative w-full h-64">
    <div className="absolute z-[-1] inset-0">
      {post.mainImage ? (
        <Image
          src={builder.image(post.mainImage).width(1000).height(600).url()}
          width={1200}
          height={600}
          alt={post?.mainImage?.alt}
        />
      ) : null}
    </div>
  </div>
  <div className="mt-24 mb-24">
    {post.body ? <PortableText value={post.body} /> : null}
  </div>
  <Link href={`/posts/${post.slug}`}>
    <a className="mt-8 px-12 py-3 bg-gradient-to-r from-primary to-primaryDark hover:opacity-90 text-xl text-white/90 font-semibold drop-shadow-lg rounded-full">
      Learn more
    </a>
  </Link>
</SwiperSlide>


        {/* More SwiperSlide components for additional slides... */}
      </Swiper>
    </div>  
    );

}