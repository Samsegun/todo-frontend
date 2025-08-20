import axios, { type AxiosInstance, type AxiosResponse } from "axios";

export interface User {
    _id: string;
    username: string;
    email: string;
}

export interface CreateUserRequest {
    message: string;
    user: User & { createdAt: Date };
    token: string;
}

export interface LoginUserRequest {
    message: string;
    user: User;
    token: string;
}

export interface Todo {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    creator: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateTodoRequest {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
    creator: string;
}

// export interface UpdateTodoRequest {
//     updatedTodo: {

//     }
// }
export interface DeleteTodoRequest {
    message: string;
    deletedResult: {
        acknowledged: boolean;
        deletedCount: number;
    };
}

const API_BASE_URL =
    import.meta.env.VITE_TODO_API_URL || "http://localhost:3001";

class ApiService {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor - add auth token
        this.axiosInstance.interceptors.request.use(
            config => {
                const token = localStorage.getItem("authToken");

                if (token && this.isTokenExpired(token)) {
                    this.clearToken();
                    window.location.href = "/login";
                    return Promise.reject(new Error("Session timeout"));
                }

                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        // response interceptor - handle errors
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => response,
            error => {
                if (error.response?.data?.message === "jwt expired") {
                    // token expired
                    this.clearToken();
                    window.location.href = "/login";
                    return Promise.reject(new Error("Session timeout"));
                }

                const errorMessage =
                    error.response?.data?.message || error.message;
                return Promise.reject(new Error(errorMessage));
            }
        );
    }

    // token management
    setToken(token: string) {
        localStorage.setItem("authToken", token);
    }

    clearToken() {
        localStorage.removeItem("authToken");
    }

    isTokenExpired(token: string) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            /**  for proper comparison, we divide by 1000 because payload will be in
             *  seconds while Date.now is always in milliseconds. Dividing by 1000
             * converts milliseconds to seconds */
            const currentTime = Date.now() / 1000;
            return payload.exp < currentTime;
        } catch (error) {
            return true;
        }
    }

    // auth requests
    auth = {
        register: async (
            email: string,
            username: string,
            password: string
        ): Promise<CreateUserRequest> => {
            const response = await this.axiosInstance.post<CreateUserRequest>(
                "/auth/signup",
                {
                    email,
                    username,
                    password,
                }
            );

            return response.data;
        },
        login: async (
            emailUsername: string,
            password: string
        ): Promise<LoginUserRequest> => {
            const response = await this.axiosInstance.post<LoginUserRequest>(
                "/auth/login",
                {
                    emailUsername,
                    password,
                }
            );

            return response.data;
        },
        logout: async () => {
            // await this.axiosInstance.post("/auth/logout");
            this.clearToken();
        },
    };

    // todo requests
    todos = {
        getAll: async (): Promise<{ message: string; todos: Todo[] }> => {
            const response = await this.axiosInstance.get<{
                message: string;
                todos: Todo[];
            }>("/todos");
            return response.data;
        },

        getById: async (id: number): Promise<Todo> => {
            const response = await this.axiosInstance.get(`/todos/${id}`);
            return response.data;
        },

        create: async (
            todo: CreateTodoRequest
        ): Promise<{ message: string; todo: CreateTodoRequest }> => {
            const response = await this.axiosInstance.post("/todos", todo);
            return response.data;
        },

        update: async (
            id: number,
            updates: Todo
        ): Promise<{ message: string; updatedTodo: Todo }> => {
            const response = await this.axiosInstance.put(
                `/todos/${id}`,
                updates
            );
            return response.data;
        },

        delete: async (id: number): Promise<DeleteTodoRequest> => {
            const response = await this.axiosInstance.delete(`/todos/${id}`);

            return response.data;
        },
    };

    // user requests
    // user = {};
}

const apiService = new ApiService(API_BASE_URL);

export const { auth, todos, setToken, clearToken } = apiService;
