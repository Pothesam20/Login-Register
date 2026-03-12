/**
 * API Service Layer
 * Handles all HTTP requests to the Spring Boot backend
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

/**
 * Generic API request handler with error handling
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle different response types
    if (response.status === 204) {
      return { success: true };
    }

    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'An error occurred',
        data: data,
      };
    }

    return data;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    throw {
      status: 0,
      message: 'Network error. Please check if the backend is running.',
      data: null,
    };
  }
};

/**
 * User Profile API
 */
export const userProfileAPI = {
  // Get user profile
  getProfile: (userId) => {
    return apiRequest(`/users/${userId}/profile`);
  },

  // Get user statistics
  getStats: (userId) => {
    return apiRequest(`/users/${userId}/stats`);
  },

  // Get complete dashboard (profile + stats)
  getDashboard: (userId) => {
    return apiRequest(`/users/${userId}/dashboard`);
  },

  // Update user profile
  updateProfile: (userId, profileData) => {
    return apiRequest(`/users/${userId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // Create a new post
  createPost: (userId, postData) => {
    return apiRequest(`/users/${userId}/posts`, {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  // Get user posts
  getPosts: (userId) => {
    return apiRequest(`/users/${userId}/posts`);
  },
};

/**
 * Questions & Answers API
 */
export const questionsAPI = {
  // Create a new question
  createQuestion: (userId, questionData) => {
    return apiRequest(`/questions?userId=${userId}`, {
      method: 'POST',
      body: JSON.stringify(questionData),
    });
  },

  // Get all questions
  getAllQuestions: () => {
    return apiRequest('/questions');
  },

  // Get question by ID
  getQuestion: (questionId) => {
    return apiRequest(`/questions/${questionId}`);
  },

  // Get questions by user
  getUserQuestions: (userId) => {
    return apiRequest(`/questions/user/${userId}`);
  },

  // Search questions
  searchQuestions: (keyword) => {
    return apiRequest(`/questions/search?keyword=${encodeURIComponent(keyword)}`);
  },

  // Create an answer
  createAnswer: (questionId, userId, answerData) => {
    return apiRequest(`/questions/${questionId}/answers?userId=${userId}`, {
      method: 'POST',
      body: JSON.stringify(answerData),
    });
  },

  // Get answers for a question
  getQuestionAnswers: (questionId) => {
    return apiRequest(`/questions/${questionId}/answers`);
  },

  // Get answers by user
  getUserAnswers: (userId) => {
    return apiRequest(`/questions/answers/user/${userId}`);
  },

  // Accept an answer
  acceptAnswer: (questionId, answerId, userId) => {
    return apiRequest(`/questions/${questionId}/answers/${answerId}/accept?userId=${userId}`, {
      method: 'PUT',
    });
  },

  // Vote on a question (voteType: 1 for upvote, -1 for downvote)
  voteQuestion: (questionId, userId, voteType) => {
    return apiRequest(`/questions/${questionId}/vote?userId=${userId}&voteType=${voteType}`, {
      method: 'POST',
    });
  },

  // Vote on an answer (voteType: 1 for upvote, -1 for downvote)
  voteAnswer: (answerId, userId, voteType) => {
    return apiRequest(`/questions/answers/${answerId}/vote?userId=${userId}&voteType=${voteType}`, {
      method: 'POST',
    });
  },
};

/**
 * Helper function to check if backend is reachable
 */
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/1/profile`);
    return response.status !== 0;
  } catch (error) {
    return false;
  }
};

export default {
  userProfileAPI,
  questionsAPI,
  checkBackendHealth,
};
