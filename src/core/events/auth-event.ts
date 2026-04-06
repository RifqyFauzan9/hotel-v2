/**
 * Auth Events
 * Event emitter for authentication-related events
 * Used to communicate between HTTP client and Auth context
 */

type AuthEventListener = () => void;

class AuthEventEmitter {
    private listeners: Map<string, AuthEventListener[]> = new Map();

    // Flag to track if session has expired (checked synchronously on app load)
    public sessionExpiredFlag = false;

    /**
     * Subscribe to an event
     */
    on(event: string, listener: AuthEventListener): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(listener);
        console.log(
            `🔔 [AuthEvents] Subscribed to ${event}, total listeners: ${this.listeners.get(event)!.length}`
        );

        // If session already expired before listener was set up, call it immediately
        if (event === AUTH_EVENTS.SESSION_EXPIRED && this.sessionExpiredFlag) {
            console.log(
                `🔔 [AuthEvents] Session was already expired, calling listener immediately`
            );
            setTimeout(() => listener(), 0);
        }

        // Return unsubscribe function
        return () => {
            const eventListeners = this.listeners.get(event);
            if (eventListeners) {
                const index = eventListeners.indexOf(listener);
                if (index > -1) {
                    eventListeners.splice(index, 1);
                    console.log(
                        `🔔 [AuthEvents] Unsubscribed from ${event}, remaining listeners: ${eventListeners.length}`
                    );
                }
            }
        };
    }

    /**
     * Emit an event
     */
    emit(event: string): void {
        console.log(`🔴 [AuthEvents] Emitting ${event}`);

        // Set flag for SESSION_EXPIRED
        if (event === AUTH_EVENTS.SESSION_EXPIRED) {
            this.sessionExpiredFlag = true;
        }

        const eventListeners = this.listeners.get(event);
        console.log(
            `🔴 [AuthEvents] Found ${eventListeners?.length || 0} listeners for ${event}`
        );
        if (eventListeners && eventListeners.length > 0) {
            eventListeners.forEach((listener, index) => {
                console.log(`🔴 [AuthEvents] Calling listener ${index + 1}`);
                listener();
            });
        } else {
            console.log(
                `🔴 [AuthEvents] No listeners registered for ${event} - event will be delivered when listener subscribes`
            );
        }
    }

    /**
     * Clear the session expired flag (call after handling logout)
     */
    clearSessionExpiredFlag(): void {
        this.sessionExpiredFlag = false;
    }
}

export const authEvents = new AuthEventEmitter();

// Event constants
export const AUTH_EVENTS = {
    SESSION_EXPIRED: "SESSION_EXPIRED",
} as const;
