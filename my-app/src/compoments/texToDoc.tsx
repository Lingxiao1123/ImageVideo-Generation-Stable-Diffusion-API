import React from "react";

export const LatexUploader: React.FC = () => {
  const latexCode = `
\\documentclass{article}
\\usepackage[utf8]{inputenc}

\\title{Sample Document}
\\author{Author Name}
\\date{Today}

\\begin{document}

\\maketitle

\\section{Introduction}

This is a simple LaTeX document for demonstration purposes. Here is an equation:

\\[ E = mc^2 \\]

\\end{document}
`;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append(
      "file",
      new Blob([latexCode], { type: "text/plain" }),
      "document.tex"
    );

    try {
      const response = await fetch("https://latex.ytotech.com/builds/sync", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "output.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error("The server returned an error status:", response.status);
      }
    } catch (error) {
      console.error("Request Failed:", error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Download PDF</button>
    </div>
  );
};

export default LatexUploader;
