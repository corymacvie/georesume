export interface ResumeEvent {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  bullets: string[];
  location: string;
  lat: number;
  lng: number;
  photo: string;
  name: string;
  role: string;
  quote: string;
  hideQuote?: boolean;
  showPortfolio?: boolean;
  thumbnails?: {
    image: string;
    tooltip: string;
  }[];
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
