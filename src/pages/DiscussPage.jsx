import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClient';
import Header from '../components/dashboard/Header'; // Reusing the header

function DiscussPage() {
  const { user } = useSelector(state => state.auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get('/api/discuss/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      const response = await axiosClient.post('/api/discuss/posts', {
        title: 'New Discussion Post', // Title can be made dynamic
        content: newPostContent,
        category: 'General'
      });
      setPosts([response.data, ...posts]);
      setNewPostContent('');
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
      <Header user={user} />
      <div className="container mx-auto p-4 lg:p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Discuss</h1>

        {/* New Post Form */}
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Create a New Post</h2>
          <form onSubmit={handlePostSubmit}>
            <textarea
              className="textarea textarea-bordered w-full bg-gray-700"
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              rows="4"
            ></textarea>
            <button type="submit" className="btn btn-primary mt-4">Post</button>
          </form>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="text-center">Loading posts...</div>
        ) : (
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post._id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="avatar placeholder">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                      <span>{post.author.firstname?.charAt(0).toUpperCase()}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-white">{post.author.firstname}</p>
                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DiscussPage;