// ./nextjs-app/app/_components/Slider.tsx

import React from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "../../../sanity/lib/client";
import Link from "next/link";

const builder = imageUrlBuilder(client);

// import swiper stylesheets
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import swiper components using Next.js dynamic import
import dynamic from "next/dynamic";
const Swiper = dynamic(() => import("swiper/react"), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then((m) => m.SwiperSlide), { ssr: false });

export default function Slider({ posts }: { posts: SanityDocument[] }) {
  return (
    // use Swiper component instead of SlickSlider
    <Swiper
      loop={true}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      pagination={{
        clickable: true,
      }}
    >
      {posts.map((post) => (
        // use SwiperSlide component instead of div
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
      ))}
    </Swiper>
  );
}
