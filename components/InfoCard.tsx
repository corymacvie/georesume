"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface InfoCardProps {
    isVisible: boolean;
    photo: string;
    name: string;
    role: string;
    quote: string;
}

const InfoCard = ({ isVisible, photo, name, role, quote }: InfoCardProps) => {
    return (
        <motion.div
            id="info-card"
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-2 right-2 md:bottom-3 md:right-3 lg:bottom-4 lg:right-4 w-72 bg-white rounded-xl shadow-2xl z-30 overflow-hidden border border-slate-200 hidden md:block"
        >
            <div className="p-5">
                <div className="flex items-start gap-3">
                    {photo && (
                        <img
                            id="info-photo"
                            src={photo}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover shrink-0"
                        />
                    )}
                    <div className="flex-1 min-w-0">
                        <p id="info-name" className="text-sm font-medium text-slate-900 mb-0.5">{name}</p>
                        <p id="info-role" className="text-xs text-slate-500 mb-1">{role}</p>
                        <Icon icon="lucide:quote" className="text-slate-300 w-4 h-4" style={{ strokeWidth: 1.5 }} />
                    </div>
                </div>
                <p id="info-quote" className="text-xs text-slate-600 italic leading-relaxed mt-3">
                    {quote}
                </p>
            </div>
        </motion.div>
    );
};

export default InfoCard;

