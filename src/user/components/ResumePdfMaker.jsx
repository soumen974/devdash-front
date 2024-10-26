import React, { useState } from 'react';
import axios from 'axios';

function ResumePdfMaker() {
    const [latexCode, setLatexCode] = useState(`
        % Resume Template
        \\documentclass[a4paper,11pt]{article}
        \\usepackage{geometry}
        \\geometry{left=1.4cm, right=1.2cm, top=0.8cm, bottom=1cm}
        \\usepackage[hidelinks]{hyperref}
        \\usepackage{fontawesome5}
        \\usepackage{tabularx}
        \\usepackage{enumitem}
        \\usepackage{titlesec}
    
        % Set font for section titles
        \\titleformat{\\section}{\\Large\\bfseries}{}{0em}{}[\\titlerule]
    
        \\begin{document}
    
        % Personal Information
        \\newcommand{\\name}{Your Name}
        \\newcommand{\\phone}{1234567890}
        \\newcommand{\\email}{your.email@example.com}
        \\newcommand{\\linkedin}{linkedin.com/in/yourprofile}
        \\newcommand{\\github}{github.com/yourprofile}
    
        % Header
        \\begin{tabularx}{\\linewidth}{X r}
        \\textbf{\\LARGE \\name} & \\faPhone \\phone \\\\
        Email: \\email & \\faLinkedin \\href{https://\\linkedin}{\\linkedin} \\\\
        \\faGithub \\href{https://\\github}{\\github} \\\\
        \\end{tabularx}
    
        % Education Section
        \\section*{Education}
        \\textbf{Bachelor of Technology in Computer Science} \\\\
        Centurion University of Technology and Management, City, Country \\\\
        Expected Graduation: Month Year \\\\
    
        % Experience Section
        \\section*{Experience}
        \\textbf{Job Title} \\hfill Company Name, City \\\\
        Month Year -- Present \\\\
        \\begin{itemize}[left=0em]
          \\item Describe your responsibilities and achievements.
          \\item Use bullet points for clarity.
        \\end{itemize}
    
        \\textbf{Internship Title} \\hfill Company Name, City \\\\
        Month Year -- Month Year \\\\
        \\begin{itemize}[left=0em]
          \\item Describe your responsibilities and achievements.
          \\item Use bullet points for clarity.
        \\end{itemize}
    
        % Skills Section
        \\section*{Skills}
        \\begin{tabular}{ll}
        Programming Languages: & Java, Python, JavaScript \\\\
        Web Technologies: & React, Node.js, HTML, CSS \\\\
        Tools & Git, Docker, Cloud Services \\\\
        \\end{tabular}
    
        % Projects Section
        \\section*{Projects}
        \\textbf{Project Title} \\\\
        Brief description of the project, technologies used, and your role. \\\\
        
        \\textbf{Another Project Title} \\\\
        Brief description of the project, technologies used, and your role. \\\\
        
        \\end{document}
      `);
        
  const [pdfUrl, setPdfUrl] = useState('');

  const handleGeneratePdf = async () => {
    try {
      const response = await axios.post('http://localhost:5000/build/generate-pdf', { latexCode });
      setPdfUrl(response.data.pdf_url);
      console.log('PDF generated:', response.data.pdf_url);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="h-[90vh] bg-gray-900 text-white flex items-center justify-center">
      <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-gray-600 rounded-lg p-4">
          <h2 className="text-center font-bold text-xl mb-2">LaTeX Code Editor</h2>
          <textarea
            className="w-full h-[70vh] bg-gray-800 p-2 rounded-md text-gray-200"
            placeholder="Enter LaTeX code here..."
            value={latexCode}
            onChange={(e) => setLatexCode(e.target.value)}
          />
          <button
            onClick={handleGeneratePdf}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate PDF
          </button>
        </div>

        <div className="border border-gray-600 rounded-lg p-4">
          <h2 className="text-center font-bold text-xl mb-2">PDF Review</h2>
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              title="PDF Preview"
              className="w-full h-[80vh] border rounded-md"
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-80 text-gray-400">
              PDF preview will appear here after generation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumePdfMaker;
