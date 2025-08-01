import axios from 'axios';
import { NextResponse } from 'next/server';

const apiURL = 'https://bloopinsight.com/wp-json/wp/v2/posts';

export async function getPosts() {
  try {
    const response = await axios.get(`${apiURL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function GET() {
  return NextResponse.json(await getPosts());
}
