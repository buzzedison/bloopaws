import axios from 'axios';
import { NextResponse } from 'next/server';

const apiURL = 'https://bloopinsight.com/wp-json/wp/v2/posts';

export async function GET() {
  try {
    const response = await axios.get(`${apiURL}/posts`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json([]);
  }
}
