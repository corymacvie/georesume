"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

interface Post {
    title: string;
    link: string;
    pubDate: string;
    description: string;
}

interface Book {
    title: string;
    link: string;
    author: string;
    rating: number;
    coverUrl: string;
}

type PanelType = "about" | "posts" | "books" | "work";

interface PanelProps {
    isOpen: boolean;
    type: PanelType | null;
    onClose: () => void;
    onImageClick?: (url: string) => void;
}

const Panel = ({ isOpen, type, onClose, onImageClick }: PanelProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (type === "posts" && posts.length === 0) {
            setLoading(true);
            const rssUrl = 'https://medium.com/feed/@corymacvie';
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === "ok") setPosts(data.items?.slice(0, 10));
                })
                .catch(err => console.error("Error fetching posts:", err))
                .finally(() => setLoading(false));
        }
        if (type === "books" && books.length === 0) {
            setLoading(true);
            const rssUrl = 'https://www.goodreads.com/review/list_rss/6857196?key=X1zehKAV7nSuPJ2I8zn7_v2Ydgut0KVxaLxgZr3MVOpQXwxH&shelf=%23ALL%23';
            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === "ok") {
                        const formattedBooks = data.items?.slice(0, 8)?.map((item: any) => {
                            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                            const authorMatch = item.description.match(/author:\s*([^<]+)/i);
                            const ratingMatch = item.description.match(/rating:\s*(\d)/i);

                            return {
                                title: item.title,
                                link: item.link,
                                author: authorMatch ? authorMatch[1].trim() : "Unknown Author",
                                rating: ratingMatch ? parseInt(ratingMatch[1]) : 0,
                                coverUrl: imgMatch ? imgMatch[1].replace(/\._\w+_\./, "._SX150_.") : ""
                            };
                        });
                        setBooks(formattedBooks);
                    }
                })
                .catch(err => console.error("Error fetching books:", err))
                .finally(() => setLoading(false));
        }
    }, [type]);

    const titles = {
        about: "About Me",
        posts: "Posts",
        books: "Recent Audibles/Reads",
        work: "Work with Me"
    };

    return (
        <>
            <div
                id="slideout-overlay"
                className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={onClose}
            />
            <div id="slideout-panel" className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200">
                        <h2 id="panel-title" className="text-base font-semibold text-slate-900 tracking-tight">
                            {type ? titles[type] : ""}
                        </h2>
                        <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                            <Icon icon="lucide:x" className="w-[18px] h-[18px] text-slate-500" style={{ strokeWidth: 1.5 }} />
                        </button>
                    </div>
                    <div id="panel-content" className="flex-1 overflow-y-auto p-6">
                        {type === "about" && (
                            <div className="space-y-6">
                                <div className="w-48 h-48 mx-auto">
                                    <img
                                        src="https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/369297620_10100284904073141_3171073919037120253_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=0TBgbYFPlBMQ7kNvwHUkjH6&_nc_oc=AdnbnOTrK1wK6mfCdZkn0f6j2e-xoHvjugAVpyvTiG3uNQhXO0RsxRLc2qqJAXSlRNzeNgGaF415hOl6Oe11MnjJ&_nc_zt=23&_nc_ht=scontent-lax3-2.xx&_nc_gid=6sdBuvC5fm8WaBA9ll6mhQ&oh=00_AfmVONjF-ryl4_CmTyfHgCPW8-mL8begs-FZ9FnarjzzlA&oe=694ED5ED"
                                        alt="Cory MacVie"
                                        className="w-full h-full object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => onImageClick?.("https://scontent-lax3-2.xx.fbcdn.net/v/t39.30808-6/369297620_10100284904073141_3171073919037120253_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=0TBgbYFPlBMQ7kNvwHUkjH6&_nc_oc=AdnbnOTrK1wK6mfCdZkn0f6j2e-xoHvjugAVpyvTiG3uNQhXO0RsxRLc2qqJAXSlRNzeNgGaF415hOl6Oe11MnjJ&_nc_zt=23&_nc_ht=scontent-lax3-2.xx&_nc_gid=6sdBuvC5fm8WaBA9ll6mhQ&oh=00_AfmVONjF-ryl4_CmTyfHgCPW8-mL8begs-FZ9FnarjzzlA&oe=694ED5ED")}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Cory MacVie</h3>
                                    <p className="text-sm text-slate-500">Strategic Product Leader</p>
                                </div>
                                <div className="prose prose-sm text-slate-600">
                                    <p className="text-sm leading-relaxed">I&apos;m a product leader passionate about building software that solves real problems. With over a decade of experience spanning geospatial platforms, mobile data collection, healthcare compliance, and legal tech, I&apos;ve learned that the best products come from deeply understanding user needs and translating them into elegant solutions.</p>
                                    <p className="text-sm leading-relaxed mt-4">When I&apos;m not thinking about product strategy, you&apos;ll find me exploring new places, diving into a good audiobook, or experimenting with the latest AI tools.</p>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">What Drives Me</h4>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">&quot;I will never stop learning. I won&apos;t just work on things that are assigned to me. I know there&apos;s no such thing as a status quo. I will never pass up an opportunity to help out a colleague, and I&apos;ll remember the days before I knew everything. I am more motivated by impact than money. I am in a marathon, not a sprint; no matter how far away the goal is, the only way to get there is to put one foot in front of the other every day. Given time, there is no problem that&apos;s insurmountable.&quot;</p>
                                </div>
                            </div>
                        )}
                        {type === "posts" && (
                            <div className="space-y-4">
                                <p className="text-sm text-slate-500">Thoughts on product, technology, and leadership.</p>
                                {loading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Icon icon="lucide:loader-2" className="w-6 h-6 animate-spin text-slate-400" />
                                        <span className="ml-2 text-sm text-slate-500">Loading posts...</span>
                                    </div>
                                ) : (
                                    <div id="posts-container" className="space-y-4">
                                        {posts.map((post, i) => {
                                            const pubDate = new Date(post.pubDate);
                                            const formattedDate = pubDate.toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            });
                                            const textContent = post.description.replace(/<[^>]+>/g, '');
                                            const wordCount = textContent.split(/\s+/).length;
                                            const readTime = Math.max(1, Math.ceil(wordCount / 200));

                                            return (
                                                <a key={i} href={post.link} target="_blank" rel="noopener noreferrer" className="block p-4 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer">
                                                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                                                        <span>{formattedDate}</span>
                                                        <span>•</span>
                                                        <span>{readTime} min read</span>
                                                    </div>
                                                    <h3 className="text-sm font-medium text-slate-900 mb-1 line-clamp-2">{post.title}</h3>
                                                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{textContent.substring(0, 150)}...</p>
                                                </a>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                        {type === "books" && (
                            <div className="space-y-4">
                                <p className="text-sm text-slate-500">What I&apos;ve been reading and listening to lately.</p>
                                {loading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Icon icon="lucide:loader-2" className="w-6 h-6 animate-spin text-slate-400" />
                                        <span className="ml-2 text-sm text-slate-500">Loading books...</span>
                                    </div>
                                ) : (
                                    <div id="books-container" className="space-y-4">
                                        {books.map((book, i) => (
                                            <a key={i} href={book.link} target="_blank" rel="noopener noreferrer" className="flex gap-4 p-3 border border-slate-200 rounded-lg hover:border-slate-300 hover:bg-slate-50 transition-all">
                                                <img src={book.coverUrl || 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg'} alt={book.title} className="w-16 h-24 object-cover rounded shadow-sm shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-medium text-slate-900 line-clamp-2 mb-1">{book.title}</h4>
                                                    <p className="text-xs text-slate-500 mb-1">{book.author}</p>
                                                    <div className="flex gap-0.5">
                                                        {Array(5).fill(0).map((_, idx) => (
                                                            <Icon key={idx} icon="lucide:star" className={`w-3 h-3 ${idx < book.rating ? "text-yellow-400" : "text-slate-200"}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {type === "work" && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-900 tracking-tight mb-3">Build Your Product With Confidence</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">I help founders and teams design, build, and launch software products—from early ideas to production-ready platforms. I specialize in turning complex requirements into simple, usable products.</p>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">What I Can Help You Build</h4>
                                    <ul className="space-y-2">
                                        {[
                                            "SaaS, Marketplaces, eCommerce, mobile apps, and internal tools",
                                            "AI-powered products (chat, RAG, automation)",
                                            "Legal, healthcare, culinary, and platforms",
                                            "MVPs, redesigns, and feature expansions"
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                <Icon icon="lucide:check" className="text-blue-500 mt-0.5 shrink-0 w-4 h-4" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">How I Work</h4>
                                    <ul className="space-y-2">
                                        {[
                                            { icon: "lucide:compass", text: "Product strategy and scoping", color: "text-green-500" },
                                            { icon: "lucide:palette", text: "UI/UX design and user flows", color: "text-green-500" },
                                            { icon: "lucide:code", text: "Technical execution and team leadership", color: "text-green-500" },
                                            { icon: "lucide:repeat", text: "Iterative delivery with clear milestones", color: "text-green-500" }
                                        ].map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                <Icon icon={item.icon} className={`${item.color} mt-0.5 shrink-0 w-4 h-4`} />
                                                {item.text}
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="text-sm text-slate-500 mt-3 italic">I focus on outcomes, not just output. You get a product that is usable, scalable, and ready to grow.</p>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Ways to Work Together</h4>
                                    <div className="space-y-3">
                                        {[
                                            { title: "Project-based builds", desc: "End-to-end delivery", icon: "lucide:package", color: "text-purple-500" },
                                            { title: "Fractional product leadership", desc: "Strategy, execution, and oversight", icon: "lucide:users", color: "text-purple-500" },
                                            { title: "Advisory & product audits", desc: "Direction, clarity, and next steps", icon: "lucide:lightbulb", color: "text-purple-500" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Icon icon={item.icon} className={`${item.color} w-4 h-4`} />
                                                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                                                </div>
                                                <p className="text-xs text-slate-500">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Icon icon="lucide:clock" className="text-amber-500 w-4 h-4" />
                                        <h4 className="text-sm font-semibold text-slate-900">Availability</h4>
                                    </div>
                                    <p className="text-sm text-slate-600">Currently accepting a limited number of new projects.</p>
                                </div>
                                <div className="pt-4 border-t border-slate-100">
                                    <h4 className="text-sm font-semibold text-slate-900 mb-2">Let&apos;s Talk</h4>
                                    <p className="text-sm text-slate-600">Have an idea, an MVP, or an existing product that needs improvement? Reach out using the buttons below.</p>
                                </div>
                            </div>
                        )}
                    </div>
                    {type === "work" && (
                        <div id="panel-footer" className="border-t border-slate-200 bg-white p-4">
                            <div className="space-y-2">
                                <a href="https://zcal.co/corymacvie/30min" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full p-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-sm font-medium">
                                    <Icon icon="lucide:calendar" className="w-[18px] h-[18px]" style={{ strokeWidth: 1.5 }} />
                                    Schedule a Call
                                </a>
                                <div className="flex gap-2">
                                    <a href="mailto:cory@corymacvie.com" className="flex items-center justify-center gap-2 flex-1 p-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium">
                                        <Icon icon="lucide:mail" className="w-[18px] h-[18px]" style={{ strokeWidth: 1.5 }} />
                                        Email Me
                                    </a>
                                    <a href="http://www.linkedin.com/in/macvie" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 flex-1 p-3 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium">
                                        <Icon icon="lucide:linkedin" className="w-[18px] h-[18px]" style={{ strokeWidth: 1.5 }} />
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Panel;
