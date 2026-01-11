import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { auth } from '../config/firebase';
import { userAPI } from '../services/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sign up with email and password
  const signup = async (email, password, displayName) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      if (displayName) {
        await firebaseUpdateProfile(userCredential.user, { displayName });
      }
      
      // Sync with backend
      await syncUserWithBackend();
      
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Sync with backend
      await syncUserWithBackend();
      
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Sync with backend
      await syncUserWithBackend();
      
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUserProfile(null);
      localStorage.removeItem('userRole');
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      setError(null);
      const response = await userAPI.updateProfile(profileData);
      if (response.success) {
        setUserProfile(response.user);
      }
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update user role
  const updateUserRole = async (role) => {
    try {
      setError(null);
      const response = await userAPI.updateRole(role);
      if (response.success) {
        setUserProfile(response.user);
        localStorage.setItem('userRole', role);
      }
      return response;
    } catch (err) {
      console.error('Error updating role:', err);
      setError(err.message);
      // Don't throw error, just log it - allow user to continue
      return { success: false, error: err.message };
    }
  };

  // Sync user with backend (MongoDB)
  const syncUserWithBackend = async () => {
    try {
      const response = await userAPI.getCurrentUser();
      if (response.success) {
        setUserProfile(response.user);
        
        // Update localStorage role
        if (response.user.role) {
          localStorage.setItem('userRole', response.user.role);
        }
      }
      return response;
    } catch (err) {
      console.error('Error syncing with backend:', err);
      throw err;
    }
  };

  // Get current user profile from backend
  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      if (response.success) {
        setUserProfile(response.profile);
      }
      return response;
    } catch (err) {
      console.error('Error fetching profile:', err);
      throw err;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // User is signed in, sync with backend
        try {
          await syncUserWithBackend();
        } catch (err) {
          console.error('Error syncing user:', err);
        }
      } else {
        // User is signed out
        setUserProfile(null);
        localStorage.removeItem('userRole');
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    updateUserRole,
    syncUserWithBackend,
    fetchUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
