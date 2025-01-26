import React, { useState, useEffect } from 'react';

const Feed = () => {
  const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
  const savedCaption = localStorage.getItem('caption') || '';
  const savedImage = localStorage.getItem('image') || null;

  const [posts, setPosts] = useState(savedPosts);
  const [caption, setCaption] = useState(savedCaption);
  const [image, setImage] = useState(savedImage);

  // Handle form submission
  const handlePost = (e) => {
    e.preventDefault();
    const newPost = { id: Date.now(), caption, image }; // Simulated post

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts)); // Save posts to localStorage

    setCaption('');
    setImage(null);
    localStorage.setItem('caption', ''); // Clear caption in localStorage
    localStorage.setItem('image', '');   // Clear image in localStorage
  };

  // Update localStorage whenever caption or image changes
  useEffect(() => {
    localStorage.setItem('caption', caption);
    localStorage.setItem('image', image);
    // If image is a File, convert it to a Base64 string and store in localStorage
    if (image && image instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('image', reader.result); // Save image as Base64
      };
      reader.readAsDataURL(image);
    } else {
      localStorage.setItem('image', image); // If no image, save the URL (if it's a URL)
    }
  }, [caption, image]);




  return (
    <div className="feed">
      <h2>Feed</h2>
      <form onSubmit={handlePost}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <input
          type="text"
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
             {post.image && post.image instanceof File && (
              <img src={URL.createObjectURL(post.image)} alt="Post" />
            )}
            {/* {post.image && <img src={post.image} alt="Post" />} */}
            <p>{post.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;



