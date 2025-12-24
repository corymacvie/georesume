# Cory MacVie - Strategic Product Leader Portfolio

A modern, interactive portfolio and resume built with Next.js, featuring an interactive map, dynamic content from Medium and Goodreads, and PDF export functionality.

## 🚀 Key Features

- **Interactive Experience**: A geospatial-aware resume that tracks professional journey across a map.
- **Dynamic Content**:
  - **Medium Integration**: Automatically fetches and displays latest articles.
  - **Goodreads/Audible Integration**: Lists recent reads and ratings via RSS.
- **High-Quality PDF Export**: Server-side PDF generation using Puppeteer and Chromium for pixel-perfect resume downloads.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Modern Tech Stack**: Built with Next.js 15+, React 19, and Tailwind CSS.

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Mapping**: [Leaflet](https://leafletjs.org/) with [CartoDB](https://carto.com/basemaps/) tiles
- **Icons**: [Iconify](https://iconify.design/) (Lucide icon set)
- **PDF Generation**: [Puppeteer](https://pptr.dev/) & [@sparticuz/chromium](https://github.com/Sparticuz/chromium)
- **Utilities**: [file-saver](https://github.com/eligrey/FileSaver.js/)

## 🏁 Getting Started

### Prerequisites

- Node.js 20.x or later
- npm or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd cory-macvie
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable React components (Map, Resume, Panel, etc.).
- `/data`: Static data for the resume events and education.
- `/lib`: Utility functions and export logic.
- `/public`: Static assets and global styles for PDF export.

## 📄 PDF Export

The project uses a custom API route (`/api/export/pdf`) that:

1. Captures the HTML content of the resume.
2. Injects required styles.
3. Uses a headless browser (Puppeteer) to render and generate a high-quality PDF.
4. Returns the PDF as a downloadable blob.

## 🤝 Contact

- **Website**: [corymacvie.com](https://corymacvie.com)
- **LinkedIn**: [@MacVie](https://www.linkedin.com/in/macvie)
- **Twitter**: [@corymacvie](https://x.com/corymacvie)
- **Email**: cory@corymacvie.com

---

Built with ❤️ by Cory MacVie
