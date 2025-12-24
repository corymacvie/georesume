"use client";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
import Panel from "@/components/Panel";
import Resume from "@/components/Resume";
import { useState, useMemo } from "react";
import InfoCard from "@/components/InfoCard";
import Lightbox from "@/components/Lightbox";
import { RESUME_EVENTS, EDUCATION } from "@/data/resume";
import { motion, AnimatePresence } from "framer-motion";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-slate-100 animate-pulse" />
});

type PanelType = "about" | "posts" | "books" | "work";

export default function Home() {
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [panelType, setPanelType] = useState<PanelType | null>(null);
  const [lightbox, setLightbox] = useState<{ isOpen: boolean; image: string; caption: string }>({
    isOpen: false,
    image: "",
    caption: ""
  });

  const mapEvents = useMemo(() => [
    ...RESUME_EVENTS.map(e => ({ id: e.id, lat: e.lat, lng: e.lng })),
    ...EDUCATION.map((e, idx) => ({ id: `edu-${idx}`, lat: e.lat, lng: e.lng }))
  ], []);

  const activeEvent = useMemo(() => {
    if (!activeEventId) return null;
    const fromResume = RESUME_EVENTS.find(e => e.id === activeEventId);
    if (fromResume) return fromResume;

    if (activeEventId.startsWith('edu-')) {
      const idx = parseInt(activeEventId.split('-')[1]);
      return EDUCATION[idx];
    }
    return null;
  }, [activeEventId]);

  const openLightbox = (url: string, caption: string = "") => {
    setLightbox({ isOpen: true, image: url, caption });
  };

  return (
    <main className="min-h-screen bg-slate-100 font-sans antialiased">
      <Map
        events={mapEvents}
        activeEventId={activeEventId}
      />

      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed md:top-3 md:right-3 lg:top-4 lg:right-4 z-40 hidden md:flex gap-2 bg-white/95 border-slate-200/50 border rounded-xl pt-2 pr-2 pb-2 pl-2 top-2 right-2 shadow-lg backdrop-blur-sm items-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPanelType("about")}
          className="nav-btn flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Icon icon="lucide:user" className="w-4 h-4" style={{ strokeWidth: 1.5 }} />
          <span>About</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPanelType("posts")}
          className="nav-btn flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Icon icon="lucide:pen-line" className="w-4 h-4" style={{ strokeWidth: 1.5 }} />
          <span>Posts</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPanelType("books")}
          className="nav-btn flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Icon icon="lucide:book-open" className="w-4 h-4" style={{ strokeWidth: 1.5 }} />
          <span>Books</span>
        </motion.button>
        <div className="w-px h-6 bg-slate-200 mx-1" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPanelType("work")}
          className="work-with-me-btn flex text-sm font-medium text-white rounded-lg pt-2 pr-4 pb-2 pl-4 gap-x-2 gap-y-2 items-center"
        >
          <Icon icon="lucide:rocket" className="w-4 h-4" style={{ strokeWidth: 1.5 }} />
          <span>Work with Me</span>
        </motion.button>
      </motion.nav>

      <Resume
        onEventHover={setActiveEventId}
        onImageClick={openLightbox}
      />

      <AnimatePresence>
        {panelType && (
          <Panel
            isOpen={!!panelType}
            type={panelType}
            onClose={() => setPanelType(null)}
            onImageClick={(url) => openLightbox(url)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeEvent && !activeEvent.hideQuote && (
          <InfoCard
            isVisible={true}
            photo={activeEvent?.photo || ""}
            name={activeEvent?.name || ""}
            role={activeEvent?.role || ""}
            quote={activeEvent?.quote || ""}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightbox.isOpen && (
          <Lightbox
            isOpen={lightbox.isOpen}
            image={lightbox.image}
            caption={lightbox.caption}
            onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

