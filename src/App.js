import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Posts from './components/Posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []); // The useEffect will only run once bc oc he empty dependency array
  console.log([1, 2, 3, 4, 5, 6].slice(0, 5));
  console.log(posts);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage; // 1*10 = 10, this is useful in the slicing.
  const indexOfFirstPost = indexOfLastPost - postsPerPage; //10-10 = 0
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); //(0,10) slice from 0 but not including 10.,it implies 10 posts.

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <h1 className="text-primary mb-3">My Blog Posts</h1>
      <Posts posts={currentPosts} loading={loading} />
    </div>
  );
}

export default App;
