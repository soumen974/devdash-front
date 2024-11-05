import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Download, AlertCircle, Loader2, Code } from 'lucide-react';

function ResumePdfMaker() {
  const [latexCode, setLatexCode] = useState(`
    % Resume Template
    \\documentclass[a4paper,11pt]{article}
    % ... [previous LaTeX code remains the same] ...
  `);
  
  const [pdfUrl, setPdfUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeneratePdf = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/build/generate-pdf`, { latexCode },
        {
          withCredentials: true, 
        }
      );
      setPdfUrl(response.data.pdf_url);
    } catch (error) {
      setError('Failed to generate PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E24] text-white p-6 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FD356E]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FD356E]/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#FD356E] to-[#FF5F85] bg-clip-text text-transparent">
            Resume PDF Maker
          </h1>
          <p className="text-gray-400">
            Create professional resumes with LaTeX templates
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Section */}
          <div className="space-y-4">
            <div className="backdrop-blur-lg bg-[#1E1E24]/90 rounded-2xl shadow-2xl border border-[#FD356E]/10 overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-[#1E1E24] to-[#2A2A32] border-b border-gray-700/50">
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5 text-[#FD356E]" />
                  <h2 className="font-semibold text-white">LaTeX Editor</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  <textarea
                    className="w-full h-[calc(100vh-400px)] bg-[#2A2A32] text-white rounded-xl 
                             border-2 border-gray-700/50 p-4 font-mono text-sm
                             focus:outline-none focus:border-[#FD356E] focus:ring-2 
                             focus:ring-[#FD356E]/20 transition-all duration-200 
                             transform hover:scale-[1.01] focus:scale-[1.01] resize-none"
                    value={latexCode}
                    onChange={(e) => setLatexCode(e.target.value)}
                    spellCheck="false"
                  />
                  <button
                    onClick={handleGeneratePdf}
                    disabled={isLoading}
                    className="absolute bottom-4 right-4 flex items-center gap-2 px-6 py-3 
                             rounded-xl text-white font-medium
                             bg-gradient-to-r from-[#FD356E] to-[#FF5F85] 
                             hover:from-[#FF5F85] hover:to-[#FD356E] 
                             transition-all duration-200 transform hover:scale-[1.02] 
                             active:scale-[0.98] disabled:opacity-50 
                             disabled:cursor-not-allowed shadow-lg 
                             hover:shadow-[#FD356E]/20"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Generate PDF
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 
                            backdrop-blur-md animate-fadeIn">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="backdrop-blur-lg bg-[#1E1E24]/90 rounded-2xl shadow-2xl border border-[#FD356E]/10 overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-[#1E1E24] to-[#2A2A32] border-b border-gray-700/50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FD356E]" />
                <h2 className="font-semibold text-white">Preview</h2>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-[#2A2A32] rounded-xl h-[calc(100vh-400px)] overflow-hidden">
                {pdfUrl ? (
                  <iframe
                    src={pdfUrl}
                    title="PDF Preview"
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                    <FileText className="w-12 h-12 opacity-50" />
                    <p className="text-sm">Your PDF preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePdfMaker;