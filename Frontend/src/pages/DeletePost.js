import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function DeletePost() {
  const { id } = useParams();
  const [postTitle, setPostTitle] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Fetch post title for confirmation message
    fetch('http://localhost:4000/post/' + id)
      .then(response => response.json())
      .then(postInfo => {
        setPostTitle(postInfo.title);
      });
  }, [id]);

  async function deletePost() {
    debugger;
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const response = await fetch(`http://localhost:4000/post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      alert("Post deleted successfully");
      setRedirect(true);
    } else {
      alert("Failed to delete the post");
    }
  }


  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', textAlign: 'center',border: '1px solid black'  }}>
      <h2>Delete Post</h2>
      <p>Are you sure you want to delete this post?</p>
      <p><strong>{postTitle}</strong></p>
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={deletePost}
          style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setRedirect(true)}
          style={{ padding: '8px 16px', backgroundColor: 'gray',  marginTop: '10px',color: 'white', border: 'none', borderRadius: '4px' }}
        >
          No, Cancel
        </button>
      </div>
    </div>
  );
}
