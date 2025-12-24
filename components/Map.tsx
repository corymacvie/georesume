"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

interface MapProps {
    events: { lat: number; lng: number; id: string }[];
    activeEventId: string | null;
    onMarkerClick?: (id: string) => void;
}

const Map = ({ events, activeEventId }: MapProps) => {
    const mapRef = useRef<L.Map | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<Record<string, L.Marker>>({});

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const mapCenterLng = -115;
        const map = L.map(containerRef.current, {
            zoomControl: false,
            attributionControl: false,
        }).setView([37, mapCenterLng], 5);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            maxZoom: 19,
        }).addTo(map);

        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    const createMarkerIcon = (isActive = false) => {
        return L.divIcon({
            className: "custom-marker",
            html: `<div style="
          width: ${isActive ? "20px" : "12px"};
          height: ${isActive ? "20px" : "12px"};
          background: ${isActive ? "#2563eb" : "#64748b"};
          border: ${isActive ? "3px" : "2px"} solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
      "></div>`,
            iconSize: [isActive ? 20 : 12, isActive ? 20 : 12],
            iconAnchor: [isActive ? 10 : 6, isActive ? 10 : 6],
        });
    };

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        Object.values(markersRef.current).forEach((m) => m.remove());
        markersRef.current = {};

        events.forEach((event) => {
            if (event.lat && event.lng) {
                const marker = L.marker([event.lat, event.lng], {
                    icon: createMarkerIcon(event.id === activeEventId),
                }).addTo(map);
                markersRef.current[event.id] = marker;
            }
        });
    }, [events, activeEventId]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || !activeEventId) return;

        const activeEvent = events.find((e) => e.id === activeEventId);
        if (activeEvent) {
            const getOffsetCenter = (lat: number, lng: number) => {
                const isMobile = window.innerWidth < 768;
                if (isMobile) return [lat, lng] as [number, number];

                const resumePanelWidth = 580;
                const viewportWidth = window.innerWidth;
                const offsetRatio = resumePanelWidth / viewportWidth / 2;
                const zoom = 10;
                const lngOffset = (360 / Math.pow(2, zoom)) * offsetRatio * 4;
                return [lat, lng - lngOffset] as [number, number];
            };

            const offsetCenter = getOffsetCenter(activeEvent.lat, activeEvent.lng);
            map.flyTo(offsetCenter, 10, {
                duration: 1.5,
            });
        }
    }, [activeEventId, events]);

    return <div ref={containerRef} className="fixed inset-0 w-full h-full z-0" />;
};

export default Map;
