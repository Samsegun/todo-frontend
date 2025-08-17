import { useQuery } from "@tanstack/react-query";

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
