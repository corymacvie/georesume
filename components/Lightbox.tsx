"use client";

import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
        <motion.div
            id="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-60 backdrop-blur-sm flex flex-col items-center justify-center p-4 md:p-8"
            onClick={onClose}
        >
            <motion.button
                id="lightbox-close"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Icon icon="lucide:x" className="w-6 h-6 text-white" style={{ strokeWidth: 1.5 }} />
            </motion.button>
            {image && (
                <motion.img
                    id="lightbox-image"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    src={image}
                    alt="Work sample"
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                />
            )}
            {caption && (
                <motion.p
                    id="lightbox-caption"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-sm mt-4 text-center max-w-lg opacity-90"
                >
                    {caption}
                </motion.p>
            )}
        </motion.div>
    );
};

export default Lightbox;

