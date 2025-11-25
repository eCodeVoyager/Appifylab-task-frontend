import requests from "./httpRequest";

const LikeService = {
  toggleLike: async (targetType, targetId) => {
    try {
      const response = await requests.post(`/likes/${targetType}/${targetId}`);

      if (response.success && response.data) {
        return {
          isLiked: response.data.isLiked,
          message: response.data.message,
        };
      }

      throw new Error(response.message || "Failed to toggle like");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to toggle like";
      throw new Error(errorMessage);
    }
  },

  getLikeUsers: async (targetType, targetId, page = 1, limit = 20) => {
    try {
      const response = await requests.get(`/likes/${targetType}/${targetId}/users`, { page, limit });

      if (response.success && response.data) {
        return {
          likes: response.data.likes || [],
          pagination: response.data.pagination || {},
        };
      }

      throw new Error(response.message || "Failed to fetch likes");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch likes";
      throw new Error(errorMessage);
    }
  },

  getLikeCount: async (targetType, targetId) => {
    try {
      const response = await requests.get(`/likes/${targetType}/${targetId}/count`);

      if (response.success && response.data) {
        return response.data.count || 0;
      }

      throw new Error(response.message || "Failed to fetch like count");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch like count";
      throw new Error(errorMessage);
    }
  },

  checkIfLiked: async (targetType, targetId) => {
    try {
      const response = await requests.get(`/likes/${targetType}/${targetId}/check`);

      if (response.success && response.data) {
        return response.data.isLiked || false;
      }

      throw new Error(response.message || "Failed to check like status");
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to check like status";
      throw new Error(errorMessage);
    }
  },
};

export default LikeService;
