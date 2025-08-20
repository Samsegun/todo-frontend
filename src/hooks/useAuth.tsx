import { auth, setToken } from "@/lib/apiServices";
import useProfileStore from "@/store/userProfileStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type SignupInput = {
    email: string;
    username: string;
    password: string;
};

type SigninInput = {
    emailUsername: string;
    password: string;
};

const checkAuthStatus = () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        throw new Error("You're not authenticated");
    }

    return token;
};

export const useAuth = () => {
    const {
        data: token,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["authUser"],
        queryFn: checkAuthStatus,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: false,
    });

    return { token, isLoading, isAuthenticated: !isError && !!token };
};

export const useSignup = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ email, username, password }: SignupInput) =>
            auth.register(email, username, password),
        onSuccess: data => {
            if (data.token) {
                setToken(data.token);
            }

            const { setUser } = useProfileStore.getState();
            if (data.user) {
                setUser({
                    _id: data.user._id,
                    email: data.user.email,
                    username: data.user.username,
                });
            }

            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/");
        },
    });
};

export const useSignin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ emailUsername, password }: SigninInput) =>
            auth.login(emailUsername, password),
        onSuccess: data => {
            if (data.token) {
                setToken(data.token);
            }

            // add user data to zustand store
            const { setUser } = useProfileStore.getState();
            if (data.user) {
                setUser({
                    _id: data.user._id,
                    email: data.user.email,
                    username: data.user.username,
                });
            }

            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/");
        },
    });
};

export const useSignout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: auth.logout,
        onSuccess: () => {
            // add user data to zustand store
            const { clearUser } = useProfileStore.getState();
            clearUser();

            queryClient.invalidateQueries({ queryKey: ["authUser"] });
            navigate("/login");
        },
    });
};
