import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isError, isLoading, error } = useQuery(
    [`comments`, post.id],
    () => fetchComments(post.id)
  );
  // you can also use unique keys for queries

  const handleDelete = useMutation(postId => {
    deletePost(postId);
  });

  const handleUpdate = useMutation(postId => {
    updatePost(postId);
  });

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Network error</h3>;
  if (!data || error) return <h3>Something went really wrong</h3>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => handleDelete.mutate(post.id)}>Delete</button>
      {handleDelete.isLoading && <p>deleting post...</p>}
      {handleDelete.isSuccess && <p>Post 'deleted'!</p>}
      {handleDelete.isError && <p>ERROR deleting post</p>}
      <button onClick={() => handleUpdate.mutate(post.id)}>Update title</button>
      {handleUpdate.isLoading && <p>updating post...</p>}
      {handleUpdate.isSuccess && <p>Post 'updated'!</p>}
      {handleUpdate.isError && <p>ERROR updating post</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map(comment => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
