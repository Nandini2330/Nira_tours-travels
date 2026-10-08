import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS } from '../data/destinationsData';
import { PACKAGES } from '../data/packagesData';
import { EXPERIENCES } from '../data/experiencesData';
import { authAPI, tripRequestsAPI, notificationsAPI, heroAPI } from '../services/api';

const TravelContext = createContext();

export const TravelProvider = ({ children }) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Customer Data
  const [customerRequests, setCustomerRequests] = useState([]);
  const [customerNotifications, setCustomerNotifications] = useState([]);

  // Dynamic Hero Slides
  const [heroSlides, setHeroSlides] = useState([]);

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('om_journeys_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Saved Custom Itineraries
  const [savedItineraries, setSavedItineraries] = useState(() => {
    try {
      const saved = localStorage.getItem('om_journeys_itineraries');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Toast System
  const [toast, setToast] = useState(null);

  // Initialize Session & Hero Slides on Mount
  useEffect(() => {
    const initApp = async () => {
      try {
        const user = await authAPI.getCurrentUser();
        setCurrentUser(user);
        if (user) {
          await refreshCustomerData(user.id);
        }
        const slides = await heroAPI.getSlides();
        setHeroSlides(slides);
      } catch (e) {
        console.error('Initialization error:', e);
      } finally {
        setAuthLoading(false);
      }
    };
    initApp();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('om_journeys_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const refreshCustomerData = async (userId) => {
    if (!userId) return;
    try {
      const reqs = await tripRequestsAPI.getByUser(userId);
      setCustomerRequests(reqs);
      const notifs = await notificationsAPI.getByUser(userId);
      setCustomerNotifications(notifs);
    } catch (e) {
      console.error('Error refreshing customer data:', e);
    }
  };

  // Auth Action Handlers
  const login = async (email, password) => {
    const user = await authAPI.login(email, password);
    setCurrentUser(user);
    await refreshCustomerData(user.id);
    showToast(`Welcome back, ${user.name}!`, 'success');
    return user;
  };

  const signup = async (data) => {
    const user = await authAPI.signup(data);
    setCurrentUser(user);
    await refreshCustomerData(user.id);
    showToast(`Account created! Welcome, ${user.name}.`, 'success');
    return user;
  };

  const logout = async () => {
    await authAPI.logout();
    setCurrentUser(null);
    setCustomerRequests([]);
    setCustomerNotifications([]);
    showToast('You have been logged out.', 'info');
  };

  const forgotPassword = async (email) => {
    const res = await authAPI.forgotPassword(email);
    showToast('Password recovery instructions sent to your email!', 'info');
    return res;
  };

  const resetPassword = async (token, newPassword) => {
    const res = await authAPI.resetPassword(token, newPassword);
    showToast('Your password has been reset successfully. Please log in.', 'success');
    return res;
  };

  const updateProfile = async (profileData) => {
    if (!currentUser) return;
    const updated = await authAPI.updateProfile(currentUser.id, profileData);
    setCurrentUser(updated);
    showToast('Profile updated successfully!', 'success');
    return updated;
  };

  const createTripRequest = async (requestData) => {
    if (!currentUser) {
      throw new Error('Authentication required to submit trip requests.');
    }
    const newReq = await tripRequestsAPI.create(requestData, currentUser);
    await refreshCustomerData(currentUser.id);
    showToast(`Trip Request ${newReq.requestNumber} submitted successfully! ✨`, 'success');
    return newReq;
  };

  const markNotificationRead = async (notifId) => {
    await notificationsAPI.markAsRead(notifId);
    if (currentUser) {
      await refreshCustomerData(currentUser.id);
    }
  };

  const updateHeroSlides = async (slides) => {
    const updated = await heroAPI.saveSlides(slides);
    setHeroSlides(updated);
    showToast('Hero slides updated successfully!', 'success');
    return updated;
  };

  const toggleWishlist = (item) => {
    const exists = wishlist.some(w => w.id === item.id);
    if (exists) {
      setWishlist(wishlist.filter(w => w.id !== item.id));
      showToast(`Removed "${item.name || item.title}" from Wishlist`, 'info');
    } else {
      setWishlist([...wishlist, { ...item, savedAt: new Date().toISOString() }]);
      showToast(`Added "${item.name || item.title}" to Wishlist ❤️`, 'success');
    }
  };

  const isInWishlist = (id) => {
    return wishlist.some(w => w.id === id);
  };

  const saveItinerary = (itinerary) => {
    const newItinerary = {
      ...itinerary,
      id: 'itinerary-' + Date.now(),
      createdAt: new Date().toISOString()
    };
    setSavedItineraries([newItinerary, ...savedItineraries]);
    showToast('Your custom itinerary has been generated & saved!', 'success');
    return newItinerary;
  };

  return (
    <TravelContext.Provider
      value={{
        currentUser,
        authLoading,
        login,
        signup,
        logout,
        forgotPassword,
        resetPassword,
        updateProfile,
        createTripRequest,
        customerRequests,
        customerNotifications,
        refreshCustomerData,
        markNotificationRead,
        heroSlides,
        updateHeroSlides,
        wishlist,
        toggleWishlist,
        isInWishlist,
        savedItineraries,
        saveItinerary,
        toast,
        showToast,
        destinations: DESTINATIONS,
        packages: PACKAGES,
        experiences: EXPERIENCES
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] transition-all transform animate-bounce">
          <div className={`px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 text-sm font-semibold border ${
            toast.type === 'success'
              ? 'bg-[#174A3A] text-[#E7A92B] border-[#E7A92B]/40'
              : 'bg-slate-900 text-sky-300 border-sky-500/30'
          }`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </TravelContext.Provider>
  );
};

export const useTravel = () => useContext(TravelContext);
