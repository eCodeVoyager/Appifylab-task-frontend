import requests from "./httpRequest";

const CommentService = {
  createComment: async (postId, content) => {
    try {
      const response = await requests.post(`/comments/post/${postId}`, { content });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to create comment");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to create comment";
      throw new Error(errorMessage);
    }
  },

  getComments: async (postId, page = 1, limit = 20) => {
    try {
      const response = await requests.get(`/comments/post/${postId}`, { page, limit });

      if (response.success && response.data) {
        return {
          comments: response.data.comments || [],
          pagination: response.data.pagination || {},
        };
      }

      throw new Error(response.message || "Failed to fetch comments");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch comments";
      throw new Error(errorMessage);
    }
  },

  createReply: async (commentId, content) => {
    try {
      const response = await requests.post(`/comments/${commentId}/reply`, { content });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to create reply");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to create reply";
      throw new Error(errorMessage);
    }
  },

  getReplies: async (commentId, page = 1, limit = 20) => {
    try {
      const response = await requests.get(`/comments/${commentId}/replies`, { page, limit });

      if (response.success && response.data) {
        return {
          replies: response.data.replies || [],
          pagination: response.data.pagination || {},
        };
      }

      throw new Error(response.message || "Failed to fetch replies");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch replies";
      throw new Error(errorMessage);
    }
  },

  updateComment: async (id, content) => {
    try {
      const response = await requests.patch(`/comments/${id}`, { content });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.message || "Failed to update comment");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to update comment";
      throw new Error(errorMessage);
    }
  },

  deleteComment: async (id) => {
    try {
      const response = await requests.delete(`/comments/${id}`);

      if (response.success) {
        return response.data;
      }

      throw new Error(response.message || "Failed to delete comment");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete comment";
      throw new Error(errorMessage);
    }
  },
};

export default CommentService;
