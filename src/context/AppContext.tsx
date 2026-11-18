import React, { createContext, useContext, useState, useEffect } from 'react';
import { SavedItem, Trip, Activity, SearchCriteria } from '../types';
import { sampleActivities } from '../data/otherData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface AppContextType {
  savedItems: SavedItem[];
  isSaved: (id: string) => boolean;
  toggleSave: (id: string, type: 'destination' | 'stay', name?: string) => void;
  removeSaved: (id: string) => void;
  trips: Trip[];
  activeTrip: Trip | null;
  setActiveTripId: (id: string) => void;
  createTrip: (tripData: Omit<Trip, 'id' | 'updatedAt' | 'activities'>) => Trip;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  addActivityToTrip: (tripId: string, activity: Omit<Activity, 'id'>) => void;
  updateActivity: (tripId: string, activityId: string, updates: Partial<Activity>) => void;
  deleteActivity: (tripId: string, activityId: string) => void;
  moveActivityDay: (tripId: string, activityId: string, newDay: number) => void;
  searchCriteria: SearchCriteria;
  setSearchCriteria: (criteria: SearchCriteria) => void;
  resetDemoData: () => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const STORAGE_KEY_SAVED = 'tripmate:saved:v1';
const STORAGE_KEY_TRIPS = 'tripmate:trips:v1';

const defaultTrip: Trip = {
  id: "trip-bali-default",
  title: "Bali Tropical Escape",
  destinationId: "dest-bali",
  destinationName: "Bali, Indonesia",
  startDate: "2026-10-15",
  endDate: "2026-10-19",
  guests: 2,
  notes: "Remember to book airport pickup with the villa and pack light linen clothing for humid weather.",
  activities: sampleActivities,
  updatedAt: new Date().toISOString()
};

const initialSaved: SavedItem[] = [
  { id: "dest-bali", type: "destination", savedAt: new Date().toISOString() },
  { id: "stay-bali-1", type: "stay", savedAt: new Date().toISOString() },
  { id: "stay-kyoto-1", type: "stay", savedAt: new Date().toISOString() }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Saved items state
  const [savedItems, setSavedItems] = useState<SavedItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SAVED);
      return stored ? JSON.parse(stored) : initialSaved;
    } catch {
      return initialSaved;
    }
  });

  // Trips state
  const [trips, setTrips] = useState<Trip[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_TRIPS);
      return stored ? JSON.parse(stored) : [defaultTrip];
    } catch {
      return [defaultTrip];
    }
  });

  const [activeTripId, setActiveTripId] = useState<string>(() => {
    return trips.length > 0 ? trips[0].id : defaultTrip.id;
  });

  // Global search criteria
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({});

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Persist savedItems
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedItems));
    } catch (e) {
      console.error("Failed to save items to localStorage", e);
    }
  }, [savedItems]);

  // Persist trips
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRIPS, JSON.stringify(trips));
    } catch (e) {
      console.error("Failed to save trips to localStorage", e);
    }
  }, [trips]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isSaved = (id: string) => {
    return savedItems.some((item) => item.id === id);
  };

  const toggleSave = (id: string, type: 'destination' | 'stay', name?: string) => {
    if (isSaved(id)) {
      setSavedItems((prev) => prev.filter((item) => item.id !== id));
      showToast(name ? `Removed "${name}" from saved list` : "Removed from saved items", 'info');
    } else {
      setSavedItems((prev) => [...prev, { id, type, savedAt: new Date().toISOString() }]);
      showToast(name ? `Saved "${name}" to your wishlist!` : "Saved to your wishlist!", 'success');
    }
  };

  const removeSaved = (id: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast("Item removed from saved wishlist", 'info');
  };

  const activeTrip = trips.find((t) => t.id === activeTripId) || trips[0] || null;

  const createTrip = (tripData: Omit<Trip, 'id' | 'updatedAt' | 'activities'>): Trip => {
    const newTrip: Trip = {
      ...tripData,
      id: `trip-${Date.now()}`,
      activities: [],
      updatedAt: new Date().toISOString()
    };
    setTrips((prev) => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    showToast(`Created trip "${newTrip.title}"!`, 'success');
    return newTrip;
  };

  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      )
    );
    showToast("Trip details updated", 'success');
  };

  const deleteTrip = (id: string) => {
    const target = trips.find((t) => t.id === id);
    setTrips((prev) => prev.filter((t) => t.id !== id));
    showToast(target ? `Deleted trip "${target.title}"` : "Trip deleted", 'info');
  };

  const addActivityToTrip = (tripId: string, activityData: Omit<Activity, 'id'>) => {
    const newAct: Activity = {
      ...activityData,
      id: `act-${Date.now()}`
    };
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? { ...t, activities: [...t.activities, newAct], updatedAt: new Date().toISOString() }
          : t
      )
    );
    showToast(`Added "${newAct.title}" to itinerary!`, 'success');
  };

  const updateActivity = (tripId: string, activityId: string, updates: Partial<Activity>) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        return {
          ...t,
          activities: t.activities.map((a) => (a.id === activityId ? { ...a, ...updates } : a)),
          updatedAt: new Date().toISOString()
        };
      })
    );
    showToast("Activity updated", 'success');
  };

  const deleteActivity = (tripId: string, activityId: string) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        return {
          ...t,
          activities: t.activities.filter((a) => a.id !== activityId),
          updatedAt: new Date().toISOString()
        };
      })
    );
    showToast("Activity removed from itinerary", 'info');
  };

  const moveActivityDay = (tripId: string, activityId: string, newDay: number) => {
    setTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        return {
          ...t,
          activities: t.activities.map((a) => (a.id === activityId ? { ...a, dayNumber: newDay } : a)),
          updatedAt: new Date().toISOString()
        };
      })
    );
    showToast(`Moved activity to Day ${newDay}`, 'success');
  };

  const resetDemoData = () => {
    setSavedItems(initialSaved);
    setTrips([defaultTrip]);
    setActiveTripId(defaultTrip.id);
    localStorage.removeItem(STORAGE_KEY_SAVED);
    localStorage.removeItem(STORAGE_KEY_TRIPS);
    showToast("Demo data successfully reset!", 'info');
  };

  return (
    <AppContext.Provider
      value={{
        savedItems,
        isSaved,
        toggleSave,
        removeSaved,
        trips,
        activeTrip,
        setActiveTripId,
        createTrip,
        updateTrip,
        deleteTrip,
        addActivityToTrip,
        updateActivity,
        deleteActivity,
        moveActivityDay,
        searchCriteria,
        setSearchCriteria,
        resetDemoData,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

