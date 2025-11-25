import { createContext, useState, useContext, useCallback } from "react";
import PostService from "../services/postService";

const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchFeed = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const { posts: fetchedPosts, pagination: paginationData } = await PostService.getFeed(page, limit);
      setPosts(fetchedPosts);
      setPagination(paginationData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMyPosts = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const { posts: fetchedPosts, pagination: paginationData } = await PostService.getMyPosts(page, limit);
      setPosts(fetchedPosts);
      setPagination(paginationData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPost = useCallback(async (formData) => {
    try {
      const newPost = await PostService.createPost(formData);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      return newPost;
    } catch (error) {
      throw error;
    }
  }, []);

  const updatePost = useCallback(async (id, formData) => {
    try {
      const updatedPost = await PostService.updatePost(id, formData);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === id ? updatedPost : post))
      );
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }, []);

  const deletePost = useCallback(async (id) => {
    try {
      await PostService.deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      throw error;
    }
  }, []);

  const clearPosts = useCallback(() => {
    setPosts([]);
    setPagination({
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    });
  }, []);

  const toggleLikeOnPost = useCallback((postId, isLiked) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            isLiked: isLiked,
            likeCount: isLiked ? (post.likeCount || 0) + 1 : Math.max((post.likeCount || 0) - 1, 0),
          };
        }
        return post;
      })
    );
  }, []);

  const addCommentToPost = useCallback((postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            commentCount: (post.commentCount || 0) + 1,
          };
        }
        return post;
      })
    );
  }, []);

  const value = {
    posts,
    loading,
    pagination,
    fetchFeed,
    fetchMyPosts,
    createPost,
    updatePost,
    deletePost,
    clearPosts,
    toggleLikeOnPost,
    addCommentToPost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePost = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within PostProvider");
  }
  return context;
};
