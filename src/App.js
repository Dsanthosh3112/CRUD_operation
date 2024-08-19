/*import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "./api";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      updatePost(editId, { title, body })
        .then(response => {
          setPosts(posts.map(post => post.id === editId ? response.data : post));
          setEditId(null);
          setTitle("");
          setBody("");
        })
        .catch(error => console.error("Error updating post:", error));
    } else {
      createPost({ title, body })
        .then(response => {
          setPosts([response.data, ...posts]);
          setTitle("");
          setBody("");
        })
        .catch(error => console.error("Error creating post:", error));
    }
  };

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => console.error("Error deleting post:", error));
  };

  const handleEdit = (post) => {
    setEditId(post.id);
    setTitle(post.title);
    setBody(post.body);
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          required
        />
        <button type="submit">
          {editId ? "Update Post" : "Add Post"}
        </button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
*/
import React, { useState, useEffect } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "./api";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then(response => setPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {

      const existingPost = posts.find(post => post.id === parseInt(id));
      if (existingPost) {
        updatePost(existingPost.id, { title, body })
          .then(response => {
            setPosts(posts.map(post =>
              post.id === parseInt(id) ? { ...post, title: response.data.title, body: response.data.body } : post
            ));
            resetForm();
          })
          .catch(error => console.error("Error updating post:", error));
      }
    } else {
      const newPost = { id: parseInt(id), title, body };

      createPost(newPost)
        .then(() => {
          setPosts([newPost, ...posts]);
          resetForm();
        })
        .catch(error => console.error("Error creating post:", error));
    }
  };

  const handleDelete = (id) => {
    deletePost(id)
      .then(() => {
        setPosts(posts.filter(post => post.id !== id));
      })
      .catch(error => console.error("Error deleting post:", error));
  };

  const handleEdit = (post) => {
    setId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setIsEditing(true);
  };

  const resetForm = () => {
    setId("");
    setTitle("");
    setBody("");
    setIsEditing(false);
  };

  return (
    <div className="App">
      <h1>CRUD Application</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
          required
          disabled={isEditing} // ID is only editable when adding a new post
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          required
        />
        <button type="submit">
          {isEditing ? "Update Post" : "Add Post"}
        </button>
        {isEditing && <button classname = "cancel" onClick={resetForm}>Cancel</button>}
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.id} - {post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



