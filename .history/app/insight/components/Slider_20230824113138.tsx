// ./nextjs-app/app/_components/Slider.tsx

import React from "react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import { client } from "../../../sanity/lib/client";
import SlickSlider from "react-slick";
import Link from "next/link";

const builder = imageUrlBuilder(client);

export default function Slider({ posts }: { posts: SanityDocument[] }) {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <SlickSlider {...settings}>
      {posts.map((post) => (
        <div key={post._id} className="m-4 p-4">
          <h1 className="mt-12">{post.title}</h1>
          <div className="relative w-full h-64">
            <div className="absolute z-[-1] inset-0">
              {post.mainImage ? (
                <Image
                  src={builder.image(post.mainImage).width(1000).height(600).url()}
                  layout="fill"
                  objectFit="cover"
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
        </div>
      ))}
    </SlickSlider>
  );
}
