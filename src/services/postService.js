import requests from "./httpRequest";

const PostService = {
  createPost: async (formData) => {
    try {
      const response = await requests.post("/posts", formData, {
        "Content-Type": "multipart/form-data",
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to create post");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to create post";
      throw new Error(errorMessage);
    }
  },

  getFeed: async (page = 1, limit = 10) => {
    try {
      const response = await requests.get("/posts/feed", { page, limit });

      if (response.success && response.data) {
        return {
          posts: response.data.posts || [],
          pagination: response.data.pagination || {},
        };
      }

      throw new Error(response.message || "Failed to fetch feed");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch feed";
      throw new Error(errorMessage);
    }
  },

  getMyPosts: async (page = 1, limit = 10) => {
    try {
      const response = await requests.get("/posts/my-posts", { page, limit });

      if (response.success && response.data) {
        return {
          posts: response.data.posts || [],
          pagination: response.data.pagination || {},
        };
      }

      throw new Error(response.message || "Failed to fetch posts");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch posts";
      throw new Error(errorMessage);
    }
  },

  getPostById: async (id) => {
    try {
      const response = await requests.get(`/posts/${id}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to fetch post");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch post";
      throw new Error(errorMessage);
    }
  },

  updatePost: async (id, formData) => {
    try {
      const response = await requests.patch(`/posts/${id}`, formData, {
        "Content-Type": "multipart/form-data",
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to update post");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to update post";
      throw new Error(errorMessage);
    }
  },

  deletePost: async (id) => {
    try {
      const response = await requests.delete(`/posts/${id}`);

      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || "Failed to delete post");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete post";
      throw new Error(errorMessage);
    }
  },
};

export default PostService;
