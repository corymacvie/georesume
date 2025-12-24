"use client";
import { Icon } from "@iconify/react";
import { RESUME_EVENTS, EDUCATION } from "@/data/resume";
import { useRef, useState } from "react";
import { handleDownload as exportToPDF } from "@/lib/export";
import { motion } from "framer-motion";

interface ResumeProps {
    onEventHover: (id: string | null) => void;
    onImageClick: (url: string, caption: string) => void;
}

const Resume = ({ onEventHover, onImageClick }: ResumeProps) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const handleDownload = async () => {
        setIsGenerating(true);
        try {
            await exportToPDF();
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <motion.div
            id="resume-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-20 min-h-screen flex flex-col items-start justify-start p-2 md:p-3 lg:p-4"
        >
            <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden relative border border-slate-200" style={{ maxHeight: "calc(100vh - 4rem)" }}>
                <div id="resume-content" ref={contentRef} className="h-full overflow-y-auto" style={{ maxHeight: "calc(100vh - 4rem)" }}>
                    <div className="p-6 md:p-8">
                        <header className="mb-6 border-b border-slate-200 pb-5">
                            <h1 className="text-2xl font-semibold text-slate-900 tracking-tight mb-1">Cory MacVie</h1>
                            <p className="text-sm text-slate-600 mb-3">Strategic Product Leader</p>
                            <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                                <span className="flex items-center gap-1">
                                    <Icon icon="lucide:map-pin" className="w-[14px] h-[14px]" style={{ strokeWidth: 1.5 }} /> Los Angeles, CA
                                </span>
                                <a href="tel:909-435-6551" className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                                    <Icon icon="lucide:phone" className="w-[14px] h-[14px]" style={{ strokeWidth: 1.5 }} /> 909-435-6551
                                </a>
                                <a href="mailto:cory@corymacvie.com" className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                                    <Icon icon="lucide:mail" className="w-[14px] h-[14px]" style={{ strokeWidth: 1.5 }} /> cory@corymacvie.com
                                </a>
                                <a href="http://www.linkedin.com/in/macvie" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                                    <Icon icon="lucide:linkedin" className="w-[14px] h-[14px]" style={{ strokeWidth: 1.5 }} /> @MacVie
                                </a>
                            </div>
                        </header>

                        <section className="mb-6">
                            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Summary</h2>
                            <p className="leading-relaxed text-xs text-slate-600">
                                Strategic product leader with extensive experience guiding successful SaaS products from concept to market. Skilled in translating complex user needs into intuitive, high-ROI solutions that drive adoption and retention. Adept at leading cross-functional teams through product lifecycles while balancing technical constraints, business goals, and customer needs.
                            </p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Experience</h2>
                            <div className="space-y-4">
                                {RESUME_EVENTS.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        whileHover={{ x: 2 }}
                                        className="resume-event cursor-pointer p-2.5 -mx-2.5 rounded-lg transition-colors hover:bg-slate-50"
                                        onMouseEnter={() => onEventHover(event.id)}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-sm font-medium text-slate-900">{event.title}</h3>
                                            <span className="text-xs text-slate-400 whitespace-nowrap ml-3">{event.period}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 mb-1.5">
                                            {event.companyUrl ? (
                                                <a href={event.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                                                    {event.company}
                                                </a>
                                            ) : event.company}
                                        </p>
                                        <ul className="text-xs text-slate-500 leading-relaxed space-y-1 list-disc list-inside">
                                            {event.bullets.map((bullet, idx) => (
                                                <li key={idx}>{bullet}</li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center gap-1 mt-1.5 text-xs text-blue-600">
                                            <Icon icon="lucide:map-pin" className="w-3" style={{ strokeWidth: 1.5 }} /> {event.location}
                                        </div>
                                        {event.thumbnails && (
                                            <div className="work-thumbnails flex gap-2 mt-3">
                                                {event.thumbnails.map((thumb, idx) => (
                                                    <motion.button
                                                        key={idx}
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="work-thumbnail w-12 h-12 rounded-lg overflow-hidden border-2 border-slate-200 hover:border-blue-400 transition-colors shadow-sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onImageClick(thumb.image, thumb.tooltip);
                                                        }}
                                                    >
                                                        <span className="thumbnail-tooltip">{thumb.tooltip}</span>
                                                        <img src={thumb.image} alt="" className="w-full h-full object-cover" />
                                                    </motion.button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Education</h2>
                            <div className="space-y-4">
                                {EDUCATION.map((edu, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ x: 2 }}
                                        className="resume-event cursor-pointer p-2.5 -mx-2.5 rounded-lg transition-colors hover:bg-slate-50"
                                        onMouseEnter={() => onEventHover(`edu-${idx}`)}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="text-sm font-medium text-slate-900">{edu.degree}</h3>
                                            <span className="text-xs text-slate-400 whitespace-nowrap ml-3">{edu.period}</span>
                                        </div>
                                        <p className="text-sm text-slate-600">{edu.school}</p>
                                        <div className="flex items-center gap-1 mt-1.5 text-xs text-blue-600">
                                            <Icon icon="lucide:map-pin" className="w-3" style={{ strokeWidth: 1.5 }} /> {edu.location}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Strengths</h2>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    "Owner Attitude", "Business Development", "Strategic Thinker",
                                    "Strong Communicator", "Detail-oriented", "Creative Problem Solver",
                                    "Data-driven", "Team Player"
                                ].map((strength, idx) => (
                                    <motion.span
                                        key={idx}
                                        whileHover={{ scale: 1.05, backgroundColor: "#f1f5f9" }}
                                        className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-transparent hover:border-slate-200 cursor-default"
                                    >
                                        {strength}
                                    </motion.span>
                                ))}
                            </div>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Tools</h2>
                            <div className="space-y-2 text-xs text-slate-600">
                                <p><span className="font-medium text-slate-700">Product:</span> Jira, Confluence, Github, GitLab, Linear, Pendo, Mixpanel, Amplitude, AWS, Google Cloud</p>
                                <p><span className="font-medium text-slate-700">Design:</span> Figma, Framer, Adobe Suite, Radix</p>
                                <p><span className="font-medium text-slate-700">AI:</span> LangChain Framework</p>
                                <p><span className="font-medium text-slate-700">Sales:</span> Salesforce, Hubspot CRM, Outreach, LinkedIn Sales Navigator</p>
                                <p><span className="font-medium text-slate-700">Analytics:</span> Tableau, Power BI, Looker</p>
                            </div>
                        </section>

                        <footer className="pt-5 border-t border-slate-200">
                            <div className="flex items-center justify-end text-xs text-slate-400">
                                <div className="flex gap-3">
                                    <a href="http://www.linkedin.com/in/macvie" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">
                                        <Icon icon="lucide:linkedin" className="w-4 h-4" style={{ strokeWidth: 1.5 }} />
                                    </a>
                                    <a href="https://instagram.com/whatsupcory" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">
                                        <Icon icon="lucide:instagram" className="w-4 h-4" style={{ strokeWidth: 1.5 }} />
                                    </a>
                                    <a href="http://x.com/corymacvie" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">
                                        <Icon icon="lucide:twitter" className="w-4 h-4" style={{ strokeWidth: 1.5 }} />
                                    </a>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
            <motion.button
                id="download-pdf-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDownload}
                disabled={isGenerating}
                className="download-btn flex items-center gap-1.5 px-3 py-1.5 mt-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all shadow-md active:shadow-sm"
            >
                {isGenerating ? (
                    <>
                        <Icon icon="lucide:loader-2" className="w-[14px] h-[14px] animate-spin" style={{ strokeWidth: 1.5 }} />
                        <span>Generating...</span>
                    </>
                ) : (
                    <>
                        <Icon icon="lucide:download" className="w-[14px] h-[14px]" style={{ strokeWidth: 1.5 }} />
                        <span>Download PDF</span>
                    </>
                )}
            </motion.button>
        </motion.div>
    );
};

export default Resume;

