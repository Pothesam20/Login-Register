import { useState, useEffect } from 'react';
import { userProfileAPI } from '../services/api';

/**
 * Custom hook for managing user profile data
 * @param {number} userId - The user ID to fetch data for
 */
export const useUserProfile = (userId) => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user dashboard data
  const fetchDashboard = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const dashboardData = await userProfileAPI.getDashboard(userId);
      setProfile(dashboardData.profile);
      setStats(dashboardData.stats);
    } catch (err) {
      setError(err.message || 'Failed to load user data');
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user posts
  const fetchPosts = async () => {
    if (!userId) return;

    try {
      const postsData = await userProfileAPI.getPosts(userId);
      setPosts(postsData);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedProfile = await userProfileAPI.updateProfile(userId, profileData);
      setProfile(updatedProfile);
      return { success: true, data: updatedProfile };
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Create a new post
  const createPost = async (postData) => {
    try {
      const newPost = await userProfileAPI.createPost(userId, postData);
      setPosts([newPost, ...posts]);
      
      // Update post count in stats
      if (stats) {
        setStats({ ...stats, posts: stats.posts + 1 });
      }
      
      return { success: true, data: newPost };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDashboard();
    fetchPosts();
  }, [userId]);

  return {
    profile,
    stats,
    posts,
    loading,
    error,
    updateProfile,
    createPost,
    refreshDashboard: fetchDashboard,
    refreshPosts: fetchPosts,
  };
};

export default useUserProfile;
