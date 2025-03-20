import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react";

export type SnackBarVariant = "success" | "error" | "warning" | "info";

export interface SnackBarProps {
    message: string;
    variant?: SnackBarVariant;
    isOpen?: boolean;
    onClose?: () => void;

    // Timing props
    autoHideDuration?: number;
    disableAutoHide?: boolean;

    // Styling props
    className?: string;
    position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
    width?: string;
    hideIcon?: boolean;

    // Content props
    title?: string;
    action?: React.ReactNode;

    // Animation props
    animationDuration?: number;
}

const SnackBar: React.FC<SnackBarProps> = ({
    message,
    variant = "info",
    isOpen = true,
    onClose,
    autoHideDuration = 5000,
    disableAutoHide = false,
    className = "",
    position = "bottom-right",
    width = "auto",
    hideIcon = false,
    title,
    action,
    animationDuration = 300,
}) => {
    const [isVisible, setIsVisible] = useState(isOpen);
    const [isExiting, setIsExiting] = useState(false);

    // Configure variant styles
    const variantConfig = {
        success: {
            bgColor: "bg-green-100",
            borderColor: "border-green-500",
            textColor: "text-green-800",
            icon: <CheckCircle size={20} className="text-green-500" />,
        },
        error: {
            bgColor: "bg-red-100",
            borderColor: "border-red-500",
            textColor: "text-red-800",
            icon: <AlertCircle size={20} className="text-red-500" />,
        },
        warning: {
            bgColor: "bg-yellow-100",
            borderColor: "border-yellow-500",
            textColor: "text-yellow-800",
            icon: <AlertTriangle size={20} className="text-yellow-500" />,
        },
        info: {
            bgColor: "bg-blue-100",
            borderColor: "border-blue-500",
            textColor: "text-blue-800",
            icon: <Info size={20} className="text-blue-500" />,
        },
    };

    // Configure position styles
    const positionStyles = {
        "top-left": "top-4 left-4",
        "top-center": "top-4 left-1/2 transform -translate-x-1/2",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    };

    // Handle auto-hide
    useEffect(() => {
        setIsVisible(isOpen);
    }, [isOpen]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isVisible && !disableAutoHide) {
            timer = setTimeout(() => {
                handleClose();
            }, autoHideDuration);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isVisible, disableAutoHide, autoHideDuration]);

    // Handle closing with animation
    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            setIsExiting(false);
            if (onClose) onClose();
        }, animationDuration);
    };

    if (!isVisible) return null;

    // Animation styles
    const animationStyles = {
        transition: `opacity ${animationDuration}ms, transform ${animationDuration}ms`,
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? "translateY(10px)" : "translateY(0)",
    };

    return (
        <div className={`fixed z-50 ${positionStyles[position]}`} style={{ width, ...animationStyles }}>
            <div className={`flex items-start p-4 rounded-lg shadow-lg border-l-4 ${variantConfig[variant].bgColor} ${variantConfig[variant].borderColor} ${className}`}>
                {!hideIcon && <div className="flex-shrink-0 mr-3">{variantConfig[variant].icon}</div>}

                <div className="flex-1">
                    {title && <h4 className={`font-medium mb-1 ${variantConfig[variant].textColor}`}>{title}</h4>}
                    <p className={variantConfig[variant].textColor}>{message}</p>
                </div>

                {action && <div className="ml-3">{action}</div>}

                <button onClick={handleClose} className="ml-4 flex-shrink-0 text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Close">
                    <X size={16} />
                </button>
            </div>
        </div>
    );
};

export default SnackBar;
