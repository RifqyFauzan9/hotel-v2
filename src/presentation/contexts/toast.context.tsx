import {
	Toast,
	ToastDescription,
	ToastTitle,
	useToast,
} from "@gluestack-ui/themed";
import { createContext, ReactNode, useCallback, useContext } from "react";
import { View } from "react-native";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
	title: string;
	description?: string;
	type?: ToastType;
	duration?: number;
}

interface ToastContextType {
	showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Global toast function that can be called from outside React components
let globalShowToast: ((options: ToastOptions) => void) | null = null;

export function showGlobalToast(options: ToastOptions) {
	if (globalShowToast) {
		globalShowToast(options);
	} else {
		console.warn("Toast context not initialized yet");
	}
}

const getToastColors = (type: ToastType) => {
	switch (type) {
		case "success":
			return { bg: "#15803d", border: "#22c55e" }; // green
		case "error":
			return { bg: "#b91c1c", border: "#ef4444" }; // red
		case "warning":
			return { bg: "#b45309", border: "#f59e0b" }; // amber
		case "info":
		default:
			return { bg: "#0369a1", border: "#0ea5e9" }; // blue
	}
};

export function ToastProvider({ children }: { children: ReactNode }) {
	const toast = useToast();

	const showToast = useCallback(
		({ title, description, type = "info", duration = 4000 }: ToastOptions) => {
			const colors = getToastColors(type);

			toast.show({
				placement: "top",
				duration,
				render: ({ id }) => {
					const toastId = "toast-" + id;
					return (
						<Toast
							nativeID={toastId}
							style={{
								backgroundColor: colors.bg,
								borderLeftWidth: 4,
								borderLeftColor: colors.border,
								marginHorizontal: 16,
								marginTop: 48,
								paddingHorizontal: 16,
								paddingVertical: 12,
								borderRadius: 12,
								shadowColor: "#000",
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.25,
								shadowRadius: 4,
								elevation: 5,
							}}
						>
							<View style={{ gap: 4 }}>
								<ToastTitle
									style={{
										color: "#fff",
										fontWeight: "600",
										fontSize: 16,
									}}
								>
									{title}
								</ToastTitle>
								{description && (
									<ToastDescription
										style={{
											color: "#fff",
											fontSize: 14,
											opacity: 0.9,
										}}
									>
										{description}
									</ToastDescription>
								)}
							</View>
						</Toast>
					);
				},
			});
		},
		[toast]
	);

	// Set global toast function
	globalShowToast = showToast;

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
		</ToastContext.Provider>
	);
}

export function useAppToast() {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useAppToast must be used within a ToastProvider");
	}
	return context;
}
