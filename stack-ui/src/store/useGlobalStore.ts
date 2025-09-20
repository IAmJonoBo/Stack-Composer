import { create } from "zustand";

// Global store abstraction for Stack Composer UI
interface UserProfile {
	// Define the properties of the user profile here
	// For example:
	id: string;
	name: string;
	email: string;
}

export const useGlobalStore = create<{
	userProfile: UserProfile | null;
	// eslint-disable-next-line no-unused-vars
	setUserProfile: (userProfile: UserProfile) => void;
}>((set) => ({
	// Example state
	userProfile: null,
	setUserProfile: (userProfile) => set({ userProfile }),
	// Add more global state as needed
}));
