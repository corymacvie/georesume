import os from "os";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { NextResponse } from "next/server";

function readFileSafe(filePath: string) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return "";
  }
}

const INLINE_EDITOR_CSS = `

:root{
  --primary: #422e2e;
  --secondary: #e8e8e8;
  --background: #f5f5f5;
  --foreground: #fff;
  --background-2: #fcfcfc;
  --highlight: hsl(13, 80%, 59%);
  --text: #2e2e30;
  --paragraph: #5b5c5d;
  --scrollbar: #9c9c9e;
  --icon: #59595b;
  --border: #dcdcdc;
  --border-2: #dcdcdc;
  --error: #e1243a;
  --warn: #fdc73e;
  --success: #2dd165;
  --link: #0984ae;
  --placeholder: #00000080;
  --hover: #efefef;
  --hover-2: #f6f6f6;
  --tiny: 13px;
  --rounded-7: 7px;
  --radius: var(--rounded-7, 0.625rem);
}


html.dark {
  --primary: #422e2e;
  --secondary: #1e1f22;
  --background: #090909;
  --foreground: #17181b;
  --background-2: #101012;
  --highlight: #ea6744;
  --text: #fff;
  --paragraph: #949597;
  --scrollbar: #5a5b5d;
  --icon: #949597;
  --border: #23252a;
  --border-2: #5d6169;
  --error: #ff3d3d;
  --warn: #fdc73e;
  --success: #2dd165;
  --link: #0984ae;
  --placeholder: #949597;
  --hover: #151619;
  --hover-2: #2d30389e;
}

@import url('https://fonts.googleapis.com/css2?family=Signika:wght@300..700&display=swap');

* { font-family: "Signika", sans-serif !important; box-sizing: border-box; }

body {
  background: var(--foreground);
}

.tiptap {
  padding: 0 !important;
  margin: 0 !important;
  color: var(--text);
  background: var(--foreground);
  outline: none;
}

.tiptap h1 { font-size: 24px; margin-top: 72px !important; } 
.tiptap h2 { font-size: 20px; margin-top: 50px !important; } 
.tiptap h3 { font-size: 18px; margin-top: 36px !important; } 

.tiptap p { font-size: 16px; margin-top: 20px; } 

.tiptap li p,
.tiptap td p,
.tiptap th p,
.tiptap blockquote p,
.tiptap pre p,
.tiptap code p { margin-top: 0 !important; }

.tiptap ul {
  margin: 1.5rem 0;    
  padding-left: 1.5rem;
  list-style-type: disc;
}
.tiptap ul ul { list-style-type: circle; margin: 0; }
.tiptap ul ul ul { list-style-type: square; margin: 0; }
.tiptap li { margin: 0.25rem 0; } 

.tiptap ol {
  margin: 0;
  padding-left: 1.5rem;
  list-style-type: decimal;
}
.tiptap ol ol { list-style-type: lower-alpha; margin: 0; }
.tiptap ol ol ol { list-style-type: lower-roman; margin: 0; }

.tiptap ul[data-type="taskList"] {
  list-style: none !important;
  padding-left: 0 !important;
  margin-left: 0 !important;
}
.tiptap ul[data-type="taskList"] > li {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 6px 0;
}
.tiptap input[type="checkbox"] {
  width: 16px; height: 16px;
  border: 2px solid var(--border-2);
  border-radius: 4px;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;
  display: inline-block;
  vertical-align: middle;
}
.tiptap input[type="checkbox"]::after {
  
}
.tiptap ul[data-type="taskList"] > li[data-checked="true"] p {
  text-decoration: line-through;
  opacity: 0.6;
}


.tiptap blockquote {
  border-left: 4px solid rgba(156,163,175,0.40); 
  padding-left: 1rem; 
  margin: 1.5rem 0;   
  font-style: italic;
}


.tiptap hr { color: var(--border); }
.tiptap .hr-wrapper { margin: 36px 0; padding: 12px 0; }


.tiptap pre {
  background: var(--background);
  padding: 12px;
  margin: 24px 0;
  border-radius: 6px;
  border: 1px solid var(--border);
  overflow: auto;
}
.tiptap pre code { font-family: monospace; font-size: 14px; display: block; white-space: pre; }
.tiptap :not(pre) > code {
  background: var(--background);
  font-size: 14px;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  border: 1px solid var(--border);
}


.tiptap table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid var(--border);
  overflow: hidden;
}
.tiptap table th, .tiptap table td {
  border: 1px solid var(--border);
  padding: 8px 12px;
}
.tiptap table th { background: var(--background); }


.tiptap .image-wrapper-outer { margin: 24px 0; }
.tiptap div[data-type="details"] {
  list-style: none;
  display: flex;
  align-items: start;
  gap: 4px;
  margin: 24px 0;
}
.tiptap li > div[data-type="details"] { list-style: none; }
.tiptap div[data-type="details"] > button { width: 24px; height: 24px; }


.tiptap a { color: #2563eb; text-decoration: underline; cursor: default; }
html.dark .tiptap a { color: #60a5fa; }


@media print {
  * { -webkit-print-color-adjust: exact; color-adjust: exact; }
}
`;

export async function POST(req: Request) {
  try {
    const { htmlContent } = await req.json();

    const exportStylesPath = path.join(
      process.cwd(),
      "public",
      "export-styles.css"
    );
    const globalsPath = path.join(process.cwd(), "app", "globals.css");

    const exportStyles = readFileSafe(exportStylesPath);
    const globals = readFileSafe(globalsPath);

    const combinedCSS = `${exportStyles}\n${globals}`;

    const isLocal = process.env.NODE_ENV !== "production";
    let executablePath: string;

    if (isLocal) {
      const platform = os.platform();
      if (platform === "win32") {
        const winChrome = path.join(
          process.env["PROGRAMFILES"] || "C:\\Program Files",
          "Google/Chrome/Application/chrome.exe"
        );
        executablePath = fs.existsSync(winChrome)
          ? winChrome
          : "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
      } else if (platform === "darwin") {
        executablePath =
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
      } else {
        executablePath = "/usr/bin/google-chrome";
      }
    } else {
      executablePath = await chromium.executablePath();
    }

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath,
      headless: true,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    const html = `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
          <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
          <style>
            :root {
              --font-sans: 'Inter', sans-serif;
            }
            
            * { 
              font-family: 'Inter', sans-serif !important; 
              box-sizing: border-box; 
            }

            body {
              margin: 0;
              padding: 0;
              font-family: 'Inter', sans-serif !important; 
              background: white;
            }

            #resume-content {
              width: 100%;
              max-width: 8.5in;
              margin: 0 auto;
              background: white;
            }

            ${combinedCSS}
          </style>
        </head>
        <body class="bg-white">
          <div id="resume-content">
            ${htmlContent}
          </div>
        </body>
      </html>
    `;

    await page.setContent(html, {
      waitUntil: ["domcontentloaded", "networkidle0"],
    });

    await page.evaluate(() => new Promise((res) => setTimeout(res, 500)));

    const pdfBuffer = await page.pdf({
      format: "letter",
      printBackground: true,
      margin: { left: "64px", right: "64px", top: "64px", bottom: "80px" },
    });

    await browser.close();

    const arrayBuffer = new ArrayBuffer(pdfBuffer.length);
    const uint8 = new Uint8Array(arrayBuffer);
    uint8.set(pdfBuffer);
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });

    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=document.pdf",
      },
    });
  } catch (err) {
    console.error("PDF ERROR → ", err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}
