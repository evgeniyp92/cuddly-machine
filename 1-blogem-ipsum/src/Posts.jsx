import { useState } from 'react';
import { useQuery } from 'react-query';

import { PostDetail } from './PostDetail';
const maxPostPage = 10;

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isError, isLoading } = useQuery(
    ['posts', currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 5 * 60 * 1000, // after staleTime lapses data will be refetched if the window regains focus
      // cacheTime is a period of time after which cache data is garbage
      // collected. you can use cached data to display while most relevant
      // data is fetching
    }
  );

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Network error</h3>; // 3 attemps by default before it goes isError
  if (!data) return <h3>Something went really wrong</h3>;

  return (
    <>
      <ul>
        {data.map(post => (
          <li
            key={post.id}
            className='post-title'
            onClick={() => setSelectedPost(post)}>
            {post.title}
          </li>
        ))}
      </ul>
      <div className='pages'>
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= 10}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
