import axios, { type AxiosInstance, type AxiosResponse } from "axios";

export interface User {
    _id: string;
    username: string;
    email: string;
}

export interface Todo {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    creator: string;
}

export interface CreateTodoRequest {
    title: string;
    description: string;
    completed: boolean;
    creator: string;
}
export interface UpdateTodoRequest {
    message: string;
    todo: Todo;
    user: Omit<User, "username">;
}

const API_BASE_URL =
    process.env.TODO_APP_API_URL || "http://localhost:3001/api";

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
                if (error.response?.status === 401) {
                    // token expired or invalid
                    this.clearToken();
                    // optionally redirect to login
                    window.location.href = "/login";
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

    // auth requests
    auth = {
        register: async (
            email: string,
            username: string,
            password: string
        ): Promise<{ user: User; token: string }> => {
            const response = await this.axiosInstance.post("/auth/register", {
                email,
                username,
                password,
            });
            return response.data;
        },
        login: async (
            emailUsername: string,
            password: string
        ): Promise<{ user: User; token: string }> => {
            const response = await this.axiosInstance.post("/auth/login", {
                emailUsername,
                password,
            });
            return response.data;
        },
        logout: async () => {
            await this.axiosInstance.post("/auth/logout");
            this.clearToken();
        },
    };

    // todo requests
    todos = {
        getAll: async (): Promise<Todo[]> => {
            const response = await this.axiosInstance.get("/todos");
            return response.data;
        },

        getById: async (id: number): Promise<Todo> => {
            const response = await this.axiosInstance.get(`/todos/${id}`);
            return response.data;
        },

        create: async (todo: CreateTodoRequest): Promise<Todo> => {
            const response = await this.axiosInstance.post("/todos", todo);
            return response.data;
        },

        update: async (
            id: number,
            updates: UpdateTodoRequest
        ): Promise<Todo> => {
            const response = await this.axiosInstance.put(
                `/todos/${id}`,
                updates
            );
            return response.data;
        },

        delete: async (id: number): Promise<void> => {
            await this.axiosInstance.delete(`/todos/${id}`);
        },
    };

    // user requests
    user = {};
}

const apiService = new ApiService(API_BASE_URL);

const { auth, todos, user } = apiService;
