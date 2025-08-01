import axios from 'axios';

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