export interface ResumeEvent {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  lat: number;
  lng: number;
  photo: string;
  name: string;
  role: string;
  quote: string;
  hideQuote?: boolean;
  thumbnails?: { image: string; tooltip: string }[];
  companyUrl?: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  location: string;
  lat: number;
  lng: number;
  photo: string;
  name: string;
  role: string;
  quote: string;
  hideQuote?: boolean;
}

export const RESUME_EVENTS: ResumeEvent[] = [
  {
    id: "healthicity",
    title: "Senior Director of Product - Compliance",
    company: "Healthicity",
    companyUrl: "http://www.healthicity.com",
    period: "04/2025 - Current",
    location: "Salt Lake City, UT",
    lat: 40.7757,
    lng: -111.8883,
    bullets: [
      "Owns the strategy and roadmap for Healthicity's compliance solutions.",
      "Drives customer value, adoption, and differentiation through data and market insight.",
      "Partners cross-functionally to improve retention, revenue, and client satisfaction.",
    ],
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
    name: "James Mitchell",
    role: "Director of Engineering",
    quote:
      "Cory is one of the most talented and loyal colleagues I've ever had the chance to work with.",
    hideQuote: true,
    thumbnails: [
      {
        image:
          "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop",
        tooltip: "Healthcare compliance dashboard design",
      },
      {
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        tooltip: "Analytics and reporting module",
      },
    ],
  },
  {
    id: "compfox",
    title: "Head of Product",
    company: "CompFox",
    companyUrl: "http://www.compfox.io",
    period: "10/2024 - Current",
    location: "Long Beach, CA",
    lat: 33.7881,
    lng: -118.156,
    bullets: [
      "Led end-to-end UI/UX design and managed an offshore engineering team to build and launch CompFox, a legal research and document-generation platform.",
      "Implemented LangChain-based AI chat agents to analyze and extract insights from legal documents.",
      "Built a pipeline to automate legal document drafting using case law and uploaded files.",
    ],
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "David Chen",
    role: "CEO",
    quote: "Revolutionizing legal research with AI-powered intelligence.",
    hideQuote: true,
    thumbnails: [
      {
        image:
          "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
        tooltip: "AI-powered legal research interface",
      },
      {
        image:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        tooltip: "Document generation workflow",
      },
    ],
  },
  {
    id: "fulcrum-se",
    title: "Enterprise Sales Engineer",
    company: "Fulcrum",
    companyUrl: "http://www.fulcrumapp.com",
    period: "11/2022 - 01/2025",
    location: "St Petersburg, FL",
    lat: 27.7676,
    lng: -82.6403,
    bullets: [
      "Collaborated with sales and product teams to design customized solutions for enterprise clients",
      "Hired and trained all sales engineers across the sales teams",
      "Provided technical guidance throughout the sales cycle",
    ],
    photo:
      "https://media.licdn.com/dms/image/v2/D5603AQHpPv5zvKEmaQ/profile-displayphoto-shrink_100_100/B56ZarPDKJGoAY-/0/1746629571927?e=1767830400&v=beta&t=XF9zQ3Q8JWB_T9gXyGJWQcOrrYiTWcD6MBKiX-3oPoI",
    name: "Pat Hustad",
    role: "Peer",
    quote:
      "Cory is one of the most talented and loyal colleagues I've ever had the chance to work with. His energy and dedication to the team are contagious, and he always finds a way to bring people together to accomplish big goals. When it comes to product, I've never met anyone who can drive growth as fast as he can—he doesn't just build, he transforms companies.",
    thumbnails: [
      {
        image:
          "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
        tooltip: "Enterprise client presentation",
      },
      {
        image:
          "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&h=600&fit=crop",
        tooltip: "Technical solution architecture",
      },
    ],
  },
  {
    id: "fulcrum-csm",
    title: "Enterprise Customer Success Manager",
    company: "Fulcrum",
    companyUrl: "http://www.fulcrumapp.com",
    period: "09/2018 - 11/2022",
    location: "St Petersburg, FL",
    lat: 27.7676,
    lng: -82.6403,
    bullets: [
      "Championed clients' success through strong relationships and goal fulfillment",
      "Collaborated across teams to align solutions and guide onboarding",
      "Tracked metrics to suggest optimizations and ensure commitments were met",
    ],
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQE2YIp5kvVBuw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1670385509856?e=1767830400&v=beta&t=QWFdBUNCIk3S-QJwktM4sHIYpPNCNuA-lFenFHoltKc",
    name: "Chris Brown",
    role: "Manager",
    quote:
      "CSM doesn't quite do him justice, as he was quite literally the go-to person for any and all things customer-related. You wanted someone to connect the dots between value and how to execute in the software...Cory was your guy. During his time at Fulcrum, he wore just about every hat you could think of...he is a man of many talents! Cory has his hands in all sorts of things and brought new thoughts and ideas to the team regularly - he was a force multiplier!",
    thumbnails: [
      {
        image:
          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
        tooltip: "Customer onboarding session",
      },
      {
        image:
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
        tooltip: "Success metrics dashboard",
      },
    ],
  },
  {
    id: "fulcrum-pm",
    title: "Product Manager",
    company: "Fulcrum",
    companyUrl: "http://www.fulcrumapp.com",
    period: "09/2014 - 09/2018",
    location: "St. Petersburg, FL",
    lat: 27.7676,
    lng: -82.6403,
    bullets: [
      "Led end-to-end product lifecycle management, from ideation to release",
      "Conducted comprehensive market research and user interviews",
      "Created strategic product roadmaps with 95% on-time delivery",
    ],
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQEdYaAgMqHPIw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725072581713?e=1767830400&v=beta&t=bwE20sJ9t_vXbYdK0e2ZQkhftlFnAmP3NL3iq7l8jaA",
    name: "Richards Jacques",
    role: "Peer",
    quote:
      "I was highly impressed with his productivity, positive attitude, and endless curiosity. Cory genuinely cares about the work he does, the people he works with, and the customers he interacts with daily. His tenacity and perspicacity show in the messaging he carefully crafts and the intricate problems he solves each and every day. I highly recommend Cory as a product manager.",
    hideQuote: false,
    thumbnails: [
      {
        image:
          "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=600&fit=crop",
        tooltip: "Product roadmap planning",
      },
      {
        image:
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
        tooltip: "Sprint review presentation",
      },
    ],
  },
  {
    id: "fema",
    title: "Regional Geospatial Coordinator",
    company: "FEMA - Region 7 & 9",
    companyUrl: "http://www.fema.gov",
    period: "06/2010 - 09/2014",
    location: "Kansas City, KS",
    lat: 39.0997,
    lng: -94.5786,
    bullets: [
      "Developed advanced geospatial systems for disaster response",
      "Enhanced regional GIS and remote sensing capabilities",
      "Built strong partnerships with State GIS partners",
    ],
    photo:
      "https://media.licdn.com/dms/image/v2/D4E03AQEH4hROzKx7YQ/profile-displayphoto-shrink_400_400/B4EZY8hjBZHcAg-/0/1744772149979?e=1767830400&v=beta&t=QVto5yzkWEiWlLMZW7XE0cvNF6eOdhHlPd_wQ854vbY",
    name: "Chris Hartnett",
    role: "Director / Chief of Staff",
    quote:
      "His attention to detail and willingness to go above and beyond were second to none. His talent and understanding of the GIS needs of the State facilitated the development of many viable products still in use today.",
    thumbnails: [
      {
        image:
          "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=600&fit=crop",
        tooltip: "Disaster response mapping system",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        tooltip: "GIS analytics dashboard",
      },
    ],
  },
  {
    id: "apple",
    title: "Specialist & Genius Bar Technician",
    company: "Apple",
    period: "08/2008 - 05/2011",
    location: "Canoga Park, CA",
    lat: 34.2011,
    lng: -118.6015,
    bullets: [
      "Achieved top sales associate status for computers and mobile devices",
      "Developed and delivered effective training to diverse audiences",
      "Resolved technical challenges under tight deadlines",
    ],
    photo:
      "https://media.licdn.com/dms/image/v2/C5603AQFEffkVFqt2aQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1523400537598?e=1767830400&v=beta&t=QmblVO4aNTH4XY_eEcbuWDtoNEHI_PjBM3fedx57cbE",
    name: "Ron Green",
    role: "Peer",
    quote:
      "Cory is possibly the most intelligent, innovative, and motivated person I've ever worked with.",
    hideQuote: false,
    thumbnails: [
      {
        image:
          "https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&h=600&fit=crop",
        tooltip: "Apple Store retail experience",
      },
      {
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
        tooltip: "Technical training session",
      },
    ],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "Global Health | MPH",
    school: "Loma Linda University",
    period: "2006 - 2008",
    location: "Loma Linda, CA",
    lat: 34.0511,
    lng: -117.2633,
    photo:
      "https://media.licdn.com/dms/image/v2/C4E03AQHenjh-j9Kn0A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1517682233830?e=1767830400&v=beta&t=rQBrgxu3t7DavITd2uCSZp0EtYMsIgijsx9LoMvNWYg",
    name: "Don Gaede, DrPH",
    role: "Professor",
    quote:
      "He is bright, articulate and creative. He is also very honest and open and will give you a very honest assessment of what he is willing to take on. I have truly enjoyed working with him in our classes.",
    hideQuote: false,
  },
  {
    degree: "Theology | BAT",
    school: "California Baptist University",
    period: "2002 - 2006",
    location: "Riverside, CA",
    lat: 33.9292,
    lng: -117.4254,
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    name: "Prof. Daniel Wright",
    role: "Professor",
    quote: "Building a foundation of purpose-driven leadership.",
    hideQuote: true,
  },
];
