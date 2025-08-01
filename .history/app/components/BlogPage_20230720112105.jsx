import React from 'react'
import Link from "next/link"
import Image from "next/image"
import BlogData from "../blog/blogserver"

export default async function BlogGrid () {
  
  
    return (
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-center">Latest Blog Posts</h1>
            <BlogData />
        </div>
        </div>
    );
};
