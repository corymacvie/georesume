"use client";
import { saveAs } from "file-saver";

export async function handleDownload() {
  const element = document.getElementById("resume-content");

  if (!element) {
    console.error("Content element not found");
    return;
  }

  try {
    const htmlContent = element.innerHTML;

    const response = await fetch("/api/export/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ htmlContent }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `Failed to export PDF: ${response.statusText}`
      );
    }

    const blob = await response.blob();
    if (blob.size === 0) {
      throw new Error("Received an empty PDF file");
    }

    saveAs(blob, "Cory_MacVie_Resume.pdf");
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
}
