import type { User } from "@/lib/apiServices";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfileState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

// type UserProfilePersist = PersistOptions<UserProfileState>

const useProfileStore = create<UserProfileState>()(
    persist(
        set => ({
            user: null,
            setUser: (user: User) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: "todo-user-profile",
        }
    )
);

export default useProfileStore;
