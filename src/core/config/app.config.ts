/**
 * Application Configuration
 * Central place for all app configuration
 */
export const config = {
    api: {
        baseUrl: process.env.EXPO_PUBLIC_API_URL || "https://api.example.com/v1",
        timeout: 10000,
    },
    storage: {
        prefix: "@ihms_maintenance_mobile",
    },
    features: {
        imageUpload: true,
    },
} as const;
