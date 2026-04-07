import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "../config/app.config";
import { AUTH_EVENTS, authEvents } from "../events/auth-event";
import { tokenStorage } from "../storage/token-storage";

/**
 * HTTP Client Interface
 * Abstraction over Axios to allow easy testing and replacement
 */
export interface IHttpClient {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T>;
    put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T>;
    patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    setAuthToken(token: string): void;
    removeAuthToken(): void;
}

/**
 * Axios HTTP Client Implementation
 * Centralized HTTP client with interceptors and error handling
 */
export class AxiosHttpClient implements IHttpClient {
    private axiosInstance: AxiosInstance;
    private isRefreshing = false;
    private failedQueue: {
        resolve: (value?: any) => void;
        reject: (reason?: any) => void;
    }[] = [];

    constructor(baseURL?: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL || config.api.baseUrl,
            timeout: config.api.timeout,
            headers: {
                "Content-Type": "application/json",
            },
        });

        this.setupInterceptors();
    }

    private processQueue(error: any, token: string | null = null): void {
        this.failedQueue.forEach((prom) => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        this.failedQueue = [];
    }

    /**
     * Setup request and response interceptors
     */
    private setupInterceptors(): void {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            async (config) => {
                // Add auth token from storage
                const token = await tokenStorage.getAccessToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                console.log(
                    `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
                );
                return config;
            },
            (error) => {
                console.error("❌ Request Error:", error);
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                console.log(
                    `✅ API Response: ${response.config.url} - ${response.status}`
                );
                return response;
            },
            async (error) => {
                const originalRequest = error.config;

                // Handle different error scenarios
                if (error.response) {
                    // Server responded with error status
                    const status = error.response.status;
                    const message = error.response.data?.message || error.message;
                    const requestUrl = originalRequest?.url || "";

                    // Check if this is a refresh request by URL (more reliable than custom config)
                    const isRefreshRequest = requestUrl.includes("/auth/refresh");

                    // Log all errors except 404
                    if (status !== 404) {
                        console.log(
                            `❌ API Error ${status}: ${message} | URL: ${requestUrl} | isRefresh: ${isRefreshRequest}`
                        );
                    }

                    // Handle 401 on refresh request - session has expired
                    if (status === 401 && isRefreshRequest) {
                        console.log("🔒🔒🔒 REFRESH TOKEN EXPIRED - LOGGING OUT NOW!");
                        await tokenStorage.clearTokens();
                        console.log("🔒 Tokens cleared, emitting SESSION_EXPIRED...");
                        authEvents.emit(AUTH_EVENTS.SESSION_EXPIRED);
                        console.log("🔒 SESSION_EXPIRED emitted!");
                        return Promise.reject({
                            status,
                            message: "Session expired",
                            data: error.response.data,
                        });
                    }

                    // Handle 401 on normal request - try to refresh token
                    if (status === 401 && !originalRequest?._retry && !isRefreshRequest) {
                        console.log(
                            "🔄 Got 401 on normal request, attempting token refresh..."
                        );

                        if (this.isRefreshing) {
                            // Wait for refresh to complete
                            console.log("🔄 Refresh already in progress, queuing request...");
                            return new Promise((resolve, reject) => {
                                this.failedQueue.push({ resolve, reject });
                            })
                                .then((token) => {
                                    originalRequest.headers.Authorization = `Bearer ${token}`;
                                    return this.axiosInstance(originalRequest);
                                })
                                .catch((err) => {
                                    return Promise.reject(err);
                                });
                        }

                        originalRequest._retry = true;
                        this.isRefreshing = true;

                        try {
                            const refreshToken = await tokenStorage.getRefreshToken();
                            console.log("🔄 Refresh token found:", !!refreshToken);

                            if (!refreshToken) {
                                console.log(
                                    "🔒 No refresh token available - triggering logout"
                                );
                                await tokenStorage.clearTokens();
                                authEvents.emit(AUTH_EVENTS.SESSION_EXPIRED);
                                throw new Error("No refresh token available");
                            }

                            console.log("🔄 Calling /auth/refresh...");
                            const response = await this.axiosInstance.post("/auth/refresh", {
                                refreshToken
                            });

                            console.log("✅ Refresh successful!");
                            // Extract new tokens from response
                            const newAccessToken = response.data.data.access_token;
                            const newRefreshToken = response.data.data.refresh_token;

                            // Save both new tokens
                            await tokenStorage.saveTokens({
                                accessToken: newAccessToken,
                                refreshToken: newRefreshToken,
                            });

                            this.axiosInstance.defaults.headers.common["Authorization"] =
                                `Bearer ${newAccessToken}`;
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            this.processQueue(null, newAccessToken);

                            return this.axiosInstance(originalRequest);
                        } catch (refreshError: any) {
                            console.log("🔴 Refresh token error caught in try/catch:", {
                                status: refreshError?.status,
                                message: refreshError?.message,
                            });

                            this.processQueue(refreshError, null);

                            // The SESSION_EXPIRED event should already be emitted by the interceptor
                            // when the refresh request returns 401, but emit again just in case
                            if (!authEvents.sessionExpiredFlag) {
                                console.log("🔒 Emitting SESSION_EXPIRED from catch block");
                                await tokenStorage.clearTokens();
                                authEvents.emit(AUTH_EVENTS.SESSION_EXPIRED);
                            }

                            return Promise.reject(refreshError);
                        } finally {
                            this.isRefreshing = false;
                        }
                    }

                    switch (status) {
                        case 403:
                            console.log("Forbidden - insufficient permissions");
                            break;
                        case 404:
                            console.log("Resource not found");
                            break;
                        case 500:
                            console.log("Server error");
                            break;
                        default:
                            console.log(`Error ${status}: ${message}`);
                    }

                    return Promise.reject({
                        status,
                        message,
                        data: error.response.data,
                    });
                } else if (error.request) {
                    // Request made but no response received
                    console.error("❌ Network Error:", error.message);
                    return Promise.reject({
                        status: 0,
                        message: "Network error. Please check your connection.",
                    });
                } else {
                    // Something else happened
                    console.error("❌ Error:", error.message);
                    return Promise.reject({
                        message: error.message,
                    });
                }
            }
        );
    }

    /**
     * Set authorization token
     */
    setAuthToken(token: string): void {
        this.axiosInstance.defaults.headers.common["Authorization"] =
            `Bearer ${token}`;
    }

    /**
     * Remove authorization token
     */
    removeAuthToken(): void {
        delete this.axiosInstance.defaults.headers.common["Authorization"];
    }

    /**
     * GET request
     */
    async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    /**
     * POST request
     */
    async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data, config);
        return response.data;
    }

    /**
     * PUT request
     */
    async put<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    /**
     * PATCH request
     */
    async patch<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> {
        const response = await this.axiosInstance.patch<T>(url, data, config);
        return response.data;
    }

    /**
     * DELETE request
     */
    async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }

    /**
     * Get the raw axios instance for advanced usage
     */
    getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }
}

// Export singleton instance
export const httpClient = new AxiosHttpClient();
