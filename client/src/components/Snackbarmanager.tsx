import React, { createContext, useContext, useState, useCallback } from "react";
import SnackBar, { SnackBarProps, SnackBarVariant } from "./Snackbar";

type SnackBarOptions = Omit<SnackBarProps, "message" | "isOpen" | "onClose">;

interface SnackBarItem extends SnackBarProps {
  id: string;
}

interface SnackBarContextType {
  showSnackBar: (
    message: string,
    variant?: SnackBarVariant,
    options?: SnackBarOptions
  ) => string;
  closeSnackBar: (id: string) => void;
  closeAllSnackBars: () => void;
}

const SnackBarContext = createContext<SnackBarContextType | undefined>(
  undefined
);

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackBar must be used within a SnackBarProvider");
  }
  return context;
};

interface SnackBarProviderProps {
  children: React.ReactNode;
  maxSnackBars?: number;
}

export const SnackBarProvider: React.FC<SnackBarProviderProps> = ({
  children,
  maxSnackBars = 5,
}) => {
  const [snackBars, setSnackBars] = useState<SnackBarItem[]>([]);

  const showSnackBar = useCallback(
    (
      message: string,
      variant: SnackBarVariant = "info",
      options: SnackBarOptions = {}
    ) => {
      const id = Date.now().toString();

      setSnackBars((prev) => {
        // Remove oldest snackbars if we exceed the max
        const filtered =
          prev.length >= maxSnackBars
            ? prev.slice(prev.length - maxSnackBars + 1)
            : prev;

        return [
          ...filtered,
          { id, message, variant, ...options, isOpen: true },
        ];
      });

      return id;
    },
    [maxSnackBars]
  );

  const closeSnackBar = useCallback((id: string) => {
    setSnackBars((prev) => prev.filter((snackBar) => snackBar.id !== id));
  }, []);

  const closeAllSnackBars = useCallback(() => {
    setSnackBars([]);
  }, []);

  return (
    <SnackBarContext.Provider
      value={{ showSnackBar, closeSnackBar, closeAllSnackBars }}
    >
      {children}
      {snackBars.map((snackBar) => (
        <SnackBar
          key={snackBar.id}
          {...snackBar}
          onClose={() => closeSnackBar(snackBar.id)}
        />
      ))}
    </SnackBarContext.Provider>
  );
};

// Helper functions for common snackbar types
export const useSnackBarHelpers = () => {
  const { showSnackBar } = useSnackBar();

  return {
    success: (message: string, options?: SnackBarOptions) =>
      showSnackBar(message, "success", options),

    error: (message: string, options?: SnackBarOptions) =>
      showSnackBar(message, "error", options),

    warning: (message: string, options?: SnackBarOptions) =>
      showSnackBar(message, "warning", options),

    info: (message: string, options?: SnackBarOptions) =>
      showSnackBar(message, "info", options),
  };
};
