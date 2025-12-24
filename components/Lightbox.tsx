"use client";

import { Icon } from "@iconify/react";
import { useEffect } from "react";

interface LightboxProps {
    isOpen: boolean;
    image: string;
    caption: string;
    onClose: () => void;
}

const Lightbox = ({ isOpen, image, caption, onClose }: LightboxProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div
            id="lightbox"
            className={`fixed inset-0 bg-black/90 z-60 transition-opacity duration-300 flex flex-col items-center justify-center p-4 md:p-8 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none hidden"}`}
            style={{ zIndex: 60 }}
            onClick={onClose}
        >
            <button
                id="lightbox-close"
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
                <Icon icon="lucide:x" className="w-6 h-6 text-white" style={{ strokeWidth: 1.5 }} />
            </button>
            {image && (
                <img
                    id="lightbox-image"
                    src={image}
                    alt="Work sample"
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
            )}
            <p
                id="lightbox-caption"
                className="text-white text-sm mt-4 text-center max-w-lg opacity-90"
                style={{ display: caption ? 'block' : 'none' }}
            >
                {caption}
            </p>
        </div>
    );
};

export default Lightbox;
